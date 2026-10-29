#!/usr/bin/env node

/**
 * SuperX X (Twitter) API v2 Publisher & Scheduler
 * Native Zero-Dependency OAuth 1.0a Client & Post Scheduler
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

// Load environment variables from .env if present
function loadEnv() {
  const envPaths = [
    path.resolve(process.cwd(), '.env'),
    path.resolve(process.env.HOME || process.env.USERPROFILE || '', '.env')
  ];

  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      content.split(/\r?\n/).forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const idx = trimmed.indexOf('=');
          if (idx !== -1) {
            const key = trimmed.substring(0, idx).trim();
            const val = trimmed.substring(idx + 1).trim().replace(/^['"]|['"]$/g, '');
            if (!process.env[key]) {
              process.env[key] = val;
            }
          }
        }
      });
      break;
    }
  }
}

loadEnv();

function getCredentials() {
  return {
    apiKey: process.env.X_API_KEY || process.env.TWITTER_API_KEY,
    apiSecret: process.env.X_API_KEY_SECRET || process.env.TWITTER_API_SECRET,
    accessToken: process.env.X_ACCESS_TOKEN || process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.X_ACCESS_TOKEN_SECRET || process.env.TWITTER_ACCESS_SECRET
  };
}

function checkCredentials() {
  const creds = getCredentials();
  const missing = [];
  if (!creds.apiKey) missing.push("X_API_KEY");
  if (!creds.apiSecret) missing.push("X_API_KEY_SECRET");
  if (!creds.accessToken) missing.push("X_ACCESS_TOKEN");
  if (!creds.accessSecret) missing.push("X_ACCESS_TOKEN_SECRET");
  return { valid: missing.length === 0, missing, creds };
}

function percentEncode(str) {
  return encodeURIComponent(str)
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A');
}

function generateOAuthHeader(method, url, extraParams = {}) {
  const { apiKey, apiSecret, accessToken, accessSecret } = getCredentials();
  const oauthParams = {
    oauth_consumer_key: apiKey,
    oauth_nonce: crypto.randomBytes(16).toString('hex'),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: accessToken,
    oauth_version: '1.0',
    ...extraParams
  };

  const allParams = { ...oauthParams };
  const sortedKeys = Object.keys(allParams).sort();
  const paramPairs = sortedKeys.map(k => `${percentEncode(k)}=${percentEncode(allParams[k])}`);
  const paramString = paramPairs.join('&');

  const baseString = [
    method.toUpperCase(),
    percentEncode(url),
    percentEncode(paramString)
  ].join('&');

  const signingKey = `${percentEncode(apiSecret)}&${percentEncode(accessSecret)}`;
  const signature = crypto.createHmac('sha1', signingKey).update(baseString).digest('base64');

  oauthParams.oauth_signature = signature;

  const headerParts = Object.keys(oauthParams)
    .filter(k => k.startsWith('oauth_'))
    .sort()
    .map(k => `${percentEncode(k)}="${percentEncode(oauthParams[k])}"`);

  return `OAuth ${headerParts.join(', ')}`;
}

async function postTweet(text) {
  const { valid, missing } = checkCredentials();
  if (!valid) {
    throw new Error(`Missing X API credentials: ${missing.join(', ')}. Please configure them in your .env file.`);
  }

  const endpoint = 'https://api.twitter.com/2/tweets';
  const authHeader = generateOAuthHeader('POST', endpoint);
  const payload = JSON.stringify({ text });

  return new Promise((resolve, reject) => {
    const req = https.request(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve({ success: true, data: json.data, statusCode: res.statusCode });
          } else {
            reject(new Error(`X API Error (${res.statusCode}): ${JSON.stringify(json)}`));
          }
        } catch (e) {
          reject(new Error(`Failed to parse X response: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

const SCHEDULE_FILE = path.resolve(process.cwd(), '.pulsex_scheduled.json');

function getScheduled() {
  if (fs.existsSync(SCHEDULE_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(SCHEDULE_FILE, 'utf8'));
    } catch (e) {
      return [];
    }
  }
  return [];
}

function saveScheduled(list) {
  fs.writeFileSync(SCHEDULE_FILE, JSON.stringify(list, null, 2));
}

function scheduleTweet(text, scheduledTimeISO) {
  const list = getScheduled();
  const id = `sched_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const item = {
    id,
    text,
    scheduledAt: scheduledTimeISO,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  list.push(item);
  saveScheduled(list);
  return item;
}

async function runPendingScheduled() {
  const list = getScheduled();
  const now = new Date();
  const results = [];

  for (const item of list) {
    if (item.status === 'pending' && new Date(item.scheduledAt) <= now) {
      try {
        const res = await postTweet(item.text);
        item.status = 'published';
        item.publishedAt = new Date().toISOString();
        item.tweetId = res.data?.id;
        results.push({ id: item.id, status: 'published', tweetId: res.data?.id });
      } catch (err) {
        item.status = 'failed';
        item.error = err.message;
        results.push({ id: item.id, status: 'failed', error: err.message });
      }
    }
  }

  saveScheduled(list);
  return results;
}

// CLI handler
if (require.main === module) {
  const command = process.argv[2];

  if (command === 'verify-auth') {
    const check = checkCredentials();
    if (check.valid) {
      console.log(JSON.stringify({ status: "ok", message: "X API credentials configured." }, null, 2));
    } else {
      console.log(JSON.stringify({ status: "missing_credentials", missing: check.missing }, null, 2));
    }
  } else if (command === 'publish') {
    const text = process.argv[3];
    if (!text) {
      console.error("Usage: node x_publisher.js publish \"<Tweet Text>\"");
      process.exit(1);
    }
    postTweet(text)
      .then(res => console.log(JSON.stringify(res, null, 2)))
      .catch(err => {
        console.error(err.message);
        process.exit(1);
      });
  } else if (command === 'schedule') {
    const text = process.argv[3];
    const time = process.argv[4];
    if (!text || !time) {
      console.error("Usage: node x_publisher.js schedule \"<Tweet Text>\" \"<ISO DateTime>\"");
      process.exit(1);
    }
    const item = scheduleTweet(text, time);
    console.log(JSON.stringify({ status: "scheduled", item }, null, 2));
  } else if (command === 'list') {
    console.log(JSON.stringify(getScheduled(), null, 2));
  } else if (command === 'run-pending') {
    runPendingScheduled().then(res => console.log(JSON.stringify(res, null, 2)));
  } else {
    console.log("Usage: node x_publisher.js [verify-auth | publish | schedule | list | run-pending]");
  }
}

module.exports = {
  checkCredentials,
  postTweet,
  scheduleTweet,
  getScheduled,
  runPendingScheduled
};

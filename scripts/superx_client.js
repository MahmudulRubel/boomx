/**
 * SuperX API Client
 * Reverse-engineered REST interface for api.superx.tools & app.superx.so.
 */

const https = require('https');
const { simulate } = require('./predict_algorithm');
const { generateAngles } = require('./generate_angles');

class SuperXClient {
  constructor(options = {}) {
    this.token = options.token || process.env.SUPERX_TOKEN || null;
    this.apiHost = options.apiHost || "https://api.superx.tools";
    this.scheduleHost = options.scheduleHost || "https://app.superx.so";
  }

  request(host, path, method = "GET", data = null) {
    return new Promise((resolve, reject) => {
      const url = new URL(path, host);
      const headers = {
        "Content-Type": "application/json",
        "User-Agent": "SuperX-Agent-Client/1.0"
      };

      if (this.token) {
        headers["Authorization"] = `Bearer ${this.token}`;
      }

      const req = https.request(url, { method, headers }, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          try {
            const parsed = JSON.parse(body);
            resolve(parsed);
          } catch (e) {
            resolve({ raw: body, status: res.statusCode });
          }
        });
      });

      req.on('error', reject);
      if (data) {
        req.write(JSON.stringify(data));
      }
      req.end();
    });
  }

  /**
   * Predict algorithm score comparing two tweet versions
   */
  async predictAlgorithm(versionA, versionB) {
    if (this.token) {
      try {
        const res = await this.request(this.apiHost, "/api/tools/algorithm-predict", "POST", { versionA, versionB });
        if (res && !res.error && res.versionA) return res;
      } catch (e) {
        console.warn("[SuperX] Live API fallback to local algorithm engine:", e.message);
      }
    }
    // High-fidelity local simulation fallback
    return simulate(versionA, versionB);
  }

  /**
   * Generate 3 contrasting content angles
   */
  async generateAngles(userPrompt, options = {}) {
    if (this.token) {
      try {
        const res = await this.request(this.apiHost, "/api/ai-chat/angles", "POST", {
          userPrompt,
          structureType: options.structureType || "auto",
          ...options
        });
        if (res && res.angles) return res;
      } catch (e) {
        console.warn("[SuperX] Live API fallback to local angles generator:", e.message);
      }
    }
    return generateAngles(userPrompt, options.context || "");
  }

  /**
   * Generate a high-conversion contextual reply
   */
  async generateReply(postText, authorHandle, tone = "insightful") {
    if (this.token) {
      try {
        const res = await this.request(this.scheduleHost, "/api/engage/generate-reply", "POST", {
          postText,
          postAuthorHandle: authorHandle,
          postAuthorName: authorHandle,
          tone
        });
        if (res && res.reply) return res;
      } catch (e) {
        console.warn("[SuperX] Live API fallback for reply generation:", e.message);
      }
    }
    return {
      reply: `Appreciate the breakdown. Most people overlook how this compounds over a 90-day window—especially when retention is the primary metric.`,
      tone,
      simulated: true
    };
  }
}

module.exports = SuperXClient;

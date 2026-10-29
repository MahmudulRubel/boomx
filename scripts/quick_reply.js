#!/usr/bin/env node

/**
 * BoomX Quick Reply Publisher
 * Crafts persona replies and posts them directly to in_reply_to_tweet_id.
 */

const { generateReplies } = require('./reply_radar');
const { postTweet, scheduleTweet } = require('./x_publisher');

async function handleReplyFlow(targetText, authorHandle, tweetId = null, selectedPersona = null, mode = "draft") {
  const radar = generateReplies(targetText, authorHandle);

  if (!selectedPersona) {
    // Return all 4 persona options
    return radar;
  }

  // Find selected persona
  const personaMap = {
    "1": 0, "tactical": 0,
    "2": 1, "contrarian": 1,
    "3": 2, "benchmark": 2,
    "4": 3, "witty": 3
  };

  const idx = personaMap[String(selectedPersona).toLowerCase()] ?? 0;
  const chosen = radar.replies[idx] || radar.replies[0];

  if (mode === "publish" && tweetId) {
    try {
      const res = await postTweet(chosen.replyText, tweetId);
      return {
        status: "published_reply",
        tweetId: res.data?.id,
        inReplyToId: tweetId,
        replyText: chosen.replyText,
        persona: chosen.persona
      };
    } catch (e) {
      const queued = scheduleTweet(chosen.replyText, new Date().toISOString(), tweetId);
      return {
        status: "queued_reply_local",
        error: e.message,
        item: queued
      };
    }
  }

  return {
    status: "ready_to_publish",
    tweetId,
    persona: chosen.persona,
    replyText: chosen.replyText,
    commandToPublish: `node scripts/x_publisher.js reply "${tweetId || '<TweetID>'}" "${chosen.replyText.replace(/\n/g, '\\n')}"`
  };
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log("Usage: node quick_reply.js \"<Target Tweet Text>\" <authorHandle> [tweetId] [persona: 1|2|3|4] [publish|draft]");
    process.exit(1);
  }

  handleReplyFlow(args[0], args[1] || "creator", args[2] || null, args[3] || null, args[4] || "draft")
    .then(r => console.log(JSON.stringify(r, null, 2)))
    .catch(err => {
      console.error(err.message);
      process.exit(1);
    });
}

module.exports = { handleReplyFlow };

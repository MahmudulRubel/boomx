#!/usr/bin/env node

/**
 * BoomX Quick Scheduler
 * 1-Click scheduling helper with automatic peak heatmap calculations.
 */

const { scheduleTweet, postTweet } = require('./x_publisher');

function getPeakPreset(preset = "today-peak") {
  const now = new Date();
  const d = new Date(now);

  if (preset === "now") {
    return "now";
  }

  if (preset === "today-peak") {
    // 14:00 UTC today, or tomorrow if 14:00 has passed
    d.setUTCHours(14, 0, 0, 0);
    if (d <= now) {
      d.setUTCDate(d.getUTCDate() + 1);
    }
    return d.toISOString();
  }

  if (preset === "tomorrow-peak") {
    // 13:00 UTC tomorrow
    d.setUTCDate(d.getUTCDate() + 1);
    d.setUTCHours(13, 0, 0, 0);
    return d.toISOString();
  }

  if (preset === "evening-peak") {
    // 18:00 UTC today or tomorrow
    d.setUTCHours(18, 0, 0, 0);
    if (d <= now) {
      d.setUTCDate(d.getUTCDate() + 1);
    }
    return d.toISOString();
  }

  // Treat as direct ISO date string
  return preset;
}

async function quickSchedule(text, presetOrTime = "today-peak", inReplyToId = null) {
  if (!text) throw new Error("Tweet text is required.");

  const timeVal = getPeakPreset(presetOrTime);

  if (timeVal === "now") {
    console.log("Publishing immediately to X API...");
    try {
      const res = await postTweet(text, inReplyToId);
      return { status: "published_now", tweetId: res.data?.id, text };
    } catch (e) {
      console.warn("Live API publish failed (or no credentials). Queuing locally as pending:", e.message);
      const item = scheduleTweet(text, new Date().toISOString(), inReplyToId);
      return { status: "queued_local", item, error: e.message };
    }
  }

  const item = scheduleTweet(text, timeVal, inReplyToId);
  return {
    status: "scheduled",
    scheduledAt: timeVal,
    item
  };
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log("Usage: node quick_schedule.js \"<Tweet Text>\" [now | today-peak | tomorrow-peak | evening-peak | <ISO>] [inReplyToId]");
    process.exit(1);
  }

  quickSchedule(args[0], args[1] || "today-peak", args[2] || null)
    .then(r => console.log(JSON.stringify(r, null, 2)))
    .catch(err => {
      console.error(err.message);
      process.exit(1);
    });
}

module.exports = { quickSchedule, getPeakPreset };

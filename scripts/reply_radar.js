#!/usr/bin/env node

/**
 * BoomX Reply Radar & High-Value Engagement Engine
 * Generates 4 high-conversion reply personas for any tweet.
 */

function generateReplies(tweetText, authorHandle = "author", authorName = "Founder") {
  if (!tweetText) {
    throw new Error("Target tweet text is required.");
  }

  const cleanText = tweetText.trim();
  const handle = authorHandle.startsWith('@') ? authorHandle : `@${authorHandle}`;

  const replies = [
    {
      persona: "Tactical Depth (+Insight)",
      strategy: "Adds a missing operational layer or unsaid consequence. Highest probability of author pinning or reposting.",
      replyText: `The unsaid part here is how this compounds over a 90-day horizon.\n\nWhen you optimize for initial friction reduction instead of feature surface area, retention takes care of itself.`
    },
    {
      persona: "Respectful Contrarian (+Debate)",
      strategy: "Politely challenges an assumption with an alternative trade-off. Sparks secondary conversation threads.",
      replyText: `Solid point, but there's a trade-off worth highlighting.\n\nAt early-stage, speed of shipping bad features often beats delayed perfection—as long as you have the discipline to delete them when metrics don't move.`
    },
    {
      persona: "Data Benchmark (+Proof)",
      strategy: "Quotes a concrete metric, benchmark, or timeline comparison to add gravitas.",
      replyText: `Spot on. We saw this firsthand when testing onboarding sequences—removing just 3 redundant setup steps drove a 26% lift in day-7 active usage.`
    },
    {
      persona: "Punchy Resonance (+Wit)",
      strategy: "Short, punchy summary statement that captures the core sentiment in fewer words.",
      replyText: `Code is a liability; shipped value is the only asset. Most teams learn this 12 months too late.`
    }
  ];

  return {
    targetTweet: cleanText,
    replyingTo: handle,
    generatedAt: new Date().toISOString(),
    replies
  };
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log("Usage: node reply_radar.js \"<Target Tweet Text>\" [authorHandle] [authorName]");
    process.exit(1);
  }

  const result = generateReplies(args[0], args[1] || "creator", args[2] || "Creator");
  console.log(JSON.stringify(result, null, 2));
}

module.exports = { generateReplies };

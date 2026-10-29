#!/usr/bin/env node

/**
 * BoomX Post-Post-Mortem Engine
 * Analyzes post metrics against creator baseline, pinpoints the winning lever,
 * and prescribes exact shapes for future posts.
 */

function analyzePostPostMortem({
  tweetText,
  impressions = 0,
  likes = 0,
  replies = 0,
  bookmarks = 0,
  retweets = 0,
  baseline = { impressions: 4000, likes: 75, replies: 20, bookmarks: 15, retweets: 10 }
}) {
  const impRatio = (impressions / Math.max(1, baseline.impressions)).toFixed(1);
  const likeRatio = (likes / Math.max(1, baseline.likes)).toFixed(1);
  const repRatio = (replies / Math.max(1, baseline.replies)).toFixed(1);
  const bkmRatio = (bookmarks / Math.max(1, baseline.bookmarks)).toFixed(1);

  const cleanText = (tweetText || "").trim();
  const firstLine = cleanText.split('\n')[0] || '';

  // Determine Primary Lever
  let primaryLever = "Format";
  let leverAnalysis = "";
  let pattern = "";
  let nextAction = "";

  if (parseFloat(repRatio) >= 1.8) {
    primaryLever = "Conversation Prompt";
    leverAnalysis = "The post sparked active replies and discussions. The author-replied thread triggered X's 75x Heavy Ranker boost.";
    pattern = "Debate-driven conclusion or polarizing open loop.";
    nextAction = "Draft two more posts in this niche using an 'Agree or disagree?' or trade-off question at the end.";
  } else if (parseFloat(bkmRatio) >= 2.0) {
    primaryLever = "Utility & Density";
    leverAnalysis = "The post achieved exceptionally high bookmark conversion. Users saved it as a reference swipe asset.";
    pattern = "Actionable checklist, curated tooling, or teardown framework.";
    nextAction = "Extract another system or workflow into a numbered reference guide with the same visual pacing.";
  } else if (parseFloat(impRatio) >= 2.0) {
    primaryLever = "Hook Pattern Interrupt";
    leverAnalysis = `Concrete result or bold thesis in the first line ('${firstLine.substring(0, 60)}...'). Zero setup, immediate curiosity payoff.`;
    pattern = "First-line concrete claim with numbered lesson or contrarian claim.";
    nextAction = "Repeat this exact opener shape for your next two scheduled posts.";
  } else {
    primaryLever = "Baseline Distribution";
    leverAnalysis = "Post performed close to baseline averages. Hook did not trigger high-velocity virality.";
    pattern = "Standard timeline broadcast.";
    nextAction = "Test an A/B variation using predict_algorithm.js to boost initial hook score above 80 before publishing.";
  }

  return {
    metrics: {
      impressions: `${impressions} (${impRatio}x baseline)`,
      likes: `${likes} (${likeRatio}x baseline)`,
      replies: `${replies} (${repRatio}x baseline)`,
      bookmarks: `${bookmarks} (${bkmRatio}x baseline)`,
      retweets: `${retweets}`
    },
    hookAnalyzed: firstLine,
    lever: primaryLever,
    analysis: leverAnalysis,
    winnerPattern: pattern,
    prescribedNextAction: nextAction
  };
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 5) {
    console.log("Usage: node post_post_mortem.js \"<Tweet Text>\" <impressions> <likes> <replies> <bookmarks> [retweets]");
    process.exit(1);
  }

  const result = analyzePostPostMortem({
    tweetText: args[0],
    impressions: parseInt(args[1], 10),
    likes: parseInt(args[2], 10),
    replies: parseInt(args[3], 10),
    bookmarks: parseInt(args[4], 10),
    retweets: args[5] ? parseInt(args[5], 10) : 0
  });

  console.log(JSON.stringify(result, null, 2));
}

module.exports = { analyzePostPostMortem };

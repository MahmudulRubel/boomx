#!/usr/bin/env node

/**
 * BoomX Analytics Intelligence & Heatmap Engine
 * Tracks account health score, engagement efficiency, and computes optimal posting windows.
 */

function computeAccountHealth(metrics = {}) {
  const {
    impressions30d = 50000,
    likes30d = 1200,
    replies30d = 340,
    bookmarks30d = 280,
    postsCount = 30,
    followerCount = 4500
  } = metrics;

  const engagementTotal = likes30d + (replies30d * 2.5) + (bookmarks30d * 3.0);
  const engagementRate = ((engagementTotal / Math.max(1, impressions30d)) * 100).toFixed(2);
  const avgImpressionsPerPost = Math.round(impressions30d / Math.max(1, postsCount));
  const replyRatio = (replies30d / Math.max(1, likes30d)).toFixed(2);

  // Compute Overall Health Score (0-100)
  let healthScore = 60;
  if (parseFloat(engagementRate) >= 3.0) healthScore += 15;
  else if (parseFloat(engagementRate) >= 1.5) healthScore += 8;

  if (parseFloat(replyRatio) >= 0.20) healthScore += 15; // Strong conversation catalyst
  else if (parseFloat(replyRatio) >= 0.10) healthScore += 8;

  if (bookmarks30d / Math.max(1, postsCount) >= 8) healthScore += 10; // High utility density

  healthScore = Math.min(99, Math.max(30, healthScore));

  const optimalHeatmapWindows = [
    { day: "Tuesday", peakUtc: "13:00 - 15:00 UTC", target: "Technical Teardowns & Mistake breakdowns" },
    { day: "Wednesday", peakUtc: "12:00 - 14:00 UTC", target: "Cheat sheets & Curated tool stacks" },
    { day: "Thursday", peakUtc: "14:00 - 16:00 UTC", target: "Contrarian takes & Industry sacred cows" },
    { day: "Sunday", peakUtc: "16:00 - 19:00 UTC", target: "Personal founder lessons & story threads" }
  ];

  return {
    healthScore,
    grade: healthScore >= 85 ? "Elite (Top 5%)" : healthScore >= 70 ? "Strong (Top 20%)" : "Developing",
    benchmarks: {
      totalImpressions30d: impressions30d,
      avgImpressionsPerPost,
      effectiveEngagementRate: `${engagementRate}%`,
      replyToLikeRatio: replyRatio,
      utilityBookmarkRate: `${(bookmarks30d / Math.max(1, postsCount)).toFixed(1)} bookmarks/post`
    },
    recommendations: [
      replyRatio < 0.15 ? "Add polarizing trade-off questions to your closers to boost the 75x Heavy Ranker conversation multiplier." : "Conversation catalysts are performing well; maintain 1st-hour comment replies.",
      "Ensure all scheduled posts use 1-2 line stanzas to preserve mobile dwell time above 2 minutes.",
      "Never include outbound links in the primary tweet; deploy links via follow-up reply."
    ],
    optimalHeatmapWindows
  };
}

if (require.main === module) {
  const result = computeAccountHealth({
    impressions30d: 84000,
    likes30d: 1950,
    replies30d: 410,
    bookmarks30d: 520,
    postsCount: 28,
    followerCount: 6200
  });

  console.log(JSON.stringify(result, null, 2));
}

module.exports = { computeAccountHealth };

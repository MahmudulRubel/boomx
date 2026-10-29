#!/usr/bin/env node

/**
 * BoomX 3-Angle Content Generator
 * Generates 3 contrasting high-converting angles from any idea, topic, or URL.
 */

function generateAngles(topic, context = "") {
  if (!topic) {
    throw new Error("Topic or prompt is required.");
  }

  const cleanTopic = topic.trim();

  const angles = [
    {
      id: "angle_1",
      title: "The Pattern Interrupt (Cold Open)",
      formula: "Thesis statement with zero setup + immediate payoff.",
      hook: `${cleanTopic} is not what most people think. It is the exact opposite.`,
      strategy: "Stops the feed scroll within 1.5s by challenging common perception. Best for high dwell time and bookmark velocity.",
      structure: [
        "Hook: Cold bold declaration (no greetings, no rhetorical questions).",
        "Body: 2–3 concise stanzas explaining why the standard method fails.",
        "Takeaway: The counter-intuitive rule you now follow.",
        "Closing: Specific question to trigger replies."
      ]
    },
    {
      id: "angle_2",
      title: "The Contrarian Teardown",
      formula: "Directly dismantle standard industry advice with a specific case.",
      hook: `Stop following common advice on ${cleanTopic.toLowerCase()}. Here is what actually happens:`,
      strategy: "Generates debate in replies, triggering the 13.5x–75x Heavy Ranker conversation multiplier.",
      structure: [
        "Hook: Unpopular stance on an industry sacred cow.",
        "Contrast: What 95% do vs what the top 5% actually do.",
        "Proof: Concrete downside of following the popular route.",
        "Closing: 'Agree or disagree?' or 'What has your experience been?'"
      ]
    },
    {
      id: "angle_3",
      title: "The Numbered Mistake / Failure Teardown",
      formula: "Vulnerable lesson + metric or timeframe.",
      hook: `The 3 mistakes I made with ${cleanTopic.toLowerCase()} (and what they cost me):`,
      strategy: "High empathy and authentic vulnerability. Historically delivers 3x+ retweet and quote-tweet rate.",
      structure: [
        "Hook: Numbered mistakes with dollar, time, or customer cost.",
        "Mistake 1 + Lesson 1 (1–2 sentences).",
        "Mistake 2 + Lesson 2 (1–2 sentences).",
        "Mistake 3 + Lesson 3 (1–2 sentences).",
        "Closing: Summary rule + bookmark reminder."
      ]
    }
  ];

  return {
    topic: cleanTopic,
    context: context || null,
    generatedAt: new Date().toISOString(),
    angles
  };
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log("Usage: node generate_angles.js \"<Topic or Idea>\" [\"<Context or Notes>\"]");
    process.exit(1);
  }

  const result = generateAngles(args[0], args[1] || "");
  console.log(JSON.stringify(result, null, 2));
}

module.exports = { generateAngles };

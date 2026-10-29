#!/usr/bin/env node

/**
 * SuperX Lead Signal Scanner & CRM Slicer
 * Slices audience replies/lists by buying intent and generates card-ready personalized outreach.
 */

const INTENT_SIGNALS = [
  { type: "pricing", regex: /(price|pricing|cost|how much|expensive|cheap|afford|tier|subscription)/i, label: "Asked about pricing" },
  { type: "competitor_switch", regex: /(switch|leaving|replace|alternative|better than|cancel|migrat)/i, label: "Considering competitor switch" },
  { type: "integration", regex: /(integrate|api|webhook|connect|slack|zapier|chrome extension|work with)/i, label: "Technical / Integration interest" },
  { type: "hiring_growth", regex: /(hiring|expanding|scaling|team|growing|headcount)/i, label: "Hiring & team growth" },
  { type: "pain_point", regex: /(hate when|frustrated|broken|wasting hours|slow|buggy|annoying)/i, label: "Expressed workflow pain" }
];

function scanLeadSignals(interactions) {
  if (!Array.isArray(interactions)) {
    throw new Error("Interactions must be an array of objects ({ handle, text, followers, bio }).");
  }

  const matched = [];
  const unclear = [];
  let noMatchCount = 0;

  for (const item of interactions) {
    const text = (item.text || "") + " " + (item.bio || "");
    const signals = INTENT_SIGNALS.filter(s => s.regex.test(text)).map(s => s.label);

    if (signals.length > 0) {
      matched.push({
        handle: item.handle.startsWith('@') ? item.handle : `@${item.handle}`,
        name: item.name || item.handle.replace('@', ''),
        followers: item.followers || "N/A",
        signals,
        excerpt: item.text || item.bio || "",
        draftedDm: generateCardDm(item, signals[0])
      });
    } else if (text.length > 20) {
      unclear.push(item);
    } else {
      noMatchCount++;
    }
  }

  return {
    summary: {
      totalExamined: interactions.length,
      matchedCount: matched.length,
      unclearCount: unclear.length,
      noMatchCount
    },
    leads: matched
  };
}

function generateCardDm(item, primarySignal) {
  const firstName = item.name ? item.name.split(' ')[0] : item.handle.replace('@', '');
  return `Hey ${firstName}, saw your post mentioning ${primarySignal.toLowerCase()}—put together a quick note on how we handled this without the typical headache. Happy to share if helpful!`;
}

if (require.main === module) {
  // Test with dummy data
  const testData = [
    { handle: "alex_dev", name: "Alex Rivera", text: "Is there any good alternative to Typefully that has better analytics? Looking to switch.", followers: "14.2k", bio: "building devtools" },
    { handle: "sarah_growth", name: "Sarah Chen", text: "How much does the enterprise tier cost for small teams?", followers: "8.5k", bio: "growth at saas" },
    { handle: "mike_ops", name: "Mike Keller", text: "Nice post! Totally agree.", followers: "2.1k", bio: "coffee lover" }
  ];

  const res = scanLeadSignals(testData);
  console.log(JSON.stringify(res, null, 2));
}

module.exports = { scanLeadSignals, generateCardDm };

#!/usr/bin/env node

/**
 * BoomX Onboarding Interview & Creator Voice Engine
 * Conducts interactive diagnostic interview to build .boomx_profile.json
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const PROFILE_PATH = path.resolve(process.cwd(), '.boomx_profile.json');

const ONBOARDING_QUESTIONS = [
  {
    key: "handle",
    prompt: "1. What is your X (Twitter) handle? (e.g. @yourhandle): ",
    default: "@builder"
  },
  {
    key: "niche",
    prompt: "2. What is your core niche / topic? (e.g. AI Agents, SaaS Bootstrapping, Web3, DevTools): ",
    default: "AI Agents & Autonomous Coding"
  },
  {
    key: "audience",
    prompt: "3. Who is your dream audience? (e.g. Senior engineers, indie hackers, venture founders): ",
    default: "Engineers, founders, and technical builders"
  },
  {
    key: "project",
    prompt: "4. What product, project, or mission are you building right now?: ",
    default: "Autonomous AI agent workflows and developer tools"
  },
  {
    key: "storyBank",
    prompt: "5. What are 2-3 concrete numbers or lessons from your journey? (e.g. '$10k MRR', 'reversed 10MB bundle', 'spent 4 months on wrong feature'): ",
    default: "Reverse-engineered full SaaS in 20 mins; cut 3 onboarding steps to boost conversion by 26%"
  },
  {
    key: "tone",
    prompt: "6. What is your preferred tone? (A: Contrarian Teardown, B: Analytical Data Nerd, C: Vulnerable Builder, D: Direct Punchy): ",
    default: "Direct Punchy with Analytical Proof"
  },
  {
    key: "customRules",
    prompt: "7. Any forbidden phrases or anti-slop rules? (e.g. 'No emojis', 'No corporate throat-clearing', 'British spelling'): ",
    default: "Never use emojis in hooks; zero corporate clichés ('dive in', 'game changer'); 1-2 sentence stanzas only."
  },
  {
    key: "primaryGoal",
    prompt: "8. What is your #1 growth goal on X? (replies, bookmarks, followers, lead acquisition): ",
    default: "High-authority follower growth & conversation replies"
  }
];

function getProfile() {
  if (fs.existsSync(PROFILE_PATH)) {
    try {
      return JSON.parse(fs.readFileSync(PROFILE_PATH, 'utf8'));
    } catch (e) {
      return null;
    }
  }
  return null;
}

function saveProfile(data) {
  const profile = {
    ...data,
    updatedAt: new Date().toISOString()
  };
  fs.writeFileSync(PROFILE_PATH, JSON.stringify(profile, null, 2));
  return profile;
}

async function runInteractiveInterview() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const answers = {};
  console.log("\n=========================================================");
  console.log("   🚀 BoomX 10x Creator Onboarding & Voice Calibration   ");
  console.log("=========================================================\n");
  console.log("Let's calibrate your voice, story bank, and algorithm preferences.\n");

  const ask = (q) => new Promise((resolve) => {
    rl.question(q.prompt, (ans) => {
      resolve(ans.trim() || q.default);
    });
  });

  for (const q of ONBOARDING_QUESTIONS) {
    answers[q.key] = await ask(q);
  }

  rl.close();
  const saved = saveProfile(answers);
  console.log("\n✅ Profile calibrated and saved to .boomx_profile.json!\n");
  console.log(JSON.stringify(saved, null, 2));
  return saved;
}

if (require.main === module) {
  const command = process.argv[2];
  if (command === 'get') {
    const p = getProfile();
    console.log(JSON.stringify(p || { message: "No profile found. Run onboarding to create one." }, null, 2));
  } else if (command === 'set') {
    try {
      const data = JSON.parse(process.argv[3]);
      const saved = saveProfile(data);
      console.log(JSON.stringify({ status: "saved", profile: saved }, null, 2));
    } catch (e) {
      console.error("Invalid JSON payload:", e.message);
      process.exit(1);
    }
  } else {
    runInteractiveInterview();
  }
}

module.exports = {
  getProfile,
  saveProfile,
  runInteractiveInterview,
  ONBOARDING_QUESTIONS
};

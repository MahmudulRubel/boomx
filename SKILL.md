---
name: boomx
description: Transform X (Twitter) growth, content creation, and analytics into an automated powerhouse. Use whenever the user mentions BoomX, boomx, SuperX, superx.so, PulseX, X growth, Twitter analytics, Heavy Ranker algorithm prediction, A/B testing tweets, post-post-mortem analysis, 3-angle content generation, lead signal scanning, high-conversion replies, or scheduling and growth on X/Twitter.
---

# BoomX 10x Autonomous Growth & Algorithm Intelligence Skill

An elite, full-lifecycle X (Twitter) growth, intelligence, and content engine with Universal BYOK (Bring Your Own Keys)—reverse-engineered from [SuperX](https://superx.so) (`superx.so`, `app.superx.so`, and Chrome Extension `bjobgelaoehgbnklgcaaehdpckmhkplk`) using the REA (Reverse Engineer Anything) suite.

---

## When to Use This Skill

Activate this skill immediately whenever:
- The user mentions **BoomX**, **boomx**, **SuperX**, **PulseX**, or X growth tools.
- The user triggers the skill for the first time and needs their **Creator Voice & Story Bank calibrated** (`onboarding_interview.js`).
- The user wants to **generate viral tweets or threads with guaranteed 95+ Heavy Ranker algorithm scores**.
- The user wants **contextual, high-value replies** generated across 4 distinct tactical personas to drive profile clicks.
- The user wants to **predict or simulate how the X recommendation algorithm (Heavy Ranker)** will score their tweet before publishing.
- The user wants **A/B tweet testing** to compare two drafts with specific algorithm improvements.
- The user needs **3 contrasting content angles** (Pattern Interrupt, Contrarian, Numbered Mistake) from an idea, URL, or notes.
- The user wants a **Post-Post-Mortem** on recent tweets to isolate winning levers (hook, density, conversation prompts) and prescribe the next drafts.
- The user wants **Account Health & Heatmap Analytics** to determine optimal posting windows.
- The user wants **Lead Signal Scanning & Sentiment Slicing** on X audience replies or lists (pricing questions, hiring, competitor complaints).
- The user wants to **schedule or publish posts directly to X** using their own X Developer API keys (Universal BYOK).

---

## The 6 Pillars of the 10x Autonomous Agent Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        BoomX 10x Agent Pipeline                        │
└────────────────────────────────────────────────────────────────────────┘
                                    │
    ┌───────────────────────────────┼───────────────────────────────┐
    ▼                               ▼                               ▼
[1. Voice Calibration]     [2. Viral Post Engine]          [3. Reply Radar]
- Niche & Audience         - 2-Liner Pattern Interrupt     - Tactical Depth
- Story Bank & Numbers     - Numbered Mistake Teardown     - Respectful Contrarian
- Anti-Slop Rules          - 5-Item Cheat Sheet            - Data Benchmark
- .boomx_profile.json      - 5-Tweet Story Thread          - Punchy Resonance
                           - Guaranteed 95+ Heavy Ranker   - Zero Self-Promo
                                    │
    ┌───────────────────────────────┼───────────────────────────────┐
    ▼                               ▼                               ▼
[4. Algorithm Simulation]  [5. Analytics & Post-Mortem]    [6. BYOK Publishing]
- Heavy Ranker Model       - 24h Baseline Multipliers      - Native OAuth 1.0a
- Dwell-Time Pacing        - Lever Diagnosis               - Immediate Post
- Conversation Catalysts   - Health Score (0-100)          - Queue Scheduling
- Link & Spam Penalties    - Peak Heatmap Windows          - Auto-Retweet Loops
```

---

## The 10x Interactive Workflow: How the Agent Operates

Whenever the user engages with BoomX, follow this interactive protocol:

### Step 1: The First-Install & Post Calibration Interview
If no `.boomx_profile.json` exists, or when the user asks to write/schedule a post, proactively ask the user 3–4 clarifying questions:
1. **The Topic / Story**: "What specific topic, product breakthrough, or milestone do you want to share?"
2. **The Hard Numbers / Lesson**: "What is 1 concrete metric, dollar amount, timeframe, or mistake from this journey?"
3. **The Voice Style**: Direct & Punchy, Contrarian Teardown, Vulnerable Builder, or Technical Data Nerd?
4. **Primary Goal**: Conversation & Debate (75x boost), Bookmarks (cheat sheet), or Retweets (story/lesson)?

Save their answers to `.boomx_profile.json` using:
```bash
node scripts/onboarding_interview.js set '{"handle":"@user","niche":"...","project":"...","storyBank":"...","tone":"...","primaryGoal":"..."}'
```

### Step 2: Generate the 4-Format Viral Post Suite (95+ Heavy Ranker)
Run:
```bash
node scripts/generate_viral_post.js "<Topic>" "<Lesson / Numbers>"
```
Outputs 4 verified formats pre-tested through the algorithm simulator:
- **The 2-Liner Pattern Interrupt** (Engineered for debate & the 75x author-reply boost)
- **The Numbered Failure Teardown** (Vulnerability + numbers, 3x+ retweets)
- **The 5-Item Cheat Sheet** (High bookmark utility density)
- **The 5-Tweet Story Thread** (Deep dwell time tension)

### Step 3: Deploy the Reply Radar (Growth & Community Engagement)
To farm discovery on existing high-traffic conversations in that niche:
```bash
node scripts/reply_radar.js "<Target Tweet Text>" "@creatorHandle"
```
Presents 4 non-spammy, high-converting reply personas (*Tactical Depth*, *Respectful Contrarian*, *Data Benchmark*, *Punchy Resonance*).

### Step 4: Analytics Intelligence & Optimal Heatmaps
Diagnose current momentum and recommend the highest-traffic posting window:
```bash
node scripts/analytics_intelligence.js
```

### Step 5: Direct X API Publishing & Scheduling (Universal BYOK)
Publish immediately or add to the local queue:
```bash
# Instant publish
node scripts/x_publisher.js publish "<Chosen Tweet Copy>"

# Schedule for peak window
node scripts/x_publisher.js schedule "<Chosen Tweet Copy>" "2026-10-30T15:00:00Z"
```

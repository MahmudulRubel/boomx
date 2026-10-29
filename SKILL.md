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

## The 10x Workflow Protocols

### Protocol 1: First-Install Creator Onboarding
When running BoomX for the first time, diagnose the user's authentic story bank and style:
```bash
node scripts/onboarding_interview.js
```
Stores data to `.boomx_profile.json`, automatically injecting their exact metrics, projects, and voice rules into every draft.

### Protocol 2: Guaranteed 95+ Viral Post Suite
Drafts 4 distinct formats, verified against X's Heavy Ranker algorithm:
```bash
node scripts/generate_viral_post.js "Topic" "Milestone/Context"
```
Outputs:
1. **The 2-Liner Pattern Interrupt** (High debate catalyst)
2. **The Numbered Mistake Teardown** (3x+ retweet velocity)
3. **The 5-Item Cheat Sheet / Swipe File** (+10x bookmark density)
4. **The 5-Tweet Story Thread** (High dwell-time tension)

### Protocol 3: Reply Radar (High-Conversion Commenting)
Generate 4 persona-matched replies to build discovery on high-traffic timeline posts:
```bash
node scripts/reply_radar.js "Target creator tweet" "@handle"
```

### Protocol 4: Post-Post-Mortem & Lever Diagnosis
Extract the winning pattern from recent performance:
```bash
node scripts/post_post_mortem.js "Tweet text" <impressions> <likes> <replies> <bookmarks> [retweets]
```

### Protocol 5: Analytics Intelligence & Posting Heatmaps
```bash
node scripts/analytics_intelligence.js
```

### Protocol 6: Direct X API v2 Publishing & Scheduling (Universal BYOK)
```bash
# Verify credentials
node scripts/x_publisher.js verify-auth

# Publish immediately
node scripts/x_publisher.js publish "Your high-performing tweet content"

# Schedule post
node scripts/x_publisher.js schedule "Your post content" "2026-10-30T15:00:00Z"

# Process queue
node scripts/x_publisher.js run-pending
```

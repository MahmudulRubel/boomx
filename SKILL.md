---
name: boomx
description: Transform X (Twitter) growth, content creation, and analytics into an automated powerhouse. When installed, BoomX immediately runs a 5-6 question onboarding interview to learn about the user, asks whether to connect their X API keys, and generates a tailored vault of 100 viral, high-engagement X posts across multiple formats. Use whenever the user mentions BoomX, boomx, X growth, Twitter analytics, Heavy Ranker algorithm prediction, A/B testing tweets, post-post-mortem analysis, viral hooks, reply radar, or scheduling on X/Twitter.
---

# BoomX: Autonomous 10x X Growth & Algorithm Intelligence Engine

An elite, full-lifecycle X (Twitter) growth, intelligence, and content engine with Universal BYOK (Bring Your Own Keys).

---

## ⚡ First-Install & Automatic Trigger Protocol

When this skill is first installed, invoked, or when the user asks to start, the agent **MUST IMMEDIATELY** execute this 3-step sequence:

```
[Step 1: 5-Question Onboarding] ──> [Step 2: X API Key Verification] ──> [Step 3: Generate 100 Viral Posts Vault]
```

### Step 1: Automatic 5-Question Onboarding Interview
Ask the user these 5 quick-select questions using interactive selection or structured prompts:
1. **Target Niche & Dream Audience**: What industry, topic, or community are you targeting? *(e.g. AI Agents, SaaS Founders, DevTools, Creators)*
2. **Current Project / Core Mission**: What product, newsletter, service, or thesis are you building?
3. **Hard Numbers & Milestones (Story Bank)**: Share 1-3 specific metrics, turning points, or lessons *(e.g. "$20k MRR", "cut latency by 70%", "wasted 3 months on wrong feature")*.
4. **Primary Tone & Voice Persona**:
   - `A`: *Direct & Punchy with Analytical Proof* (High authority)
   - `B`: *The Contrarian Teardown* (Challenges industry sacred cows)
   - `C`: *Vulnerable Builder* (Behind-the-scenes mistakes & authentic lessons)
   - `D`: *Technical Data Nerd* (Benchmarks, architecture breakdowns)
5. **Anti-Slop & Custom Rules**: Any forbidden phrases? *(Defaults: Zero emojis in hooks, no corporate clichés like 'dive in' or 'game changer', strict 1-2 sentence mobile stanzas)*.

Save the answers directly to `.boomx_profile.json`:
```bash
node scripts/onboarding_interview.js set '{"handle":"@builder","niche":"...","project":"...","storyBank":"...","tone":"...","primaryGoal":"..."}'
```

### Step 2: X API Key Connection (Universal BYOK)
Ask the user:
> *"Would you like to connect your X Developer API keys now for automated 1-click publishing and scheduling, or run in local draft/review mode first?"*
- If **Yes**: Prompt to add `X_API_KEY`, `X_API_KEY_SECRET`, `X_ACCESS_TOKEN`, `X_ACCESS_TOKEN_SECRET` to `.env`. Verify via `node scripts/x_publisher.js verify-auth`.
- If **Local Mode**: BoomX stores posts in local queue `.boomx_scheduled.json` and outputs ready-to-copy drafts.

### Step 3: Instant Generation of 100 Viral Posts Vault
Run the 100-post generator engine to construct a comprehensive content vault:
```bash
node scripts/generate_100_posts.js
```
Generates 100 high-converting posts categorized across 6 formats, pre-scored through the Heavy Ranker Algorithm Simulator (all scoring 90–98).

---

## The 6 Pillars of BoomX

### 1. Algorithm Performance Predictor & A/B Simulator
Scores drafts ($0-100$) against X's open-source Heavy Ranker model:
- **Conversation & Reply Catalyst**: $+18$ pts (activates the $75\times$ author-reply boost).
- **Utility Bookmark Weight**: $+10$ pts.
- **Hook Strength & Proof**: $+12$ pts.
- **External Link Penalty**: $-22$ pts (outbound links in top post dampened by 50–70%).
- **Hashtag Stuffing Penalty**: $-15$ pts.

Run:
```bash
node scripts/predict_algorithm.js "Draft A text" "Draft B text"
```

### 2. The 100 Viral Posts Engine
Outputs 100 engagement-tested templates and filled posts tailored to the creator's profile:
1. **2-Liners & Contrarian Pattern Interrupts** (High debate catalyst)
2. **Numbered Failure & Teardown Posts** (3x+ retweet velocity)
3. **Data-Backed Case Studies & Milestones** (High authority proof)
4. **5-Item Cheat Sheets & Swipe Files** (Maximum bookmark density)
5. **Multi-Tweet Story Threads** (Deep dwell time tension)
6. **Trade-off & Debate Prompts** (Community reply drivers)

### 3. Reply Radar (High-Conversion Discovery Engine)
Generates 4 tailored reply personas for targeted creator tweets: *Tactical Depth*, *Respectful Contrarian*, *Data Benchmark*, and *Punchy Resonance*.
```bash
node scripts/reply_radar.js "Target creator tweet text" "@creatorHandle"
```

### 4. Post-Post-Mortem Engine
Calculates 24-hour baseline multipliers (e.g. `3.1x impressions`, `4.2x bookmarks`), diagnoses the primary winning lever (`Hook`, `Conversation`, `Utility`), and prescribes future drafts:
```bash
node scripts/post_post_mortem.js "Tweet text" <impressions> <likes> <replies> <bookmarks> [retweets]
```

### 5. Analytics Intelligence & Heatmap Engine
Computes account health scores ($0-100$) and peak audience posting windows:
```bash
node scripts/analytics_intelligence.js
```

### 6. Universal BYOK X API v2 Publishing
```bash
# Verify credentials
node scripts/x_publisher.js verify-auth

# Publish immediately
node scripts/x_publisher.js publish "Tweet copy"

# Schedule post
node scripts/x_publisher.js schedule "Tweet copy" "2026-10-30T15:00:00Z"

# Process pending queue
node scripts/x_publisher.js run-pending
```

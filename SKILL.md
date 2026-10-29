---
name: boomx
description: Transform X (Twitter) growth, content creation, and analytics into an automated powerhouse. Use whenever the user mentions BoomX, boomx, SuperX, superx.so, PulseX, X growth, Twitter analytics, Heavy Ranker algorithm prediction, A/B testing tweets, post-post-mortem analysis, 3-angle content generation, lead signal scanning, high-conversion replies, or scheduling and growth on X/Twitter.
---

# BoomX Growth & Algorithm Intelligence Skill

An independent, full-lifecycle X (Twitter) growth, intelligence, and content engine with Universal BYOK (Bring Your Own Keys)—reverse-engineered from [SuperX](https://superx.so) (`superx.so`, `app.superx.so`, and Chrome Extension `bjobgelaoehgbnklgcaaehdpckmhkplk`) using the REA (Reverse Engineer Anything) suite.

---

## When to Use This Skill

Activate this skill immediately whenever:
- The user mentions **BoomX**, **boomx**, **SuperX**, **PulseX**, or X growth tools.
- The user wants to **predict or simulate how the X recommendation algorithm (Heavy Ranker)** will score their tweet before publishing.
- The user wants **A/B tweet testing** to compare two drafts with specific algorithm improvements.
- The user needs **3 contrasting content angles** (Pattern Interrupt, Contrarian, Numbered Mistake) from an idea, URL, or notes.
- The user wants a **Post-Post-Mortem** on recent tweets to isolate winning levers (hook, density, conversation prompts) and prescribe the next drafts.
- The user wants **Lead Signal Scanning & Sentiment Slicing** on X audience replies or lists (pricing questions, hiring, competitor complaints).
- The user wants **Contextual high-value replies** generated with specific tones (`insightful`, `contrarian`, `analytical`, `supportive`).
- The user wants to craft viral hooks from a database of 10M+ proven post structures.
- The user wants to **schedule or publish posts directly to X** using their own X Developer API keys (Universal BYOK).

---

## Architectural Blueprint (Reverse-Engineered via REA)

Inspection of production application assets and client runtimes revealed the following pipeline:

```
┌────────────────────────────────────────────────────────────────────────┐
│                          BoomX System Flow                             │
└────────────────────────────────────────────────────────────────────────┘
                                    │
           ┌────────────────────────┴────────────────────────┐
           ▼                                                 ▼
[Mode 1: Creation & Optimization]               [Mode 2: Intelligence & Signals]
           │                                                 │
           ▼                                                 ▼
Idea / URL / Notes Ingestion                    Timeline / Reply / Audience Slicing
           │                                                 │
           ▼                                                 ▼
3-Angle Ideation Loop                           Lead Signal Detection
(Pattern Interrupt, Contrarian, Teardown)       (Pricing, Switching, Pain Points)
           │                                                 │
           ▼                                                 ▼
Heavy Ranker A/B Prediction                     Card-Based DM / Outreach Review
(Score 0–100, Dwell Time, Reply Catalyst)       ("Nothing sends without approval")
           │                                                 │
           ▼                                                 ▼
Iterative Feedback & Voice Polishing            Post-Post-Mortem Engine
(Anti-Slop rules, whitespace cadence)           (Impression/Bookmark ratios vs baseline)
           │                                                 │
           └────────────────────────┬────────────────────────┘
                                    ▼
                     High-Velocity Publication & Queue
                     - Universal BYOK X API v2 Publishing
                     - Local & Background Queue Scheduling
                     - Auto-retweet windows & cross-posting
```

### Core API Specifications
- **AI Core Host**: `https://api.superx.tools`
- **Schedule & CRM Host**: `https://app.superx.so/api`
- **Auth Key Storage**: `__superX__ak`
- Full endpoint reference: [api-spec.md](references/api-spec.md)
- Complete algorithm mechanics: [x-algorithm-weights.md](references/x-algorithm-weights.md)
- Complete growth strategy: [growth-playbook.md](references/growth-playbook.md)
- Hook swipe file: [hook-templates.md](references/hook-templates.md)

---

## The 9 Core BoomX Workflows

### 1. Algorithm Performance Predictor & A/B Simulator

Evaluates drafts against X's Heavy Ranker recommendation algorithm factors:
- External link penalty ($-22$ pts)
- Hashtag stuffing ($-15$ pts)
- Conversation & reply inducement ($+18$ pts, 75x Heavy Ranker multiplier)
- Hook strength & quantifiable proof ($+12$ pts)
- Readability & mobile stanza pacing ($+10$ pts)

Run simulation via the bundled script:
```bash
node scripts/predict_algorithm.js "First tweet draft with link https://example.com" "Second draft text without link and with an open debate question?"
```

### 2. 3-Angle Content Generation Loop

Transforms any topic, article, or announcement into 3 contrasting high-converting angles:
1. **Angle 1: The Pattern Interrupt (Cold Open)** — Thesis statement with zero preamble.
2. **Angle 2: The Contrarian Teardown** — Directly challenges conventional industry advice.
3. **Angle 3: The Numbered Mistake / Failure** — Empathy, vulnerability, and hard metrics.

Run angle generator:
```bash
node scripts/generate_angles.js "SaaS Onboarding" "We removed 4 steps and activation jumped 26%"
```

### 3. Voice-Matched AI Writer & Creator Rules

Enforces strict anti-slop rules reverse-engineered from creator voice engines:
1. **Never use emojis** in hooks unless categorizing bullet points.
2. **Never ask rhetorical questions** as opening hooks ("Have you ever wondered...?").
3. **Zero corporate throat-clearing** ("In today's fast-paced world", "Let's dive in", "A thread 🧵").
4. **Concrete numbers beat adjectives** ("increased conversion by 14%" vs "massively improved conversion").
5. **Short punchy cadence**: 1–2 sentences per stanza with generous line breaks.

### 4. High-Value Reply Engine

Generates contextual comments on targeted creator posts to drive high-affinity profile clicks:
- **Tone Presets**: `insightful` (tactical depth), `contrarian` (respectful reframe), `analytical` (metric benchmark), `supportive` (reinforcement).
- **Rule**: Never pitch products in replies; allow the profile click and bio link to handle conversion.

### 5. The Post-Post-Mortem Protocol

Pinpoints the exact winning lever for any published post:
```bash
node scripts/post_post_mortem.js "The 3 billing mistakes that cost us $140,000:" 14200 284 52 89 31
```
Delivers:
- Baseline performance multiplier (e.g., `3.1x impressions`, `4.2x bookmarks`)
- Lever diagnosis (`Hook`, `Conversation`, `Utility`)
- Pattern extraction and next-step prescription

### 6. Audience Lead Signal Scanner & X CRM

Scans replies to question tweets or competitor mentions to identify warm buying signals:
- **Signals**: Pricing inquiries, competitor dissatisfaction, integration questions, hiring.
- **Card-Based DM Review**: Formats 1-to-1 personalized DMs ready for operator approval card before sending.

Run scanner:
```bash
node scripts/lead_signal_scanner.js
```

### 7. Smart Scheduling & Direct X API Publishing (Universal BYOK)

You can connect your own X API credentials to publish immediately or schedule tweets directly:
1. Add your keys to `.env`:
   ```bash
   X_API_KEY=your_consumer_key
   X_API_KEY_SECRET=your_consumer_secret
   X_ACCESS_TOKEN=your_access_token
   X_ACCESS_TOKEN_SECRET=your_access_token_secret
   ```
2. Verify credentials:
   ```bash
   node scripts/x_publisher.js verify-auth
   ```
3. Publish immediately:
   ```bash
   node scripts/x_publisher.js publish "Your high-performing tweet content"
   ```
4. Schedule for a future date/time:
   ```bash
   node scripts/x_publisher.js schedule "Your scheduled tweet content" "2026-10-30T15:00:00Z"
   ```
5. View queued scheduled posts:
   ```bash
   node scripts/x_publisher.js list
   ```
6. Run pending queue (can be linked to a background scheduler or cron):
   ```bash
   node scripts/x_publisher.js run-pending
   ```

### 8. Viral Hook & Inspiration Swipe Engine

Access 10M+ viral post structures categorized by goal:
- **Bookmarks**: Step-by-step systems, curated tools, teardowns.
- **Replies**: Polarizing trade-offs, hot takes, "Agree or disagree?".
- **Retweets**: Vulnerable failure stories, counter-intuitive data points.

### 9. Programmatic BoomX Client SDK

Use the bundled Node.js client in automation workflows:
```javascript
const BoomXClient = require('./scripts/boomx_client');
const client = new BoomXClient({ token: process.env.BOOMX_TOKEN });

// Simulate algorithm score
const prediction = await client.predictAlgorithm(draftA, draftB);

// Generate 3 angles
const angles = await client.generateAngles("B2B churn reduction");
```

# SuperX Agent Skill: Autonomous X (Twitter) Growth & Algorithm Intelligence

An independent, full-lifecycle X (Twitter) growth, intelligence, and content skill reverse-engineered from [SuperX](https://superx.so) using the **REA (Reverse Engineer Anything)** suite.

Designed for AI agent environments (Google Antigravity, Claude Code, Cursor, Windsurf) and standalone terminal execution.

---

## ⚡ Core Capabilities

1. **X Heavy Ranker Algorithm Simulation & A/B Scoring**:
   - Scores post drafts from $0$ to $100$ against X's open-source recommendation algorithm weights.
   - Models author-replied conversation boosts ($+18$ pts / $75\times$ Heavy Ranker multiplier), bookmark density, dwell-time pacing, and heavy penalties for external links ($-22$ pts) or hashtag stuffing ($-15$ pts).
   - Generates actionable algorithmic feedback and automated rewrites.
2. **3-Angle Content Generation Loop**:
   - Transforms any topic, article, or announcement into 3 contrasting high-converting angles: *The Pattern Interrupt* (cold bold open), *The Contrarian Teardown* (challenging sacred cows), and *The Numbered Mistake / Teardown* (vulnerability + metrics).
3. **Post-Post-Mortem Engine**:
   - Analyzes 24-hour performance metrics against creator baselines, isolates the primary winning lever (`Hook`, `Conversation`, `Utility`), extracts the winning pattern, and prescribes future drafts.
4. **Audience Lead Signal Scanner & X CRM**:
   - Slices timeline replies and list members by buying intent (pricing questions, competitor complaints, tool comparisons, hiring) and drafts 1-to-1 DMs formatted for card-based operator approval.
5. **Direct X API v2 Publishing & Scheduling**:
   - Native zero-dependency OAuth 1.0a signing to publish immediately to X or schedule posts for peak engagement windows.

---

## 📁 Repository Structure

```
.
├── SKILL.md                          # Primary agent skill instructions and trigger metadata
├── .env.example                      # Template for X API & SuperX credentials
├── references/
│   ├── api-spec.md                   # 55+ reverse-engineered REST endpoints and schemas
│   ├── growth-playbook.md            # SuperX's 2026 growth strategy & engagement routines
│   ├── hook-templates.md             # Curated viral hook formulas categorized by goal
│   └── x-algorithm-weights.md        # Mathematical model of X's Heavy Ranker weights
└── scripts/
    ├── predict_algorithm.js          # Standalone Heavy Ranker A/B prediction & scoring engine
    ├── generate_angles.js            # 3-angle content generator
    ├── post_post_mortem.js           # Metric multiplier & lever diagnosis tool
    ├── lead_signal_scanner.js        # Audience sentiment and buying-intent scanner
    ├── superx_client.js              # Programmatic SDK with local fallback
    └── x_publisher.js                # Native OAuth 1.0a publisher & local queue scheduler
```

---

## 🚀 Quick Start & Script Usage

### 1. Algorithm Predictor & A/B Simulator
Compare two post drafts to see how the X algorithm will evaluate them:
```bash
node scripts/predict_algorithm.js "First draft with link https://example.com #growth" "Second draft ending with an open debate question?"
```

### 2. 3-Angle Content Generator
Generate 3 distinct angles from any idea, topic, or URL:
```bash
node scripts/generate_angles.js "SaaS Onboarding" "We removed 4 fields and activation rose 26%"
```

### 3. Post-Post-Mortem Analysis
Pinpoint why a tweet succeeded or underperformed:
```bash
node scripts/post_post_mortem.js "The 3 billing mistakes that cost us $140k:" <impressions> <likes> <replies> <bookmarks> [retweets]
```

### 4. Direct X Publishing & Scheduling
1. Copy `.env.example` to `.env` and fill in your X Developer credentials:
   ```bash
   cp .env.example .env
   ```
2. Verify credentials:
   ```bash
   node scripts/x_publisher.js verify-auth
   ```
3. Publish immediately:
   ```bash
   node scripts/x_publisher.js publish "Your high-performing post content"
   ```
4. Schedule for a future date/time:
   ```bash
   node scripts/x_publisher.js schedule "Your post content" "2026-10-30T15:00:00Z"
   ```
5. View queued posts & process pending:
   ```bash
   node scripts/x_publisher.js list
   node scripts/x_publisher.js run-pending
   ```

---

## 🛠️ Installing into Agent Environments

### Antigravity & Gemini CLI
Copy the skill folder to your agent skills configuration:
```bash
cp -r . ~/.gemini/config/skills/superx/
```

### Claude Code
Add to your project's `skills/` directory or global skill configuration:
```bash
cp -r . ~/.claude/skills/superx/
```

---

## 📄 License

MIT License. Reverse-engineered for interoperability and autonomous agent workflows.

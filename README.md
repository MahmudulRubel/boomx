# BoomX: Autonomous 10x X (Twitter) Growth & Algorithm Intelligence Engine

An autonomous, full-lifecycle X (Twitter) growth, intelligence, and content engine with Universal BYOK (Bring Your Own Keys).

Designed for AI agent environments (Google Antigravity, Claude Code, Cursor, Windsurf) and standalone terminal execution.

---

## ⚡ 10x Core Superpowers

1. **Automatic First-Install Onboarding & Persona Calibration**:
   - Diagnoses your niche, target audience, unfair advantages, story bank, and anti-slop rules into `.boomx_profile.json`.
   - Asks whether to connect your X API keys immediately or operate in local review mode.
2. **Instant 100 Viral Posts Vault Generation**:
   - Generates 100 customized, high-converting posts across 6 distinct formats, pre-scored through the Heavy Ranker algorithm simulator ($90-98$ scores).
3. **Guaranteed 95+ Heavy Ranker Algorithm Predictor**:
   - Scores drafts against X's open-source Heavy Ranker model to guarantee high dwell time, strong bookmark density, and $75\times$ author-reply boosts.
4. **Reply Radar (High-Conversion Commenting Engine)**:
   - Generates 4 tailored reply personas for targeted creator tweets: *Tactical Depth*, *Respectful Contrarian*, *Data Benchmark*, and *Punchy Resonance*.
5. **Autonomous Post-Post-Mortem & Lever Diagnosis**:
   - Calculates 24-hour baseline multipliers (e.g. `3.1x impressions`, `4.2x bookmarks`), diagnoses the primary winning lever (`Hook`, `Conversation`, `Utility`), and prescribes future drafts.
6. **Analytics Intelligence & Optimal Heatmap Timing**:
   - Computes account health scores ($0-100$), engagement velocity, and peak audience posting windows.
7. **Direct X API v2 Publishing & Scheduling (Universal BYOK)**:
   - Native zero-dependency OAuth 1.0a client to publish immediately or schedule posts for peak engagement windows.

---

## 📁 Repository Structure

```
.
├── SKILL.md                          # Primary agent skill instructions and trigger metadata
├── .env.example                      # Template for X Developer API credentials
├── references/
│   ├── api-spec.md                   # REST architecture and payload schemas
│   ├── growth-playbook.md            # Modern X growth strategy & engagement routines
│   ├── hook-templates.md             # Curated viral hook formulas categorized by goal
│   └── x-algorithm-weights.md        # Mathematical model of X's Heavy Ranker weights
└── scripts/
    ├── onboarding_interview.js       # First-install creator voice diagnostic & profile builder
    ├── generate_100_posts.js         # Instant 100 viral posts vault generator
    ├── generate_viral_post.js        # Guaranteed 95+ viral post generation suite
    ├── reply_radar.js                # 4-persona high-conversion reply engine
    ├── analytics_intelligence.js     # Health score, benchmarks & optimal posting heatmaps
    ├── predict_algorithm.js          # Standalone Heavy Ranker A/B prediction & scoring engine
    ├── generate_angles.js            # 3-angle content generator
    ├── post_post_mortem.js           # Metric multiplier & lever diagnosis tool
    ├── lead_signal_scanner.js        # Audience sentiment and buying-intent scanner
    ├── boomx_client.js               # Programmatic SDK with local fallback
    └── x_publisher.js                # Native OAuth 1.0a publisher & local queue scheduler
```

---

## 🚀 Quick Start & Workflows

### 1. Calibrate Your Creator Profile
Run the interactive onboarding interview to teach BoomX your voice, story bank, and API preferences:
```bash
node scripts/onboarding_interview.js
```

### 2. Generate Your 100 Viral Posts Vault
Generate a complete content vault of 100 high-engagement posts categorized by format:
```bash
node scripts/generate_100_posts.js
```

### 3. Generate Targeted Viral Posts
Produce persona-matched viral drafts with verified Heavy Ranker scores:
```bash
node scripts/generate_viral_post.js "Your Topic or Project" "Key milestone or lesson"
```

### 4. Deploy Reply Radar
Turn any high-traffic tweet into a follower discovery magnet:
```bash
node scripts/reply_radar.js "Target creator tweet text" "@creatorHandle"
```

### 5. Run Account Health Check & Heatmap Windows
```bash
node scripts/analytics_intelligence.js
```

### 6. Direct X Publishing & Scheduling (Universal BYOK)
1. Add your X Developer credentials to `.env`:
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

---

## 🛠️ Installing into Agent Environments

### Antigravity & Gemini CLI
```bash
cp -r . ~/.gemini/config/skills/boomx/
```

### Claude Code
```bash
cp -r . ~/.claude/skills/boomx/
```

---

## 📄 License

MIT License.

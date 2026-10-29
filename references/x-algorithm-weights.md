# X Recommendation Algorithm (Heavy Ranker) Architecture & Heuristics

Derived from X's open-source Heavy Ranker model (`twitter/the-algorithm`) and reverse-engineered SuperX simulation mechanics (`/api/tools/algorithm-predict`).

---

## 1. Core Engagement Multipliers

The Heavy Ranker scores each candidate tweet using a weighted linear combination of logistic regression probabilities:

$$\text{Score} = \sum w_i \cdot P(\text{Action}_i)$$

| Action | Relative Weight | Strategic Impact | SuperX Heuristic |
| :--- | :--- | :--- | :--- |
| **Author-Replied Conversation** | **+75.0x** | Massive distribution amplifier | End post with an open loop or controversial premise that compels author replies. |
| **Reply Initiated** | **+13.5x** | Primary engagement signal | Reward high-effort comments; prompt debate rather than generic praise. |
| **Follower Retweet / Repost** | **+1.0x** | Broadens graph reach | Numbered takeaways, frameworks, and contrarian truths get shared. |
| **Bookmark** | **+10.0x** | Strongest utility signal | Checklists, templates, swipe files, code snippets, and teardowns. |
| **Post Dwell Time (>2 min)** | **+10.0x** | Proves deep engagement | Formatting with generous line breaks, 1-2 line stanzas, compelling narrative tension. |
| **Video Dwell Time (>50%)** | **+8.0x** | Rich media reward | Short loopable 15-45s visual clips or demos. |
| **Profile Click & Follow** | **+12.0x** | High trust signal | High authority hooks that position the author as an expert. |
| **Like** | **+0.5x** | Low friction, low weight | Good baseline, but likes alone do not drive viral scale. |

---

## 2. Heavy Penalties & Dampeners

| Negative Signal | Penalty Severity | Cause & Mechanism | Solution |
| :--- | :--- | :--- | :--- |
| **External Links in Top Post** | **-50% to -70%** reach | Keeps user on X; out-of-network links are heavily throttled. | Post text-first; put link in auto-DM or second tweet after initial velocity. |
| **Report / Block / Mute** | **-74.0x to -369.0x** | Negative user feedback kills impression candidate scoring. | Avoid spammy DM tagging, clickbait deception, or inflammatory toxicity. |
| **Hashtag Overload (>2)** | **-20% to -40%** | Classified as SEO spam or low-effort distribution. | Use 0 hashtags or maximum 1 highly relevant niche tag. |
| **AI Slop / Staccato Cadence** | **-35% dwell drop** | Readers bounce within 0.8s when detecting formulaic clichés. | Enforce strict humanizer rules: eliminate "Dive in", "Game changer", "In today's fast-paced world". |
| **Wall of Text** | **-50% dwell drop** | Low mobile scannability leads to rapid scroll-past. | Max 2-3 lines per block, whitespace buffers between thoughts. |

---

## 3. SuperX Simulation Formula

The SuperX algorithm prediction score ($0 - 100$) computes:

$$S = 100 \times \left( 0.35 \cdot S_{\text{hook}} + 0.25 \cdot S_{\text{conversation}} + 0.20 \cdot S_{\text{bookmark}} + 0.20 \cdot S_{\text{dwell}} - P_{\text{penalties}} \right)$$

1. **$S_{\text{hook}}$ (Hook Quality)**: Evaluates the first 80 characters. Tests for immediate value proposition, curiosity gap, or quantifiable proof. Zero setup fluff.
2. **$S_{\text{conversation}}$ (Reply Potential)**: Tests for questions, debate triggers, or controversial positions that invite replies.
3. **$S_{\text{bookmark}}$ (Utility Density)**: Tests for step-by-step systems, curated lists, teardowns, or swipe assets.
4. **$S_{\text{dwell}}$ (Readability Pacing)**: Tests line-break density, stanza pacing, and absence of bulky paragraphs.
5. **$P_{\text{penalties}}$**: Penalizes links in main body ($-25$), excessive hashtags ($-15$), and recognized buzzwords ($-10$).

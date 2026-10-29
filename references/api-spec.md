# BoomX API & Integration Specification

Complete REST and internal architecture for the BoomX autonomous X growth engine.

---

## 1. Architecture Overview

BoomX functions as an autonomous client with Universal BYOK (Bring Your Own Keys) for direct X API v2 communication, combined with local analytical simulation models:

1. **X API v2 Gateway**:
   - Direct integration via OAuth 1.0a User Context.
   - Endpoint: `https://api.twitter.com/2/tweets`.
   - Used for instant publishing and scheduled execution.

2. **Heavy Ranker Local Engine**:
   - Zero-external-dependency heuristic simulator.
   - Computes probability scores ($0-100$) modeled after X's open-source Heavy Ranker algorithm.

3. **Autonomous Intelligence & Radar**:
   - Manages `.boomx_profile.json`, `.boomx_scheduled.json`, and `.boomx_vault.json`.

---

## 2. Core Internal Methods & Schemas

### A. Algorithm Prediction (`predict_algorithm.js`)
Evaluates candidate posts against Heavy Ranker weights:
- **Input**:
  ```json
  {
    "versionA": "Tweet content variant A",
    "versionB": "Tweet content variant B"
  }
  ```
- **Response**:
  ```json
  {
    "versionA": {
      "score": 93,
      "improvements": []
    },
    "versionB": {
      "score": 64,
      "improvements": [
        {
          "text": "Add a clear question or discussion prompt at the end",
          "tooltip": "X's Heavy Ranker assigns a 13.5x multiplier to author-replied conversation threads."
        }
      ]
    }
  }
  ```

### B. Reply Radar (`reply_radar.js`)
- **Input**: `{ tweetText, authorHandle }`
- **Output**: 4 contextual personas:
  - `Tactical Depth (+Insight)`
  - `Respectful Contrarian (+Debate)`
  - `Data Benchmark (+Proof)`
  - `Punchy Resonance (+Wit)`

### C. Post-Post-Mortem Engine (`post_post_mortem.js`)
- **Input**: `{ tweetText, impressions, likes, replies, bookmarks, retweets }`
- **Output**: Lever diagnosis (`Hook`, `Conversation`, `Utility`) and prescribed future post shapes.

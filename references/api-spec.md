# SuperX Reverse-Engineered API Specification

Complete REST and internal API specifications recovered from SuperX (`https://superx.so`, `https://app.superx.so`, and Chrome Extension `bjobgelaoehgbnklgcaaehdpckmhkplk`) via REA (Reverse Engineer Anything).

---

## 1. Hosts & Authentication Architecture

SuperX splits operations across two backend environments:

1. **Tooling & AI Core Host (`API_ENDPOINT`)**:
   - `https://api.superx.tools`
   - Handles AI chat, generation, iterative feedback, algorithm predictions, and real-time streams.

2. **Scheduling, Contacts & Account Host (`SCHEDULE_ENDPOINT`)**:
   - `https://app.superx.so`
   - Handles post queues, publication, contacts CRM, lists, exports, media proxy, and billing.

### Authentication

- **Storage Key**: `localStorage.getItem("__superX__ak")` (or session payload `__token`)
- **Header**: `Authorization: Bearer <token>`
- **X Connection**: Validates active Twitter/X OAuth tokens (`/auth/twitter/v2/login`), session freshness, and Bluesky OAuth (`/api/auth/bsky/connect`).

---

## 2. Core API Endpoints

### A. Algorithm Simulation & Content AI (`api.superx.tools`)

#### `POST /api/tools/algorithm-predict`
Simulates candidate post performance against X's Heavy Ranker recommendation algorithm.
- **Request Body**:
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
      "score": 78,
      "improvements": [
        {
          "text": "Add a clear question or discussion prompt at the end",
          "tooltip": "X's Heavy Ranker assigns a 13.5x multiplier to author-replied conversation threads."
        },
        {
          "text": "Remove the external link from the top post",
          "tooltip": "External links receive a 50–70% distribution penalty in the 'For You' algorithmic feed."
        }
      ]
    },
    "versionB": {
      "score": 64,
      "improvements": [ ... ]
    }
  }
  ```

#### `POST /api/ai-chat/angles`
Generates 3 distinct content angles from raw input, notes, URLs, or media.
- **Request Body**:
  ```json
  {
    "userPrompt": "How we improved SaaS onboarding",
    "composerContent": "",
    "composerMedia": [],
    "composerThreadParts": [],
    "userId": "usr_12345",
    "structureType": "auto",
    "mediaContext": null,
    "tweetContext": null,
    "urlContext": null,
    "youtubeContext": null
  }
  ```
- **Response**:
  ```json
  {
    "angles": [
      {
        "id": "angle_1",
        "title": "The Contrarian Teardown",
        "hook": "Onboarding is not a tour. It is a first win.",
        "description": "Challenge the standard walkthrough checklist and share the instant-gratification approach."
      },
      {
        "id": "angle_2",
        "title": "The Numbered Failure",
        "hook": "The 3 onboarding mistakes that cost us 40% of trial users:",
        "description": "Break down raw metrics and the exact changes that fixed churn."
      },
      {
        "id": "angle_3",
        "title": "The Data Proof / Case Study",
        "hook": "We removed 4 onboarding steps. Activation jumped from 18% to 44%.",
        "description": "Lead with cold numbers and a concrete timeline."
      }
    ]
  }
  ```

#### `POST /api/ai-chat/generate`
Generates full posts or threads adhering to selected angle and author voice.
- **Request Body**:
  ```json
  {
    "angle": "angle_1",
    "userPrompt": "Write the tweet",
    "structureType": "single_tweet",
    "authorVoiceRules": ["Never use emojis", "British spelling", "No questions as hooks"]
  }
  ```

#### `POST /api/ai-chat/iterate`
Applies feedback and algorithm improvements directly to an existing draft.
- **Request Body**:
  ```json
  {
    "instruction": "Remove external link and strengthen the opening pattern interrupt.",
    "composerContent": "Previous draft text...",
    "composerMedia": [],
    "composerThreadParts": [],
    "previousGeneration": "Previous draft text...",
    "structureType": "single_tweet",
    "userId": "usr_12345"
  }
  ```
- **Response**:
  ```json
  {
    "type": "tweet",
    "content": "Updated high-performing tweet content..."
  }
  ```

---

### B. High-Conversion Replies & Engagement (`app.superx.so`)

#### `POST /api/engage/generate-reply`
Generates a contextual reply designed to initiate dialogue with high-value accounts.
- **Request Body**:
  ```json
  {
    "postText": "What's the hardest part about scaling to $100k MRR?",
    "postAuthorName": "Alex Founder",
    "postAuthorHandle": "alex_founder",
    "conversationContext": [],
    "thoughts": "Delegation and building middle management",
    "tone": "insightful" 
  }
  ```
  *(Supported tones: `insightful`, `contrarian`, `supportive`, `analytical`, `witty`)*
- **Response**:
  ```json
  {
    "reply": "Stopping yourself from jumping into every fire. At $10k it's your job to fix everything; at $100k your job is creating systems where someone else fixes it without asking."
  }
  ```

#### `POST /api/engage/reply`
Publishes the reply to X via connected user credentials.
- **Request Body**:
  ```json
  {
    "tweetId": "18491029481920192",
    "replyText": "Generated or edited reply text...",
    "media": []
  }
  ```

---

### C. Analytics & Performance Intelligence (`api.superx.tools`)

#### `GET /api/analytics/summary`
- **Query Parameters**:
  - `start`: ISO Timestamp (e.g. `2026-01-01T00:00:00Z`)
  - `end`: ISO Timestamp (e.g. `2026-10-28T00:00:00Z`)
- **Response**:
  ```json
  {
    "items": [
      {
        "created_at": "2026-10-27T14:00:00Z",
        "view_count": 14200,
        "like_count": 284,
        "reply_count": 52,
        "retweet_count": 31,
        "bookmark_count": 89
      }
    ]
  }
  ```

---

### D. Audience Signals & CRM (`app.superx.so`)

#### `POST /api/contacts/lists/${listId}/export`
Exports targeted audience lists with lead signals (e.g., asked about pricing, hiring, tool comparisons).
- **Request Body**:
  ```json
  {
    "format": "csv",
    "all_matching": true,
    "q": "pricing",
    "min_score": 70
  }
  ```

#### `POST /api/bulk-dm/send`
Queues personalized direct messages for user approval card review.
- **Request Body**:
  ```json
  {
    "recipients": [
      {
        "user_id": "12345",
        "screen_name": "q_founder",
        "name": "Quinn",
        "message": "Hey Quinn, noticed your post about billing retries—sent over a quick note on how we reduced churn by 4%."
      }
    ]
  }
  ```

---

### E. Scheduling & Publishing (`app.superx.so`)

#### `POST /api/me/tweets`
Schedules or saves drafts to the SuperX calendar.
- **Request Body**:
  ```json
  {
    "text": "Tweet body",
    "media": [],
    "scheduled_at": "2026-10-30T15:00:00Z",
    "status": 1, 
    "auto_retweet_hours": 12,
    "crosspost_bluesky": false
  }
  ```
  *(Status: `0` = Draft, `1` = Scheduled, `2` = Published)*

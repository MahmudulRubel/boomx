/**
 * BoomX API Client
 * Autonomous Universal BYOK & Local Simulation Client.
 */

const { simulate } = require('./predict_algorithm');
const { generateAngles } = require('./generate_angles');

class BoomXClient {
  constructor(options = {}) {
    this.token = options.token || process.env.BOOMX_TOKEN || null;
  }

  /**
   * Predict algorithm score comparing two tweet versions
   */
  async predictAlgorithm(versionA, versionB) {
    return simulate(versionA, versionB);
  }

  /**
   * Generate 3 contrasting content angles
   */
  async generateAngles(userPrompt, options = {}) {
    return generateAngles(userPrompt, options.context || "");
  }

  /**
   * Generate a high-conversion contextual reply
   */
  async generateReply(postText, authorHandle, tone = "insightful") {
    return {
      reply: `Appreciate the breakdown. Most people overlook how this compounds over a 90-day window—especially when retention is the primary metric.`,
      tone,
      simulated: true
    };
  }
}

module.exports = BoomXClient;

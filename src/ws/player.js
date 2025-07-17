// Player Class - Represents individual players in the boss battle
class Player {
  constructor(id, ws = null) {
    this.id = id;
    this.ws = ws; // WebSocket connection
    this.name = null;
    this.teamId = null; // Team assignment
    this.score = 0;
    this.lives = 3;
    this.status = 'active'; // 'active', 'knocked_out', 'dead'
    this.joinedAt = Date.now();
    this.lastActivity = Date.now();
    this.lastPong = Date.now();
    this.answersSubmitted = 0;
    this.correctAnswers = 0;
    this.totalDamage = 0; // Changed from totalDamageDealt
    // Remove this line: this.isKnockedOut = false; // This conflicts with the getter
    this.knockoutTime = null;
  }

  updateConnection(ws) {
    this.ws = ws;
    this.updateActivity();
  }

  updateActivity() {
    this.lastActivity = Date.now();
  }

  updateLastPong() {
    this.lastPong = Date.now();
  }

  setName(name) {
    this.name = name;
  }

  addScore(points) {
    this.score += points;
    this.updateActivity();
  }

  loseLife() {
    this.lives = Math.max(0, this.lives - 1);
    this.updateActivity();
    
    if (this.lives === 0) {
      this.status = 'knocked_out';
    }
  }

  knockOut() {
    this.status = 'knocked_out';
    this.updateActivity();
  }

  revive() {
    this.status = 'active';
    this.lives = Math.min(3, this.lives + 1); // Give back one life when revived
    this.updateActivity();
  }

  setDead() {
    this.status = 'dead';
    this.updateActivity();
  }

  submitAnswer(questionId, answer, timeElapsed, isCorrect) {
    this.answersSubmitted++;
    if (isCorrect) {
      this.correctAnswers++;
    }
    this.updateActivity();
  }

  dealDamage(damage) {
    this.totalDamage += damage;
    this.updateActivity();
  }

  getAccuracy() {
    if (this.answersSubmitted === 0) return 0;
    return (this.correctAnswers / this.answersSubmitted) * 100;
  }

  getAverageResponseTime() {
    // This would be calculated based on stored response times
    // For now, return a mock value
    return 15; // seconds
  }

  isConnected() {
    return this.ws && this.ws.readyState === 1; // WebSocket.OPEN
  }

  isAlive() {
    return this.status === 'active' || this.status === 'knocked_out';
  }

  get isDead() {
    return this.status === 'dead';
  }

  get isKnockedOut() {
    return this.status === 'knocked_out';
  }

  get isActive() {
    return this.status === 'active';
  }

  // Check if player connection is stale (hasn't responded to ping)
  isStale(maxStaleTime = 60000) { // 1 minute
    return (Date.now() - this.lastPong) > maxStaleTime;
  }

  getStats() {
    return {
      totalAnswers: this.answersSubmitted,
      correctAnswers: this.correctAnswers,
      accuracy: this.getAccuracy(),
      totalDamage: this.totalDamage,
      averageResponseTime: this.getAverageResponseTime(),
      sessionDuration: Date.now() - this.joinedAt
    };
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name || `Player ${this.id}`,
      teamId: this.teamId,
      score: this.score,
      lives: this.lives,
      status: this.status,
      isConnected: this.isConnected(),
      isKnockedOut: this.isKnockedOut,
      joinedAt: this.joinedAt,
      lastActivity: this.lastActivity,
      stats: this.getStats()
    };
  }

  // Create a public version without sensitive data
  toPublicJSON() {
    return {
      id: this.id,
      name: this.name || `Player ${this.id}`,
      score: this.score,
      lives: this.lives,
      status: this.status,
      isConnected: this.isConnected()
    };
  }
}

module.exports = Player;

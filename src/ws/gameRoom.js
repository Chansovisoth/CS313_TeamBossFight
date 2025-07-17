// Game Room Class - Manages individual boss battle game instances
const MockDataService = require('./mockDataService');

class GameRoom {
  constructor(roomId) {
    this.roomId = roomId;
    this.players = new Map(); // Map<playerId, Player>
    this.knockedOutPlayers = new Map(); // Map<playerId, {player, revivalCode, knockoutTime}>
    this.teams = new Map(); // Map<teamId, {id, name, memberIds, maxMembers}>
    this.bossHealth = 30; // Base health
    this.maxBossHealth = 30; // Base health
    this.gameStatus = 'waiting'; // 'waiting', 'active', 'completed'
    this.currentQuestionIndex = 0;
    this.questionsPool = []; // Shared questions pool
    this.playerQuestions = new Map(); // Map<playerId, shuffledQuestions>
    this.playerQuestionIndex = new Map(); // Map<playerId, currentIndex>
    this.playerReviveCount = new Map(); // Map<playerId, reviveCount>
    this.leaderboard = [];
    this.createdAt = Date.now();
    this.lastActivity = Date.now();
    this.questionTimer = null;
    this.questionTimeRemaining = 30;
    this.questionStartTime = null;
    this.minPlayersToStart = 2;
    this.maxMembersPerTeam = 4; // Max members per team
    this.maxRevivesPerPlayer = 1; // Max revives per player
    
    // Boss configuration (will be loaded async)
    this.bossData = null;
    this.isLoadingData = false;
    
    // Initialize data
    this.initializeGameData();
  }

  // Initialize game data asynchronously
  async initializeGameData() {
    if (this.isLoadingData) return;
    
    this.isLoadingData = true;
    try {
      // Load boss data and questions concurrently
      const [bossData, questionsPool] = await Promise.all([
        MockDataService.getBossData(),
        MockDataService.getQuestionsPool()
      ]);
      
      this.bossData = bossData;
      this.questionsPool = questionsPool;
      
      // Calculate boss health based on team count (will be updated when teams are formed)
      this.updateBossHealth();
      
      console.log(`Game room ${this.roomId} initialized with boss: ${this.bossData.name}`);
    } catch (error) {
      console.error('Error initializing game data:', error);
      // Fallback to default data if needed
      this.bossData = {
        id: "boss_001",
        name: "CS Boss",
        image: "/src/assets/Placeholder/Falcon.png",
        description: "A challenging computer science boss battle",
        cooldown_duration: 300,
        number_of_teams: 4,
        creator_id: "admin_001",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } finally {
      this.isLoadingData = false;
    }
  }

  // Update boss health based on player count
  updateBossHealth() {
    const playerCount = this.players.size;
    this.maxBossHealth = 30 + (playerCount * 5);
    
    // If game hasn't started, reset current health
    if (this.gameStatus === 'waiting') {
      this.bossHealth = this.maxBossHealth;
    }
  }

  // Add a player to the game room
  addPlayer(player) {
    this.players.set(player.id, player);
    this.playerReviveCount.set(player.id, 0);
    this.updateActivity();
    
    // Assign player to a team
    this.assignPlayerToTeam(player);
    
    this.updateBossHealth();
    
    // Initialize player's question pool
    if (this.questionsPool.length > 0) {
      this.playerQuestions.set(player.id, MockDataService.shuffleArray([...this.questionsPool]));
      this.playerQuestionIndex.set(player.id, 0);
    }
    
    // Start game if we have enough players
    if (this.players.size >= this.minPlayersToStart && this.gameStatus === 'waiting') {
      this.startGame();
    }
  }

  // Assign player to a team (automatically balance teams)
  assignPlayerToTeam(player) {
    // Find a team with available slots
    let assignedTeam = null;
    
    for (const [teamId, team] of this.teams) {
      if (team.memberIds.length < this.maxMembersPerTeam) {
        assignedTeam = team;
        break;
      }
    }
    
    // If no team has space, create a new one
    if (!assignedTeam) {
      const teamId = `team_${this.teams.size + 1}`;
      assignedTeam = {
        id: teamId,
        name: `Team ${this.teams.size + 1}`,
        memberIds: [],
        maxMembers: this.maxMembersPerTeam
      };
      this.teams.set(teamId, assignedTeam);
    }
    
    // Add player to team
    assignedTeam.memberIds.push(player.id);
    player.teamId = assignedTeam.id;
    
    console.log(`Player ${player.id} assigned to ${assignedTeam.name}`);
  }

  // Remove a player from the game room
  removePlayer(playerId) {
    const player = this.players.get(playerId);
    if (player) {
      this.players.delete(playerId);
      this.playerQuestions.delete(playerId);
      this.playerQuestionIndex.delete(playerId);
      this.knockedOutPlayers.delete(playerId);
      this.updateActivity();
      this.updateBossHealth();
      
      // Update leaderboard
      this.updateLeaderboard();
    }
  }

  // Start the boss battle game
  startGame() {
    if (this.gameStatus !== 'waiting') return;
    
    this.gameStatus = 'active';
    this.updateActivity();
    this.startQuestionTimer();
    console.log(`Game started in room ${this.roomId} with ${this.players.size} players`);
  }

  // Process a player's answer to a question
  processAnswer(playerId, questionId, answer, timeElapsed) {
    const player = this.players.get(playerId);
    if (!player || this.gameStatus !== 'active') {
      return { success: false, message: 'Invalid player or game not active' };
    }

    // Get player's current question
    const playerQuestions = this.playerQuestions.get(playerId);
    const playerIndex = this.playerQuestionIndex.get(playerId);
    
    if (!playerQuestions || playerIndex >= playerQuestions.length) {
      return { success: false, message: 'No more questions available' };
    }

    const currentQuestion = playerQuestions[playerIndex];
    if (currentQuestion.id !== questionId) {
      return { success: false, message: 'Question mismatch' };
    }

    // Store the answer but don't evaluate until timer runs out
    const answerData = {
      questionId,
      answer,
      timeElapsed,
      submittedAt: Date.now()
    };
    
    // Store the answer for later evaluation
    this.playerAnswers = this.playerAnswers || new Map();
    this.playerAnswers.set(playerId, answerData);

    // Check if we should evaluate now (if timer has run out or close to it)
    if (timeElapsed >= 29 || this.questionTimeRemaining <= 1) {
      return this.evaluatePlayerAnswer(playerId, answerData);
    }
    
    // Return success but don't evaluate yet
    return { 
      success: true, 
      message: 'Answer submitted, waiting for timer to complete',
      answerSubmitted: true
    };
  }

  // New method to evaluate answers when timer runs out
  evaluatePlayerAnswer(playerId, answerData) {
    const player = this.players.get(playerId);
    if (!player) {
      return { success: false, message: 'Player not found' };
    }

    const { questionId, answer, timeElapsed } = answerData;
    
    // Get player's current question
    const playerQuestions = this.playerQuestions.get(playerId);
    const playerIndex = this.playerQuestionIndex.get(playerId);
    const currentQuestion = playerQuestions[playerIndex];

    // Validate answer
    const isCorrect = MockDataService.validateAnswer(currentQuestion, answer);
    
    if (isCorrect) {
      // Calculate damage based on time (faster = more damage)
      const maxDamage = 2.0;
      const timeFactor = Math.max(0, (30 - timeElapsed) / 30); // 0-1 scale
      const damage = Math.max(0.5, maxDamage * timeFactor); // Minimum 0.5 damage
      
      // Apply damage to boss
      this.applyBossDamage(damage);
      
      // Update player stats
      player.correctAnswers++;
      player.totalDamage += damage;
      player.score += Math.round(damage * 100);
      
      // Move to next question for this player
      this.playerQuestionIndex.set(playerId, playerIndex + 1);
      
      // Check if player needs new questions
      if (playerIndex + 1 >= playerQuestions.length) {
        // Reshuffle questions for this player
        this.playerQuestions.set(playerId, MockDataService.shuffleArray([...this.questionsPool]));
        this.playerQuestionIndex.set(playerId, 0);
      }
      
      console.log(`Player ${playerId} dealt ${damage.toFixed(1)} damage. Boss health: ${this.bossHealth.toFixed(1)}`);
      
      // Check if boss is defeated
      if (this.bossHealth <= 0) {
        this.gameStatus = 'completed';
        this.clearQuestionTimer();
        console.log(`Boss defeated in room ${this.roomId}!`);
      }
      
      return { 
        success: true, 
        damage: damage,
        isCorrect: true,
        bossHealth: this.bossHealth,
        gameCompleted: this.gameStatus === 'completed'
      };
    } else {
      // Wrong answer - knock out player
      const revivalCode = this.generateRevivalCode();
      this.knockOutPlayer(playerId, revivalCode);
      
      // Move to next question for this player
      this.playerQuestionIndex.set(playerId, playerIndex + 1);
      
      return { 
        success: true, 
        damage: 0,
        isCorrect: false,
        knockedOut: true,
        revivalCode: revivalCode
      };
    }
  }

  // Apply damage to the boss
  applyBossDamage(damage) {
    this.bossHealth = Math.max(0, this.bossHealth - damage);
    this.updateLeaderboard();
  }

  // Generate a revival code for knocked out players
  generateRevivalCode() {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
  }

  // Knock out a player
  knockOutPlayer(playerId, revivalCode) {
    const player = this.players.get(playerId);
    if (player) {
      player.knockOut(); // Use the proper method instead of setting isKnockedOut directly
      player.knockoutTime = Date.now();
      
      this.knockedOutPlayers.set(playerId, {
        player: player,
        revivalCode: revivalCode,
        knockoutTime: Date.now()
      });
      
      console.log(`Player ${playerId} knocked out with revival code: ${revivalCode}`);
    }
  }

  // Revive a knocked out player (team-based)
  revivePlayer(targetPlayerId, revivalCode) {
    const knockedOutData = this.knockedOutPlayers.get(targetPlayerId);
    if (!knockedOutData) {
      return { success: false, message: 'Player not found or not knocked out' };
    }

    if (knockedOutData.revivalCode !== revivalCode) {
      return { success: false, message: 'Invalid revival code' };
    }

    // Check if player has exceeded max revives
    const currentRevives = this.playerReviveCount.get(targetPlayerId) || 0;
    if (currentRevives >= this.maxRevivesPerPlayer) {
      return { success: false, message: `Player has already been revived ${this.maxRevivesPerPlayer} time(s)` };
    }

    const revivedPlayer = this.players.get(targetPlayerId);
    if (!revivedPlayer) {
      return { success: false, message: 'Player not found' };
    }

    // For team-based revival, we could add additional checks here
    // For now, allow self-revival with valid code
    
    revivedPlayer.revive(); // Use the proper method instead of setting isKnockedOut directly
    revivedPlayer.knockoutTime = null;
    this.knockedOutPlayers.delete(targetPlayerId);
    
    // Increment revive count
    this.playerReviveCount.set(targetPlayerId, currentRevives + 1);
    
    console.log(`Player ${targetPlayerId} revived successfully (${currentRevives + 1}/${this.maxRevivesPerPlayer} revives used)`);
    return { 
      success: true, 
      message: 'Player revived successfully',
      revivesUsed: currentRevives + 1,
      maxRevives: this.maxRevivesPerPlayer
    };
  }

  // Update the leaderboard
  updateLeaderboard() {
    this.leaderboard = Array.from(this.players.values())
      .sort((a, b) => {
        // Sort by score (descending), then by total damage (descending)
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return b.totalDamage - a.totalDamage;
      })
      .map((player, index) => ({
        rank: index + 1,
        playerId: player.id,
        username: player.name || `Player ${player.id}`, // Use player.name instead of player.username
        score: player.score,
        totalDamage: player.totalDamage,
        correctAnswers: player.correctAnswers,
        isKnockedOut: player.isKnockedOut, // This will use the getter properly
        teamId: player.teamId
      }));
  }

  // Get current game state
  getGameState() {
    // Update leaderboard before sending state
    this.updateLeaderboard();
    
    // Build teams with member details
    const teamsWithMembers = Array.from(this.teams.values()).map(team => ({
      id: team.id,
      name: team.name,
      maxMembers: team.maxMembers,
      members: team.memberIds.map(memberId => {
        const player = this.players.get(memberId);
        return player ? {
          playerId: player.id,
          username: player.name || `Player ${player.id}`,
          isKnockedOut: player.isKnockedOut,
          score: player.score,
          totalDamage: player.totalDamage
        } : null;
      }).filter(member => member !== null)
    }));
    
    return {
      roomId: this.roomId,
      gameStatus: this.gameStatus,
      bossData: this.bossData,
      bossHealth: this.bossHealth,
      maxBossHealth: this.maxBossHealth,
      playerCount: this.players.size,
      leaderboard: this.leaderboard,
      teams: teamsWithMembers,
      knockedOutPlayers: Array.from(this.knockedOutPlayers.values()).map(data => ({
        playerId: data.player.id,
        revivalCode: data.revivalCode,
        knockoutTime: data.knockoutTime,
        timeRemaining: Math.max(0, 60 - Math.floor((Date.now() - data.knockoutTime) / 1000))
      })),
      questionTimeRemaining: this.questionTimeRemaining,
      isLoadingData: this.isLoadingData,
      maxRevivesPerPlayer: this.maxRevivesPerPlayer,
      maxMembersPerTeam: this.maxMembersPerTeam
    };
  }

  // Get player's current question
  getCurrentQuestion(playerId) {
    const playerQuestions = this.playerQuestions.get(playerId);
    const playerIndex = this.playerQuestionIndex.get(playerId);
    
    if (!playerQuestions || playerIndex >= playerQuestions.length) {
      return null;
    }
    
    return playerQuestions[playerIndex];
  }

  // Get all players in the room
  getPlayers() {
    return Array.from(this.players.values());
  }

  // Get player count
  getPlayerCount() {
    return this.players.size;
  }

  // Get leaderboard
  getLeaderboard() {
    return this.leaderboard;
  }

  // Update last activity timestamp
  updateActivity() {
    this.lastActivity = Date.now();
  }

  // Clean up old knocked out players (auto-revive after timeout)
  cleanupKnockedOutPlayers() {
    const now = Date.now();
    const revivalTimeout = 60000; // 1 minute auto-revival
    
    for (const [playerId, knockedOutData] of this.knockedOutPlayers) {
      if (now - knockedOutData.knockoutTime > revivalTimeout) {
        // Auto-revive player
        const player = this.players.get(playerId);
        if (player) {
          player.revive(); // Use the proper method instead of setting isKnockedOut directly
          player.knockoutTime = null;
          this.knockedOutPlayers.delete(playerId);
          console.log(`Player ${playerId} auto-revived after timeout`);
        }
      }
    }
  }

  // Check if room should be cleaned up
  shouldCleanup(maxInactiveTime = 300000) { // 5 minutes
    return Date.now() - this.lastActivity > maxInactiveTime;
  }

  // Start question timer
  startQuestionTimer() {
    if (this.questionTimer) {
      clearInterval(this.questionTimer);
    }
    
    this.questionTimeRemaining = 30;
    this.questionStartTime = Date.now();
    
    this.questionTimer = setInterval(() => {
      this.questionTimeRemaining--;
      
      if (this.questionTimeRemaining <= 0) {
        this.handleQuestionTimeout();
      }
    }, 1000);
  }

  // Clear question timer
  clearQuestionTimer() {
    if (this.questionTimer) {
      clearInterval(this.questionTimer);
      this.questionTimer = null;
    }
  }

  // Handle question timeout
  handleQuestionTimeout() {
    // First, evaluate all pending answers
    this.evaluateAllPendingAnswers();
    
    // Reset timer
    this.questionTimeRemaining = 30;
    this.questionStartTime = Date.now();
    
    // Clean up knocked out players
    this.cleanupKnockedOutPlayers();
    
    // Update leaderboard
    this.updateLeaderboard();
  }

  // Evaluate all pending answers when timer runs out
  evaluateAllPendingAnswers() {
    if (!this.playerAnswers) return;

    const evaluationResults = new Map();

    for (const [playerId, answerData] of this.playerAnswers.entries()) {
      const result = this.evaluatePlayerAnswer(playerId, answerData);
      evaluationResults.set(playerId, result);
    }

    // Clear pending answers
    this.playerAnswers.clear();

    // Broadcast evaluation results
    for (const [playerId, result] of evaluationResults.entries()) {
      const playerConnection = this.getPlayerConnection(playerId);
      if (playerConnection) {
        playerConnection.send(JSON.stringify({
          type: 'answer_result',
          ...result
        }));
      }
    }

    // Update all players with new game state
    this.broadcastGameState();
  }

  // Helper method to get player connection
  getPlayerConnection(playerId) {
    // This would need to be implemented based on how connections are stored
    // For now, we'll broadcast to all connections
    return null;
  }
}

module.exports = GameRoom;

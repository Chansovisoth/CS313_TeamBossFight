// WebSocket Server for Boss Battle Game
const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');
const GameRoom = require('./gameRoom');
const Player = require('./player');
const { validateMessage, MessageTypes } = require('./messageValidator');

class BossBattleServer {
  constructor(port = 8080) {
    this.port = port;
    this.wss = null;
    this.gameRooms = new Map(); // Map<roomId, GameRoom>
    this.players = new Map(); // Map<playerId, Player>
    this.connections = new Map(); // Map<ws, {playerId, roomId}>
  }

  start() {
    this.wss = new WebSocket.Server({ 
      port: this.port,
      host: '0.0.0.0',
      verifyClient: this.verifyClient.bind(this)
    });

    this.wss.on('connection', this.handleConnection.bind(this));
    
    // Start broadcasting game state every 5 seconds for live updates
    this.startGameStateBroadcast();

    console.log('🚀 Boss Battle WebSocket Server running on port', this.port);
    console.log('📡 WebSocket URL:', `ws://localhost:${this.port}`);
  }

  // Broadcast game state updates every few seconds for live leaderboard
  startGameStateBroadcast() {
    setInterval(() => {
      for (const [roomId, gameRoom] of this.gameRooms) {
        if (gameRoom.gameStatus === 'active') {
          console.log(`📊 Broadcasting live leaderboard for room ${roomId}`);
          this.broadcastGameState(roomId);
        }
      }
    }, 1);
  }

  verifyClient(info) {
    // Add any authentication/verification logic here
    return true;
  }

  handleConnection(ws, req) {
    console.log('📱 New WebSocket connection established');
    
    // Extract game room from URL path
    const url = new URL(req.url, `http://localhost:${this.port}`);
    const pathParts = url.pathname.split('/');
    
    let roomId = null;
    if (pathParts[1] === 'game' && pathParts[2]) {
      roomId = pathParts[2];
      console.log(`🎮 Connection attempting to join room: ${roomId}`);
    }
    
    // Store connection info (roomId can be null and set later in joinGame)
    this.connections.set(ws, { roomId, playerId: null });

    ws.on('message', (data) => this.handleMessage(ws, data));
    ws.on('close', () => this.handleDisconnection(ws));
    ws.on('error', (error) => this.handleError(ws, error));
    ws.on('pong', () => this.handlePong(ws));

    // Send connection acknowledgment
    this.sendToClient(ws, {
      type: MessageTypes.CONNECTION_ACK,
      message: 'Connected to Boss Battle Server',
      timestamp: Date.now()
    });
  }

  handleMessage(ws, data) {
    try {
      const message = JSON.parse(data.toString());
      
      // Validate message format
      if (!validateMessage(message)) {
        this.sendError(ws, 'Invalid message format');
        return;
      }

      console.log(`📨 Received message: ${message.type} from ${message.playerId || 'unknown'}`);

      switch (message.type) {
        case MessageTypes.JOIN_GAME:
          this.handleJoinGame(ws, message);
          break;
        case MessageTypes.SUBMIT_ANSWER:
          this.handleSubmitAnswer(ws, message);
          break;
        case MessageTypes.BOSS_DAMAGE:
          this.handleBossDamage(ws, message);
          break;
        case MessageTypes.PLAYER_KNOCKED_OUT:
          this.handlePlayerKnockedOut(ws, message);
          break;
        case MessageTypes.REVIVE_PLAYER:
          this.handleRevivePlayer(ws, message);
          break;
        case MessageTypes.LEAVE_GAME:
          this.handleLeaveGame(ws, message);
          break;
        case MessageTypes.REQUEST_GAME_STATE:
          this.handleRequestGameState(ws, message);
          break;
        case MessageTypes.REQUEST_QUESTION:
          this.handleRequestQuestion(ws, message);
          break;
        case MessageTypes.HEARTBEAT:
          this.handleHeartbeat(ws, message);
          break;
        default:
          this.sendError(ws, `Unknown message type: ${message.type}`);
      }
    } catch (error) {
      console.error('❌ Error parsing message:', error);
      this.sendError(ws, 'Invalid JSON message');
    }
  }

  handleJoinGame(ws, message) {
    const { playerId, gameRoomId } = message;
    const connectionInfo = this.connections.get(ws);

    if (!connectionInfo) {
      this.sendError(ws, 'Invalid connection');
      return;
    }

    // Update connection with player ID and room ID
    connectionInfo.playerId = playerId;
    connectionInfo.roomId = gameRoomId;

    // Get or create game room
    let gameRoom = this.gameRooms.get(gameRoomId);
    if (!gameRoom) {
      gameRoom = new GameRoom(gameRoomId);
      this.gameRooms.set(gameRoomId, gameRoom);
      console.log(`🏢 Created new game room: ${gameRoomId}`);
    }

    // Create or update player
    let player = this.players.get(playerId);
    if (!player) {
      player = new Player(playerId, ws);
      this.players.set(playerId, player);
    } else {
      player.updateConnection(ws);
    }

    // Add player to room
    gameRoom.addPlayer(player);

    // Broadcast player joined
    this.broadcastToRoom(gameRoomId, {
      type: MessageTypes.PLAYER_JOINED,
      player: player.toJSON(),
      timestamp: Date.now()
    });

    // Send current game state to the new player
    this.sendToClient(ws, {
      type: MessageTypes.GAME_STATE_UPDATE,
      data: gameRoom.getGameState(),
      timestamp: Date.now()
    });

    console.log(`👤 Player ${playerId} joined room ${gameRoomId}`);
  }

  handleSubmitAnswer(ws, message) {
    const { playerId, questionId, answer, timeElapsed } = message;
    const connectionInfo = this.connections.get(ws);
    
    if (!connectionInfo) return;

    const gameRoom = this.gameRooms.get(connectionInfo.roomId);
    const player = this.players.get(playerId);

    if (!gameRoom || !player) {
      this.sendError(ws, 'Game room or player not found');
      return;
    }

    // Process answer in game room
    const result = gameRoom.processAnswer(playerId, questionId, answer, timeElapsed);

    if (result.success) {
      // Broadcast answer result to all players in room
      this.broadcastToRoom(connectionInfo.roomId, {
        type: MessageTypes.ANSWER_RESULT,
        playerId,
        questionId,
        correct: result.correct,
        damage: result.damage,
        timestamp: Date.now()
      });

      // If boss took damage, broadcast boss damage
      if (result.damage > 0) {
        this.broadcastToRoom(connectionInfo.roomId, {
          type: MessageTypes.BOSS_DAMAGE,
          playerId,
          damage: result.damage,
          questionId,
          newHealth: gameRoom.bossHealth,
          timestamp: Date.now()
        });
      }

      // Check if boss is defeated
      if (gameRoom.bossHealth <= 0) {
        gameRoom.gameStatus = 'completed';
        this.broadcastToRoom(connectionInfo.roomId, {
          type: MessageTypes.GAME_COMPLETED,
          leaderboard: gameRoom.getLeaderboard(),
          timestamp: Date.now()
        });
      }

      // Update game state
      this.broadcastGameState(connectionInfo.roomId);
    }

    console.log(`💡 Answer submitted by ${playerId}: ${result.correct ? 'Correct' : 'Wrong'}`);
  }

  handleBossDamage(ws, message) {
    const { playerId, damage, questionId } = message;
    const connectionInfo = this.connections.get(ws);
    
    if (!connectionInfo) return;

    const gameRoom = this.gameRooms.get(connectionInfo.roomId);
    
    if (!gameRoom) {
      this.sendError(ws, 'Game room not found');
      return;
    }

    // Apply damage to boss
    const newHealth = gameRoom.applyBossDamage(damage);

    // Broadcast boss damage to all players
    this.broadcastToRoom(connectionInfo.roomId, {
      type: MessageTypes.BOSS_DAMAGE,
      playerId,
      damage,
      questionId,
      newHealth,
      timestamp: Date.now()
    });

    // Check if boss is defeated
    if (newHealth <= 0) {
      gameRoom.setGameStatus('completed');
      this.broadcastToRoom(connectionInfo.roomId, {
        type: MessageTypes.GAME_COMPLETED,
        leaderboard: gameRoom.getLeaderboard(),
        timestamp: Date.now()
      });
    }

    // Update game state
    this.broadcastGameState(connectionInfo.roomId);

    console.log(`💥 Boss took ${damage} damage from ${playerId}. Health: ${newHealth}`);
  }

  handlePlayerKnockedOut(ws, message) {
    const { playerId, revivalCode } = message;
    const connectionInfo = this.connections.get(ws);
    
    if (!connectionInfo) return;

    const gameRoom = this.gameRooms.get(connectionInfo.roomId);
    const player = this.players.get(playerId);

    if (!gameRoom || !player) {
      this.sendError(ws, 'Game room or player not found');
      return;
    }

    // Knock out player
    gameRoom.knockOutPlayer(playerId, revivalCode);

    // Broadcast player knockout
    this.broadcastToRoom(connectionInfo.roomId, {
      type: MessageTypes.PLAYER_KNOCKED_OUT,
      player: player.toJSON(),
      revivalCode,
      timestamp: Date.now()
    });

    // Update game state
    this.broadcastGameState(connectionInfo.roomId);

    console.log(`💔 Player ${playerId} knocked out with revival code: ${revivalCode}`);
  }

  handleRevivePlayer(ws, message) {
    const { playerId, targetPlayerId, revivalCode } = message;
    const connectionInfo = this.connections.get(ws);
    
    if (!connectionInfo) return;

    const gameRoom = this.gameRooms.get(connectionInfo.roomId);
    
    if (!gameRoom) {
      this.sendError(ws, 'Game room not found');
      return;
    }

    // Use targetPlayerId if provided, otherwise use playerId (self-revival)
    const playerToRevive = targetPlayerId || playerId;
    
    const result = gameRoom.revivePlayer(playerToRevive, revivalCode);

    if (result.success) {
      // Broadcast player revival
      this.broadcastToRoom(connectionInfo.roomId, {
        type: MessageTypes.PLAYER_REVIVED,
        playerId: playerToRevive,
        reviverPlayerId: playerId,
        revivesUsed: result.revivesUsed,
        maxRevives: result.maxRevives,
        timestamp: Date.now()
      });

      // Update game state with new leaderboard
      this.broadcastGameState(connectionInfo.roomId);

      console.log(`💚 Player ${playerToRevive} revived by ${playerId} (${result.revivesUsed}/${result.maxRevives} revives used)`);
    } else {
      this.sendError(ws, result.message);
    }
  }

  handleLeaveGame(ws, message) {
    const { playerId } = message;
    const connectionInfo = this.connections.get(ws);
    
    if (!connectionInfo) return;

    const gameRoom = this.gameRooms.get(connectionInfo.roomId);
    
    if (gameRoom) {
      gameRoom.removePlayer(playerId);

      // Broadcast player left
      this.broadcastToRoom(connectionInfo.roomId, {
        type: MessageTypes.PLAYER_LEFT,
        playerId,
        timestamp: Date.now()
      });

      // Update game state
      this.broadcastGameState(connectionInfo.roomId);

      // Clean up empty rooms
      if (gameRoom.getPlayerCount() === 0) {
        this.gameRooms.delete(connectionInfo.roomId);
        console.log(`🗑️ Removed empty game room: ${connectionInfo.roomId}`);
      }
    }

    // Clean up player
    this.players.delete(playerId);
    this.connections.delete(ws);

    console.log(`👋 Player ${playerId} left the game`);
  }

  handleRequestGameState(ws, message) {
    const connectionInfo = this.connections.get(ws);
    
    if (!connectionInfo) return;

    const gameRoom = this.gameRooms.get(connectionInfo.roomId);
    
    if (gameRoom) {
      this.sendToClient(ws, {
        type: MessageTypes.GAME_STATE_UPDATE,
        data: gameRoom.getGameState(),
        timestamp: Date.now()
      });
    }
  }

  handleRequestQuestion(ws, message) {
    const connectionInfo = this.connections.get(ws);
    
    if (!connectionInfo || !connectionInfo.playerId) {
      this.sendError(ws, 'Invalid connection or player ID');
      return;
    }

    const gameRoom = this.gameRooms.get(connectionInfo.roomId);
    
    if (!gameRoom) {
      this.sendError(ws, 'Game room not found');
      return;
    }

    const currentQuestion = gameRoom.getCurrentQuestion(connectionInfo.playerId);
    
    if (currentQuestion) {
      this.sendToClient(ws, {
        type: MessageTypes.QUESTION_DATA,
        question: currentQuestion,
        timestamp: Date.now()
      });
    } else {
      this.sendToClient(ws, {
        type: MessageTypes.NO_QUESTIONS_AVAILABLE,
        message: 'No more questions available',
        timestamp: Date.now()
      });
    }
  }

  handleHeartbeat(ws, message) {
    // Respond to heartbeat
    this.sendToClient(ws, {
      type: MessageTypes.HEARTBEAT,
      timestamp: Date.now()
    });
  }

  handleDisconnection(ws) {
    const connectionInfo = this.connections.get(ws);
    
    if (connectionInfo && connectionInfo.playerId) {
      console.log(`🔌 Player ${connectionInfo.playerId} disconnected`);
      
      // Handle as leave game
      this.handleLeaveGame(ws, { playerId: connectionInfo.playerId });
    } else {
      console.log('🔌 Unknown connection disconnected');
    }
  }

  handleError(ws, error) {
    console.error('❌ WebSocket error:', error);
  }

  handlePong(ws) {
    const connectionInfo = this.connections.get(ws);
    if (connectionInfo && connectionInfo.playerId) {
      const player = this.players.get(connectionInfo.playerId);
      if (player) {
        player.updateLastPong();
      }
    }
  }

  broadcastToRoom(roomId, message) {
    const gameRoom = this.gameRooms.get(roomId);
    if (!gameRoom) return;

    const players = gameRoom.getPlayers();
    players.forEach(player => {
      if (player.ws && player.ws.readyState === WebSocket.OPEN) {
        this.sendToClient(player.ws, message);
      }
    });
  }

  broadcastGameState(roomId) {
    const gameRoom = this.gameRooms.get(roomId);
    if (!gameRoom) return;

    this.broadcastToRoom(roomId, {
      type: MessageTypes.GAME_STATE_UPDATE,
      data: gameRoom.getGameState(),
      timestamp: Date.now()
    });
  }

  sendToClient(ws, message) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  }

  sendError(ws, error) {
    this.sendToClient(ws, {
      type: MessageTypes.ERROR,
      error,
      timestamp: Date.now()
    });
  }

  startHeartbeat() {
    setInterval(() => {
      this.connections.forEach((connectionInfo, ws) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.ping();
        }
      });
    }, 30000); // 30 seconds
  }

  getServerStats() {
    return {
      totalRooms: this.gameRooms.size,
      totalPlayers: this.players.size,
      totalConnections: this.connections.size,
      rooms: Array.from(this.gameRooms.entries()).map(([id, room]) => ({
        id,
        playerCount: room.getPlayerCount(),
        gameStatus: room.getGameState().gameStatus
      }))
    };
  }
}

// Start server if this file is run directly
if (require.main === module) {
  const server = new BossBattleServer(8080);
  server.start();

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Server shutting down...');
    if (server.wss) {
      server.wss.close(() => {
        console.log('👋 WebSocket server closed');
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  });
}

module.exports = BossBattleServer;

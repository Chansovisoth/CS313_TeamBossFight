# Boss Battle WebSocket Server

A real-time WebSocket server for the Boss Battle game, handling multiplayer game sessions, player management, and game state synchronization.

## Features

- **Real-time Multiplayer**: Supports multiple players in boss battle rooms
- **Player Management**: Handle player connections, disconnections, and status changes
- **Game State Synchronization**: Real-time updates of boss health, player stats, and game progress
- **Revival System**: Players can revive knocked-out teammates using revival codes
- **Leaderboard**: Live leaderboard updates based on player performance
- **Heartbeat Monitoring**: Connection health monitoring with automatic cleanup
- **Room Management**: Automatic room creation and cleanup

## Installation

```bash
# Navigate to the WebSocket server directory
cd src/ws

# Install dependencies
npm install

# Start the server
npm start

# Or start in development mode with auto-restart
npm run dev
```

## Usage

### Starting the Server

```bash
# Default port (8080)
npm start

# Custom port
WS_PORT=3001 npm start

# Development mode with detailed logging
NODE_ENV=development npm run dev
```

### WebSocket Endpoints

- **Server**: `ws://localhost:8080`
- **Game Room**: `ws://localhost:8080/game/{roomId}`

### Message Types

#### Client to Server Messages

1. **Join Game**
```javascript
{
  type: 'join_game',
  playerId: 'player_123',
  gameRoomId: 'room_456',
  timestamp: Date.now()
}
```

2. **Submit Answer**
```javascript
{
  type: 'submit_answer',
  playerId: 'player_123',
  questionId: 1,
  answer: 'Paragon International University',
  timeElapsed: 15,
  timestamp: Date.now()
}
```

3. **Boss Damage**
```javascript
{
  type: 'boss_damage',
  playerId: 'player_123',
  damage: 1.5,
  questionId: 1,
  timestamp: Date.now()
}
```

4. **Player Knocked Out**
```javascript
{
  type: 'player_knocked_out',
  playerId: 'player_123',
  revivalCode: 'ABC123',
  timestamp: Date.now()
}
```

5. **Revive Player**
```javascript
{
  type: 'revive_player',
  playerId: 'player_123',
  targetPlayerId: 'player_456',
  revivalCode: 'ABC123',
  timestamp: Date.now()
}
```

#### Server to Client Messages

1. **Game State Update**
```javascript
{
  type: 'game_state_update',
  data: {
    roomId: 'room_456',
    bossHealth: 8,
    maxBossHealth: 10,
    connectedPlayers: [...],
    knockedOutPlayers: [...],
    gameStatus: 'active',
    leaderboard: [...]
  },
  timestamp: Date.now()
}
```

2. **Player Joined**
```javascript
{
  type: 'player_joined',
  player: {
    id: 'player_123',
    name: 'John Doe',
    score: 0,
    lives: 3,
    status: 'active'
  },
  timestamp: Date.now()
}
```

3. **Boss Damage**
```javascript
{
  type: 'boss_damage',
  playerId: 'player_123',
  damage: 1.5,
  questionId: 1,
  newHealth: 8,
  timestamp: Date.now()
}
```

## Architecture

### Core Components

1. **BossBattleServer** (`server.js`)
   - Main WebSocket server class
   - Handles connections and message routing
   - Manages game rooms and players

2. **GameRoom** (`gameRoom.js`)
   - Manages individual game instances
   - Handles game logic and state
   - Processes answers and damage calculation

3. **Player** (`player.js`)
   - Represents individual players
   - Tracks player stats and status
   - Manages connection state

4. **Message Validator** (`messageValidator.js`)
   - Validates WebSocket messages
   - Defines message types and schemas
   - Provides error handling utilities

### Game Flow

1. **Player Connection**
   - Player connects to WebSocket server
   - Joins specific game room
   - Receives current game state

2. **Game Session**
   - Players submit answers to questions
   - Correct answers deal damage to boss
   - Wrong answers reduce player lives
   - Players get knocked out at 0 lives

3. **Revival System**
   - Knocked out players receive revival codes
   - Other players can revive them using codes
   - 60-second time limit for revival

4. **Game Completion**
   - Boss health reaches 0
   - Final leaderboard is generated
   - Game status set to 'completed'

## Configuration

### Environment Variables

- `WS_PORT`: Server port (default: 8080)
- `NODE_ENV`: Environment mode (development/production)
- `LOG_LEVEL`: Logging level (info/debug/warn/error)

### Game Settings

- **Boss Health**: 10 HP (configurable)
- **Player Lives**: 3 lives per player
- **Revival Time**: 60 seconds
- **Heartbeat Interval**: 30 seconds
- **Room Cleanup**: 5 minutes of inactivity

## Development

### Running in Development Mode

```bash
npm run dev
```

This will start the server with:
- Auto-restart on file changes
- Detailed logging
- Server statistics logging every 30 seconds

### Testing WebSocket Connection

You can test the WebSocket connection using any WebSocket client:

```javascript
const ws = new WebSocket('ws://localhost:8080/game/test-room');

ws.onopen = () => {
  console.log('Connected to server');
  
  // Join game
  ws.send(JSON.stringify({
    type: 'join_game',
    playerId: 'test-player',
    gameRoomId: 'test-room',
    timestamp: Date.now()
  }));
};

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log('Received:', message);
};
```

## Monitoring

The server provides real-time statistics accessible via the `getServerStats()` method:

```javascript
{
  totalRooms: 2,
  totalPlayers: 8,
  totalConnections: 8,
  rooms: [
    {
      id: 'room_1',
      playerCount: 4,
      gameStatus: 'active'
    },
    {
      id: 'room_2',
      playerCount: 4,
      gameStatus: 'waiting'
    }
  ]
}
```

## Error Handling

The server handles various error conditions:

- **Invalid Messages**: Malformed JSON or missing required fields
- **Connection Errors**: Network issues and unexpected disconnections
- **Game Logic Errors**: Invalid game state transitions
- **Room Management**: Cleanup of empty or stale rooms
- **Player Management**: Handling of disconnected or stale players

## Security Considerations

- Message validation prevents malformed data
- Connection verification can be extended for authentication
- Rate limiting can be added for message flooding protection
- Input sanitization for player names and answers

## License

This WebSocket server is part of the CS313 Team Boss Fight project.

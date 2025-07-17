// Message Types and Validation for WebSocket Communication

const MessageTypes = {
  // Connection messages
  CONNECTION_ACK: 'connection_ack',
  HEARTBEAT: 'heartbeat',
  ERROR: 'error',

  // Game flow messages
  JOIN_GAME: 'join_game',
  LEAVE_GAME: 'leave_game',
  GAME_STATE_UPDATE: 'game_state_update',
  REQUEST_GAME_STATE: 'request_game_state',
  REQUEST_QUESTION: 'request_question',
  QUESTION_DATA: 'question_data',
  NO_QUESTIONS_AVAILABLE: 'no_questions_available',

  // Player actions
  SUBMIT_ANSWER: 'submit_answer',
  ANSWER_RESULT: 'answer_result',
  
  // Boss battle mechanics
  BOSS_DAMAGE: 'boss_damage',
  
  // Player status changes
  PLAYER_JOINED: 'player_joined',
  PLAYER_LEFT: 'player_left',
  PLAYER_KNOCKED_OUT: 'player_knocked_out',
  PLAYER_REVIVED: 'player_revived',
  REVIVE_PLAYER: 'revive_player',
  
  // Game events
  QUESTION_CHANGED: 'question_changed',
  GAME_COMPLETED: 'game_completed',
  LEADERBOARD_UPDATE: 'leaderboard_update'
};

// Message validation schemas
const MessageSchemas = {
  [MessageTypes.JOIN_GAME]: {
    required: ['type', 'playerId', 'gameRoomId', 'timestamp'],
    optional: ['playerName']
  },
  
  [MessageTypes.SUBMIT_ANSWER]: {
    required: ['type', 'playerId', 'questionId', 'answer', 'timeElapsed', 'timestamp'],
    optional: []
  },
  
  [MessageTypes.BOSS_DAMAGE]: {
    required: ['type', 'playerId', 'damage', 'questionId', 'timestamp'],
    optional: []
  },
  
  [MessageTypes.PLAYER_KNOCKED_OUT]: {
    required: ['type', 'playerId', 'revivalCode', 'timestamp'],
    optional: []
  },
  
  [MessageTypes.REVIVE_PLAYER]: {
    required: ['type', 'playerId', 'targetPlayerId', 'revivalCode', 'timestamp'],
    optional: []
  },
  
  [MessageTypes.LEAVE_GAME]: {
    required: ['type', 'playerId', 'timestamp'],
    optional: []
  },
  
  [MessageTypes.REQUEST_GAME_STATE]: {
    required: ['type', 'playerId', 'timestamp'],
    optional: []
  },
  
  [MessageTypes.REQUEST_QUESTION]: {
    required: ['type', 'playerId', 'timestamp'],
    optional: []
  },
  
  [MessageTypes.QUESTION_DATA]: {
    required: ['type', 'question', 'timestamp'],
    optional: []
  },
  
  [MessageTypes.NO_QUESTIONS_AVAILABLE]: {
    required: ['type', 'message', 'timestamp'],
    optional: []
  },
  
  [MessageTypes.HEARTBEAT]: {
    required: ['type', 'timestamp'],
    optional: ['playerId']
  }
};

/**
 * Validates a WebSocket message against the defined schemas
 * @param {Object} message - The message to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function validateMessage(message) {
  if (!message || typeof message !== 'object') {
    return false;
  }

  const { type } = message;
  
  if (!type || typeof type !== 'string') {
    return false;
  }

  // Check if message type is known
  if (!Object.values(MessageTypes).includes(type)) {
    console.warn(`Unknown message type: ${type}`);
    return false;
  }

  const schema = MessageSchemas[type];
  if (!schema) {
    // If no schema defined, allow the message (for flexibility)
    return true;
  }

  // Check required fields
  for (const field of schema.required) {
    if (!(field in message)) {
      console.warn(`Missing required field '${field}' in message type '${type}'`);
      return false;
    }
  }

  // Validate specific field types
  if (message.timestamp && typeof message.timestamp !== 'number') {
    console.warn(`Invalid timestamp in message type '${type}'`);
    return false;
  }

  if (message.playerId && typeof message.playerId !== 'string') {
    console.warn(`Invalid playerId in message type '${type}'`);
    return false;
  }

  if (message.gameRoomId && typeof message.gameRoomId !== 'string') {
    console.warn(`Invalid gameRoomId in message type '${type}'`);
    return false;
  }

  if (message.questionId && typeof message.questionId !== 'number' && typeof message.questionId !== 'string') {
    console.warn(`Invalid questionId in message type '${type}'`);
    return false;
  }

  if (message.damage && typeof message.damage !== 'number') {
    console.warn(`Invalid damage in message type '${type}'`);
    return false;
  }

  if (message.timeElapsed && typeof message.timeElapsed !== 'number') {
    console.warn(`Invalid timeElapsed in message type '${type}'`);
    return false;
  }

  return true;
}

/**
 * Validates that a message contains all required fields for its type
 * @param {Object} message - The message to validate
 * @param {string} expectedType - The expected message type
 * @returns {Object} - {valid: boolean, errors: string[]}
 */
function validateMessageDetailed(message, expectedType = null) {
  const errors = [];

  if (!message || typeof message !== 'object') {
    errors.push('Message must be an object');
    return { valid: false, errors };
  }

  const { type } = message;
  
  if (!type || typeof type !== 'string') {
    errors.push('Message must have a string type field');
    return { valid: false, errors };
  }

  if (expectedType && type !== expectedType) {
    errors.push(`Expected message type '${expectedType}', got '${type}'`);
    return { valid: false, errors };
  }

  if (!Object.values(MessageTypes).includes(type)) {
    errors.push(`Unknown message type: ${type}`);
    return { valid: false, errors };
  }

  const schema = MessageSchemas[type];
  if (schema) {
    // Check required fields
    for (const field of schema.required) {
      if (!(field in message)) {
        errors.push(`Missing required field: ${field}`);
      }
    }

    // Check for unexpected fields (optional validation)
    const allowedFields = [...schema.required, ...schema.optional];
    for (const field in message) {
      if (!allowedFields.includes(field)) {
        console.warn(`Unexpected field '${field}' in message type '${type}'`);
      }
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Creates a standardized error message
 * @param {string} error - Error description
 * @param {number} timestamp - Optional timestamp
 * @returns {Object} - Formatted error message
 */
function createErrorMessage(error, timestamp = Date.now()) {
  return {
    type: MessageTypes.ERROR,
    error,
    timestamp
  };
}

/**
 * Creates a standardized success response
 * @param {string} type - Message type
 * @param {Object} data - Response data
 * @param {number} timestamp - Optional timestamp
 * @returns {Object} - Formatted response message
 */
function createResponseMessage(type, data = {}, timestamp = Date.now()) {
  return {
    type,
    ...data,
    timestamp
  };
}

module.exports = {
  MessageTypes,
  MessageSchemas,
  validateMessage,
  validateMessageDetailed,
  createErrorMessage,
  createResponseMessage
};

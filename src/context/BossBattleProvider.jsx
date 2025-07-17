import React, { useEffect, useState, useCallback } from 'react';
import useWebSocket from '@/hooks/useWebsocket';
import { BossBattleContext } from './BossBattleContext';
import { wsUrl } from '@/utils/ws';

export const BossBattleWebSocketProvider = ({ children, gameRoomId, playerId }) => {
  console.log('BossBattleWebSocketProvider render:', { gameRoomId, playerId });
  
  const [gameState, setGameState] = useState({
    bossHealth: 10,
    maxBossHealth: 10,
    bossData: null,
    currentQuestionId: null,
    currentQuestion: null,
    questionTimeRemaining: 30,
    connectedPlayers: [],
    knockedOutPlayers: [],
    gameStatus: 'waiting', // waiting, active, completed
    leaderboard: [],
    questionProgress: { current: 1, total: 5 }
  });

  const battleSocketUrl = `${wsUrl}/game/${gameRoomId}`;
  
  const {
    isConnected,
    connectionStatus,
    error,
    sendMessage,
    disconnect,
    reconnect
  } = useWebSocket(battleSocketUrl, {
    onOpen: () => {
      console.log('WebSocket connected to', battleSocketUrl);
      // Send join game message with a small delay
      setTimeout(() => {
        sendMessage({
          type: 'join_game',
          playerId,
          gameRoomId,
          timestamp: Date.now()
        });
      }, 100);
    },
    onClose: (event) => {
      console.log('WebSocket disconnected', event.code, event.reason);
      // Only log as error if it's not a normal closure
      if (event.code !== 1000) {
        console.error('WebSocket closed unexpectedly:', event.code, event.reason);
      }
    },
    onError: (event) => {
      console.error('WebSocket error:', event);
    },
    onMessage: handleWebSocketMessage,
    reconnectAttempts: 5, // Reduced from 10
    reconnectInterval: 2000, // Reduced from 3000
    heartbeatInterval: 30000,
    autoReconnect: true
  });

  // Handle incoming WebSocket messages
  function handleWebSocketMessage(message) {
    console.log('Received message:', message.type, message);
    
    // Validate message structure
    if (!message || !message.type) {
      console.warn('Invalid message received:', message);
      return;
    }
    
    switch (message.type) {
      case 'connection_ack':
        console.log('Connection acknowledged by server');
        break;
        
      case 'game_state_update':
        if (message.data) {
          setGameState(prevState => ({
            ...prevState,
            ...message.data
          }));
        }
        break;
        
      case 'player_joined':
        if (message.player) {
          setGameState(prevState => {
            // Check if player already exists to prevent duplicates
            const existingPlayer = prevState.connectedPlayers.find(p => p.id === message.player.id);
            if (existingPlayer) {
              return prevState; // Player already exists
            }
            return {
              ...prevState,
              connectedPlayers: [...prevState.connectedPlayers, message.player]
            };
          });
        }
        break;
        
      case 'player_left':
        if (message.playerId) {
          setGameState(prevState => ({
            ...prevState,
            connectedPlayers: prevState.connectedPlayers.filter(p => p.id !== message.playerId)
          }));
        }
        break;
        
      case 'boss_damage':
        if (typeof message.damage === 'number') {
          setGameState(prevState => ({
            ...prevState,
            bossHealth: Math.max(0, prevState.bossHealth - message.damage)
          }));
        }
        break;
        
      case 'player_knocked_out':
        if (message.player) {
          setGameState(prevState => {
            // Check if player is already knocked out to prevent duplicates
            const existingKnockedOut = prevState.knockedOutPlayers.find(p => p.id === message.player.id);
            if (existingKnockedOut) {
              return prevState;
            }
            return {
              ...prevState,
              knockedOutPlayers: [...prevState.knockedOutPlayers, message.player]
            };
          });
        }
        break;
        
      case 'player_revived':
        if (message.playerId) {
          setGameState(prevState => ({
            ...prevState,
            knockedOutPlayers: prevState.knockedOutPlayers.filter(p => p.id !== message.playerId)
          }));
        }
        break;
        
      case 'question_changed':
        if (message.questionId || message.currentQuestion) {
          setGameState(prevState => ({
            ...prevState,
            currentQuestionId: message.questionId,
            currentQuestion: message.currentQuestion || prevState.currentQuestion
          }));
        }
        break;
        
      case 'game_completed':
        setGameState(prevState => ({
          ...prevState,
          gameStatus: 'completed',
          leaderboard: message.leaderboard || []
        }));
        break;
        
      case 'leaderboard_update':
        if (message.leaderboard) {
          setGameState(prevState => ({
            ...prevState,
            leaderboard: message.leaderboard
          }));
        }
        break;
        
      case 'question_data':
        if (message.question) {
          setGameState(prevState => ({
            ...prevState,
            currentQuestion: message.question
          }));
        }
        break;
        
      case 'no_questions_available':
        console.warn('No questions available from server');
        setGameState(prevState => ({
          ...prevState,
          currentQuestion: null
        }));
        break;
        
      case 'error':
        console.error('Server error:', message.error);
        break;
        
      case 'heartbeat':
        // Heartbeat received from server, no action needed
        break;
        
      default:
        console.warn('Unknown message type:', message.type);
    }
  }

  const gameActions = {
    submitAnswer: useCallback((questionId, answer, timeElapsed) => {
      if (!isConnected) {
        console.warn('Cannot submit answer: not connected to server');
        return;
      }
      sendMessage({
        type: 'submit_answer',
        playerId,
        questionId,
        answer,
        timeElapsed,
        timestamp: Date.now()
      });
    }, [isConnected, sendMessage, playerId]),
    
    requestQuestion: useCallback(() => {
      if (!isConnected) {
        console.warn('Cannot request question: not connected to server');
        return;
      }
      sendMessage({
        type: 'request_question',
        playerId,
        timestamp: Date.now()
      });
    }, [isConnected, sendMessage, playerId]),
    
    dealBossDamage: useCallback((damage, questionId) => {
      if (!isConnected) {
        console.warn('Cannot deal boss damage: not connected to server');
        return;
      }
      sendMessage({
        type: 'boss_damage',
        playerId,
        damage,
        questionId,
        timestamp: Date.now()
      });
    }, [isConnected, sendMessage, playerId]),
    
    playerKnockedOut: useCallback((revivalCode) => {
      if (!isConnected) {
        console.warn('Cannot send knocked out status: not connected to server');
        return;
      }
      sendMessage({
        type: 'player_knocked_out',
        playerId,
        revivalCode,
        timestamp: Date.now()
      });
    }, [isConnected, sendMessage, playerId]),
    
    revivePlayer: useCallback((targetPlayerId, revivalCode) => {
      if (!isConnected) {
        console.warn('Cannot revive player: not connected to server');
        return;
      }
      sendMessage({
        type: 'revive_player',
        playerId,
        targetPlayerId,
        revivalCode,
        timestamp: Date.now()
      });
    }, [isConnected, sendMessage, playerId]),
    
    requestGameState: useCallback(() => {
      if (!isConnected) {
        console.warn('Cannot request game state: not connected to server');
        return;
      }
      sendMessage({
        type: 'request_game_state',
        playerId,
        timestamp: Date.now()
      });
    }, [isConnected, sendMessage, playerId]),
    
    leaveGame: () => {
      if (isConnected) {
        sendMessage({
          type: 'leave_game',
          playerId,
          timestamp: Date.now()
        });
      }
      // Always disconnect regardless of connection status
      disconnect();
    }
  };

  useEffect(() => {
    if (isConnected) {
      // Add a small delay to ensure connection is fully established
      const timer = setTimeout(() => {
        sendMessage({
          type: 'request_game_state',
          playerId,
          timestamp: Date.now()
        });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isConnected, playerId, sendMessage]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      console.log('BossBattleProvider unmounting, cleaning up connection...');
      disconnect();
    };
  }, [disconnect]);

  const contextValue = {
    // Connection state
    isConnected,
    connectionStatus,
    error,
    
    // Game state
    gameState,
    playerId, // Add current player ID
    
    // Actions
    ...gameActions,
    
    // Connection control
    disconnect,
    reconnect
  };

  return (
    <BossBattleContext.Provider value={contextValue}>
      {children}
    </BossBattleContext.Provider>
  );
};

export default BossBattleWebSocketProvider;
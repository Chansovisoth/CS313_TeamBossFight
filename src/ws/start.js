#!/usr/bin/env node

// Startup script for Boss Battle WebSocket Server
const BossBattleServer = require('./server');

// Configuration
const CONFIG = {
  port: process.env.WS_PORT || 8080,
  environment: process.env.NODE_ENV || 'development',
  logLevel: process.env.LOG_LEVEL || 'info'
};

console.log('🚀 Starting Boss Battle WebSocket Server...');
console.log(`📊 Environment: ${CONFIG.environment}`);
console.log(`🔧 Port: ${CONFIG.port}`);

// Create and start server
const server = new BossBattleServer(CONFIG.port);

// Add error handling for startup
try {
  server.start();
  
  console.log('✅ Server started successfully!');
  console.log(`🌐 WebSocket URL: ws://localhost:${CONFIG.port}`);
  console.log(`🎮 Game rooms available at: ws://localhost:${CONFIG.port}/game/{roomId}`);
  
  // Log server stats periodically in development
  if (CONFIG.environment === 'development') {
    setInterval(() => {
      const stats = server.getServerStats();
      if (stats.totalConnections > 0 || stats.totalRooms > 0) {
        console.log('📊 Server Stats:', {
          rooms: stats.totalRooms,
          players: stats.totalPlayers,
          connections: stats.totalConnections
        });
      }
    }, 30000); // Every 30 seconds
  }

} catch (error) {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
}

// Graceful shutdown handling
const shutdown = (signal) => {
  console.log(`\n🛑 Received ${signal}. Shutting down gracefully...`);
  
  if (server.wss) {
    // Close all connections
    server.wss.clients.forEach((ws) => {
      ws.close(1000, 'Server shutting down');
    });
    
    server.wss.close(() => {
      console.log('👋 WebSocket server closed');
      console.log('🏁 Shutdown complete');
      process.exit(0);
    });
    
    // Force exit after 10 seconds
    setTimeout(() => {
      console.log('⚠️ Force closing server after timeout');
      process.exit(1);
    }, 10000);
  } else {
    process.exit(0);
  }
};

// Listen for shutdown signals
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  shutdown('uncaughtException');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  shutdown('unhandledRejection');
});

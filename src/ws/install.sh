#!/bin/bash

# Boss Battle WebSocket Server Installation Script

echo "🚀 Installing Boss Battle WebSocket Server..."
echo "================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "🎮 Boss Battle WebSocket Server is ready!"
echo "================================================"
echo ""
echo "Available commands:"
echo "  npm start     - Start the server"
echo "  npm run dev   - Start in development mode"
echo "  npm test      - Run test client"
echo ""
echo "Server will run on: ws://localhost:8080"
echo "Game rooms: ws://localhost:8080/game/{roomId}"
echo ""
echo "To start the server:"
echo "  npm start"
echo ""
echo "Happy gaming! 🎉"

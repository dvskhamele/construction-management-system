#!/bin/bash

# BuildMate Construction Management System Startup Script
# This script starts the development server and opens the application in the browser

echo "=== BuildMate Construction Management System Startup ==="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: package.json not found. Please run this script from the frontend directory."
  echo "   cd /Users/test/startups/constructionmanagement/frontend"
  echo "   ./startup.sh"
  exit 1
fi

echo "✅ Frontend directory verified"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "⚠️  Warning: node_modules not found. Installing dependencies..."
  npm install
  if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to install dependencies."
    exit 1
  fi
  echo "✅ Dependencies installed successfully."
  echo ""
fi

# Start the development server
echo "🚀 Starting BuildMate Construction Management System..."
echo "   Opening http://localhost:3000 in your browser..."
echo "   Press Ctrl+C to stop the server."
echo ""

# Open browser and start server
open http://localhost:3000 &
npm run dev
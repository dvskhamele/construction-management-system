#!/bin/bash

# BuildMate Construction Management System Startup Script
# This script verifies the environment and starts the development server

echo "=== BuildMate Construction Management System Startup ==="
echo ""

# Check if we're in the right directory
if [ ! -f "/Users/test/startups/constructionmanagement/frontend/package.json" ]; then
  echo "❌ Error: BuildMate project not found."
  echo "Please ensure you're running this script from the correct location."
  exit 1
fi

echo "✅ BuildMate project found"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
  echo "❌ Error: Node.js is not installed."
  echo "Please install Node.js (v16 or higher) and try again."
  exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
  echo "❌ Error: npm is not installed."
  echo "Please install npm and try again."
  exit 1
fi

echo "✅ npm version: $(npm --version)"
echo ""

# Navigate to frontend directory
cd /Users/test/startups/constructionmanagement/frontend

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

# Check if required dependencies are installed
REQUIRED_DEPS=("next" "react" "react-dom" "tailwindcss")
ALL_DEPS_INSTALLED=true

for DEP in "${REQUIRED_DEPS[@]}"; do
  if npm list $DEP > /dev/null 2>&1; then
    echo "✅ $DEP is installed"
  else
    echo "❌ $DEP is missing"
    ALL_DEPS_INSTALLED=false
  fi
done

if [ "$ALL_DEPS_INSTALLED" = false ]; then
  echo ""
  echo "⚠️  Installing missing dependencies..."
  npm install next react react-dom tailwindcss
  if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to install required dependencies."
    exit 1
  fi
  echo "✅ Required dependencies installed successfully."
fi

echo ""
echo "🚀 Starting BuildMate Construction Management System..."
echo "   Opening http://localhost:3000 in your browser..."
echo "   Press Ctrl+C to stop the server."
echo ""

# Open browser and start server
open http://localhost:3000 &
npm run dev
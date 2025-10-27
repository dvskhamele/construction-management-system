#!/bin/bash

# BuildMate Construction Management System Production Build Script
# This script creates an optimized production build of the application

echo "=== BuildMate Construction Management System Production Build ==="
echo ""

# Check if we're in the right directory
if [ ! -f "vercel.json" ]; then
  echo "❌ Error: vercel.json not found. Please run this script from the project root directory."
  echo "   cd /Users/test/startups/constructionmanagement"
  echo "   ./build-production.sh"
  exit 1
fi

echo "✅ Project root directory verified"
echo ""

# Navigate to frontend directory
cd frontend

# Check if package.json exists
if [ ! -f "package.json" ]; then
  echo "❌ Error: package.json not found in frontend directory."
  exit 1
fi

echo "✅ Frontend package.json verified"
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

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
echo "✅ Previous builds cleaned."
echo ""

# Run production build
echo "🔨 Creating production build..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Error: Production build failed."
  exit 1
fi

echo "✅ Production build completed successfully."
echo ""
echo "📁 Build output is located in the .next directory"
echo ""
echo "To start the production server:"
echo "  cd frontend"
echo "  npm start"
echo ""
echo "To deploy to Vercel:"
echo "  cd .."
echo "  ./deploy.sh"
echo ""
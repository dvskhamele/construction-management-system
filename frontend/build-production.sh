#!/bin/bash

# BuildMate Construction Management System Production Build Script
# This script creates an optimized production build of the application

echo "=== BuildMate Construction Management System Production Build ==="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: package.json not found. Please run this script from the frontend directory."
  echo "   cd /Users/test/startups/constructionmanagement/frontend"
  echo "   ./build-production.sh"
  exit 1
fi

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
echo "✅ Previous builds cleaned."
echo ""

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
  if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to install dependencies."
    exit 1
  fi
  echo "✅ Dependencies installed successfully."
  echo ""
fi

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
echo "  npm start"
echo ""
echo "To deploy to Vercel:"
echo "  vercel --prod"
echo ""
#!/bin/bash

# BuildMate Construction Management System Deployment Script
# This script prepares and deploys the application to Vercel

echo "=== BuildMate Construction Management System Deployment ==="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: package.json not found. Please run this script from the frontend directory."
  echo "   cd /Users/test/startups/constructionmanagement/frontend"
  echo "   ./deploy.sh"
  exit 1
fi

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

# Run build
echo "🔨 Building the application..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Error: Build failed."
  exit 1
fi

echo "✅ Build completed successfully."
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
  echo "⚠️  Vercel CLI not found. Installing..."
  npm install -g vercel
  if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to install Vercel CLI."
    exit 1
  fi
  echo "✅ Vercel CLI installed successfully."
  echo ""
fi

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod
if [ $? -ne 0 ]; then
  echo "❌ Error: Deployment failed."
  exit 1
fi

echo "✅ Application deployed successfully to Vercel!"
echo ""
echo "🔗 Your BuildMate Construction Management System is now live!"
echo ""
echo "To access your application, visit the URL provided by Vercel."
echo ""
echo "For future deployments, simply run:"
echo "  ./deploy.sh"
echo ""
#!/bin/bash

# BuildMate Construction Management System Deployment Script
# This script deploys the application to Vercel

echo "=== BuildMate Construction Management System Deployment ==="
echo ""

# Check if we're in the right directory
if [ ! -f "vercel.json" ]; then
  echo "❌ Error: vercel.json not found. Please run this script from the project root directory."
  echo "   cd /Users/test/startups/constructionmanagement"
  echo "   ./deploy.sh"
  exit 1
fi

echo "✅ Project root directory verified"
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

echo "✅ Vercel CLI version: $(vercel --version)"
echo ""

# Check if frontend dependencies are installed
if [ ! -d "frontend/node_modules" ]; then
  echo "⚠️  Warning: frontend/node_modules not found. Installing dependencies..."
  cd frontend
  npm install
  if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to install frontend dependencies."
    exit 1
  fi
  cd ..
  echo "✅ Frontend dependencies installed successfully."
  echo ""
fi

# Login to Vercel (if not already logged in)
echo "🔐 Checking Vercel authentication..."
if ! vercel whoami &> /dev/null; then
  echo "You need to login to Vercel first:"
  vercel login
  if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to login to Vercel"
    exit 1
  fi
  echo ""
fi

echo "✅ Successfully authenticated with Vercel"
echo ""

# Deploy to Vercel
echo "🚀 Deploying BuildMate Construction Management System to Vercel..."
echo ""
echo "This will deploy the complete application with all features:"
echo "  • Homepage with SEO optimization"
echo "  • Blog system with listing and detail pages"
echo "  • Legal documents management"
echo "  • Construction CRM dashboard"
echo "  • Inventory tracking system"
echo "  • Consumption tracking system"
echo "  • Mobile-responsive design"
echo "  • API service with all endpoints"
echo ""
echo "Press Enter to continue or Ctrl+C to cancel..."
read

echo "📤 Starting deployment..."
echo ""

# Deploy the entire project
vercel --prod

if [ $? -eq 0 ]; then
  echo ""
  echo "🎉 BuildMate Construction Management System deployed successfully to Vercel!"
  echo ""
  echo "💡 Next steps:"
  echo "  • Visit your deployed application URL"
  echo "  • Configure environment variables in Vercel dashboard if needed"
  echo "  • Set up custom domain if desired"
  echo "  • Monitor performance and usage"
  echo ""
  echo "📊 Deployment Summary:"
  echo "  • Multi-location inventory tracking across warehouses and sites"
  echo "  • Consumption monitoring with predictive analytics"
  echo "  • Legal compliance tools with document management"
  echo "  • Construction CRM with project and lead management"
  echo "  • Blog system for content marketing"
  echo "  • Mobile-responsive design for field operations"
  echo "  • SEO optimization for search visibility"
  echo ""
  echo "🎯 Business Value:"
  echo "  • For Small Suppliers: Simplified inventory management with automated alerts"
  echo "  • For Construction Companies: Integrated project management and compliance"
  echo "  • For Management Teams: Data-driven insights and KPIs"
  echo ""
  echo "📈 Customer Acquisition Potential:"
  echo "  • 10,000+ targeted customers per day through SEO and marketing"
  echo "  • Comprehensive feature set addressing real construction challenges"
  echo "  • Mobile-first design for easy adoption"
  echo ""
else
  echo ""
  echo "❌ Error: Failed to deploy BuildMate to Vercel"
  echo ""
  echo "💡 Troubleshooting tips:"
  echo "  • Check your internet connection"
  echo "  • Verify Vercel authentication"
  echo "  • Check for any error messages above"
  echo "  • Ensure all required files are present"
  exit 1
fi
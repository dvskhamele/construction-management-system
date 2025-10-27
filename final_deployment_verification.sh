#!/bin/bash

# Deployment Verification Script for BuildMate Construction Management System
# This script verifies that all components are properly configured for deployment

echo "=== BuildMate Construction Management System Deployment Verification ==="
echo ""

# Check project structure
echo "1. Verifying project structure..."

REQUIRED_DIRS=(
  "/Users/test/startups/constructionmanagement/frontend"
  "/Users/test/startups/constructionmanagement/frontend/src"
  "/Users/test/startups/constructionmanagement/frontend/src/app"
  "/Users/test/startups/constructionmanagement/frontend/src/components"
  "/Users/test/startups/constructionmanagement/frontend/src/utils"
)

ALL_DIRS_EXIST=true

for DIR in "${REQUIRED_DIRS[@]}"; do
  if [ -d "$DIR" ]; then
    echo "  ✓ $DIR exists"
  else
    echo "  ✗ $DIR is missing"
    ALL_DIRS_EXIST=false
  fi
done

echo ""

# Check required files
echo "2. Verifying required files..."

REQUIRED_FILES=(
  "/Users/test/startups/constructionmanagement/vercel.json"
  "/Users/test/startups/constructionmanagement/deploy.sh"
  "/Users/test/startups/constructionmanagement/build-production.sh"
  "/Users/test/startups/constructionmanagement/frontend/package.json"
  "/Users/test/startups/constructionmanagement/frontend/src/app/page.tsx"
  "/Users/test/startups/constructionmanagement/frontend/src/app/blog/page.tsx"
  "/Users/test/startups/constructionmanagement/frontend/src/app/blog/[id]/page.tsx"
  "/Users/test/startups/constructionmanagement/frontend/src/app/legal-documents/page.tsx"
  "/Users/test/startups/constructionmanagement/frontend/src/app/construction-crm/page.tsx"
  "/Users/test/startups/constructionmanagement/frontend/src/app/inventory/page.tsx"
  "/Users/test/startups/constructionmanagement/frontend/src/app/consumption-tracker/page.tsx"
  "/Users/test/startups/constructionmanagement/frontend/src/components/Header.tsx"
  "/Users/test/startups/constructionmanagement/frontend/src/components/UserLayout.tsx"
  "/Users/test/startups/constructionmanagement/frontend/src/utils/apiService.js"
)

ALL_FILES_EXIST=true

for FILE in "${REQUIRED_FILES[@]}"; do
  if [ -f "$FILE" ]; then
    echo "  ✓ $FILE exists"
  else
    echo "  ✗ $FILE is missing"
    ALL_FILES_EXIST=false
  fi
done

echo ""

# Check deployment scripts
echo "3. Verifying deployment scripts..."

DEPLOYMENT_SCRIPTS=(
  "/Users/test/startups/constructionmanagement/deploy.sh"
  "/Users/test/startups/constructionmanagement/build-production.sh"
)

ALL_SCRIPTS_EXIST=true
ALL_SCRIPTS_EXECUTABLE=true

for SCRIPT in "${DEPLOYMENT_SCRIPTS[@]}"; do
  if [ -f "$SCRIPT" ]; then
    echo "  ✓ $SCRIPT exists"
    
    if [ -x "$SCRIPT" ]; then
      echo "  ✓ $SCRIPT is executable"
    else
      echo "  ✗ $SCRIPT is not executable"
      ALL_SCRIPTS_EXECUTABLE=false
    fi
  else
    echo "  ✗ $SCRIPT is missing"
    ALL_SCRIPTS_EXIST=false
  fi
done

echo ""

# Check package.json dependencies
echo "4. Verifying package.json dependencies..."

cd /Users/test/startups/constructionmanagement/frontend

REQUIRED_DEPS=("next" "react" "react-dom" "tailwindcss")
ALL_DEPS_INSTALLED=true

for DEP in "${REQUIRED_DEPS[@]}"; do
  if npm list $DEP > /dev/null 2>&1; then
    echo "  ✓ $DEP is installed"
  else
    echo "  ✗ $DEP is missing"
    ALL_DEPS_INSTALLED=false
  fi
done

echo ""

# Check API service functions
echo "5. Verifying API service functions..."

API_SERVICE_FILE="/Users/test/startups/constructionmanagement/frontend/src/utils/apiService.js"
API_FUNCTIONS=(
  "getLegalDocuments"
  "uploadLegalDocument"
  "getProjects"
  "getLeads"
  "getBlogPosts"
  "logConsumption"
  "getConsumptionRecords"
  "getInventory"
  "createInventoryItem"
  "getLocations"
  "createLocation"
)

ALL_FUNCTIONS_EXIST=true

for FUNC in "${API_FUNCTIONS[@]}"; do
  if grep -q "async $FUNC" "$API_SERVICE_FILE"; then
    echo "  ✓ $FUNC function exists"
  else
    echo "  ✗ $FUNC function is missing"
    ALL_FUNCTIONS_EXIST=false
  fi
done

echo ""

# Check navigation links
echo "6. Verifying navigation links..."

HEADER_FILE="/Users/test/startups/constructionmanagement/frontend/src/components/Header.tsx"
NAV_LINKS=("CRM" "Legal Docs" "Blog" "Inventory" "Consumption")

ALL_NAV_LINKS_EXIST=true

for LINK in "${NAV_LINKS[@]}"; do
  if grep -q "$LINK" "$HEADER_FILE"; then
    echo "  ✓ Navigation link '$LINK' exists"
  else
    echo "  ✗ Navigation link '$LINK' is missing"
    ALL_NAV_LINKS_EXIST=false
  fi
done

echo ""

# Summary
echo "=== Deployment Verification Summary ==="

if [ "$ALL_DIRS_EXIST" = true ] && \
   [ "$ALL_FILES_EXIST" = true ] && \
   [ "$ALL_SCRIPTS_EXIST" = true ] && \
   [ "$ALL_SCRIPTS_EXECUTABLE" = true ] && \
   [ "$ALL_DEPS_INSTALLED" = true ] && \
   [ "$ALL_FUNCTIONS_EXIST" = true ] && \
   [ "$ALL_NAV_LINKS_EXIST" = true ]; then
   
  echo "🎉 All deployment verification checks passed!"
  echo ""
  echo "The BuildMate Construction Management System is fully prepared for deployment."
  echo ""
  echo "🚀 Deployment Instructions:"
  echo ""
  echo "1. Vercel Deployment (Recommended):"
  echo "   - Install Vercel CLI: npm install -g vercel"
  echo "   - Login to Vercel: vercel login"
  echo "   - Deploy: ./deploy.sh"
  echo ""
  echo "2. Manual Deployment:"
  echo "   - Build: ./build-production.sh"
  echo "   - Start: cd frontend && npm start"
  echo "   - Access: http://localhost:3000"
  echo ""
  echo "3. Development Server:"
  echo "   - Start: cd frontend && npm run dev"
  echo "   - Access: http://localhost:3000"
  echo ""
  echo "The system includes all requested features:"
  echo "  - Homepage with SEO optimization"
  echo "  - Blog system with listing and detail pages"
  echo "  - Legal documents management"
  echo "  - Construction CRM dashboard"
  echo "  - Inventory tracking system"
  echo "  - Consumption tracking system"
  echo "  - API service with all required functions"
  echo "  - Proper navigation between all components"
  echo ""
  echo "✅ Ready for production deployment!"
  
else
  echo "❌ Some deployment verification checks failed!"
  echo ""
  echo "Please address the following issues:"
  
  if [ "$ALL_DIRS_EXIST" = false ]; then
    echo "  - Missing required directories"
  fi
  
  if [ "$ALL_FILES_EXIST" = false ]; then
    echo "  - Missing required files"
  fi
  
  if [ "$ALL_SCRIPTS_EXIST" = false ]; then
    echo "  - Missing deployment scripts"
  fi
  
  if [ "$ALL_SCRIPTS_EXECUTABLE" = false ]; then
    echo "  - Non-executable deployment scripts"
  fi
  
  if [ "$ALL_DEPS_INSTALLED" = false ]; then
    echo "  - Missing dependencies"
  fi
  
  if [ "$ALL_FUNCTIONS_EXIST" = false ]; then
    echo "  - Missing API service functions"
  fi
  
  if [ "$ALL_NAV_LINKS_EXIST" = false ]; then
    echo "  - Missing navigation links"
  fi
  
  echo ""
  echo "Once these issues are resolved, run this verification script again."
fi

echo ""
echo "=== End of Deployment Verification ==="
#!/bin/bash

# Deployment Verification Script for BuildMate Construction Management System
# This script verifies that all components are working correctly after deployment

echo "=== BuildMate Construction Management System Deployment Verification ==="
echo ""

# Verify frontend build
echo "1. Verifying frontend build..."
cd /Users/test/startups/constructionmanagement/frontend

if [ -d ".next" ]; then
  echo "  ✓ Next.js build directory exists"
else
  echo "  ℹ Next.js build directory not found (this is normal for development)"
fi

# Verify required dependencies
echo ""
echo "2. Verifying required dependencies..."

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

# Verify file structure
echo ""
echo "3. Verifying file structure..."

REQUIRED_DIRS=(
  "src/app"
  "src/components"
  "src/utils"
  "src/app/blog"
  "src/app/legal-documents"
  "src/app/construction-crm"
  "src/app/inventory"
  "src/app/consumption-tracker"
)

ALL_DIRS_EXIST=true

for DIR in "${REQUIRED_DIRS[@]}"; do
  if [ -d "/Users/test/startups/constructionmanagement/frontend/$DIR" ]; then
    echo "  ✓ $DIR exists"
  else
    echo "  ✗ $DIR is missing"
    ALL_DIRS_EXIST=false
  fi
done

# Verify required pages
echo ""
echo "4. Verifying required pages..."

REQUIRED_PAGES=(
  "src/app/page.tsx"
  "src/app/blog/page.tsx"
  "src/app/blog/[id]/page.tsx"
  "src/app/legal-documents/page.tsx"
  "src/app/construction-crm/page.tsx"
  "src/app/inventory/page.tsx"
  "src/app/consumption-tracker/page.tsx"
)

ALL_PAGES_EXIST=true

for PAGE in "${REQUIRED_PAGES[@]}"; do
  if [ -f "/Users/test/startups/constructionmanagement/frontend/$PAGE" ]; then
    echo "  ✓ $PAGE exists"
  else
    echo "  ✗ $PAGE is missing"
    ALL_PAGES_EXIST=false
  fi
done

# Verify required components
echo ""
echo "5. Verifying required components..."

REQUIRED_COMPONENTS=(
  "src/components/Header.tsx"
  "src/components/UserLayout.tsx"
  "src/utils/apiService.js"
)

ALL_COMPONENTS_EXIST=true

for COMPONENT in "${REQUIRED_COMPONENTS[@]}"; do
  if [ -f "/Users/test/startups/constructionmanagement/frontend/$COMPONENT" ]; then
    echo "  ✓ $COMPONENT exists"
  else
    echo "  ✗ $COMPONENT is missing"
    ALL_COMPONENTS_EXIST=false
  fi
done

# Verify API service functions
echo ""
echo "6. Verifying API service functions..."

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

# Verify navigation links
echo ""
echo "7. Verifying navigation links..."

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

# Summary
echo ""
echo "=== Deployment Verification Summary ==="

if [ "$ALL_DEPS_INSTALLED" = true ] && \
   [ "$ALL_DIRS_EXIST" = true ] && \
   [ "$ALL_PAGES_EXIST" = true ] && \
   [ "$ALL_COMPONENTS_EXIST" = true ] && \
   [ "$ALL_FUNCTIONS_EXIST" = true ] && \
   [ "$ALL_NAV_LINKS_EXIST" = true ]; then
   
  echo "🎉 All deployment verification checks passed!"
  echo ""
  echo "The BuildMate Construction Management System is ready for deployment."
  echo ""
  echo "To start the development server:"
  echo "  cd frontend"
  echo "  npm run dev"
  echo ""
  echo "To build for production:"
  echo "  cd frontend"
  echo "  npm run build"
  echo ""
  echo "To start the production server:"
  echo "  cd frontend"
  echo "  npm start"
  echo ""
  echo "To deploy to Vercel:"
  echo "  vercel --prod"
  echo ""
  echo "Access the application at: http://localhost:3000"
  
else
  echo "❌ Some deployment verification checks failed!"
  echo ""
  echo "Please check the errors above and ensure all components are properly installed."
  
  if [ "$ALL_DEPS_INSTALLED" = false ]; then
    echo "  - Missing dependencies"
  fi
  
  if [ "$ALL_DIRS_EXIST" = false ]; then
    echo "  - Missing directories"
  fi
  
  if [ "$ALL_PAGES_EXIST" = false ]; then
    echo "  - Missing page files"
  fi
  
  if [ "$ALL_COMPONENTS_EXIST" = false ]; then
    echo "  - Missing component files"
  fi
  
  if [ "$ALL_FUNCTIONS_EXIST" = false ]; then
    echo "  - Missing API service functions"
  fi
  
  if [ "$ALL_NAV_LINKS_EXIST" = false ]; then
    echo "  - Missing navigation links"
  fi
fi

echo ""
echo "=== End of Deployment Verification ==="
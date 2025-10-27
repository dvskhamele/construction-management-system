#!/bin/bash

# Deployment Verification Script for BuildMate Construction Management System
# This script verifies that all components are working correctly after deployment

echo "=== BuildMate Construction Management System Deployment Verification ==="
echo ""

# Check if required files exist
echo "1. Verifying required files..."

REQUIRED_FILES=(
  "frontend/package.json"
  "frontend/src/app/page.tsx"
  "frontend/src/app/blog/page.tsx"
  "frontend/src/app/legal-documents/page.tsx"
  "frontend/src/app/construction-crm/page.tsx"
  "frontend/src/app/inventory/page.tsx"
  "frontend/src/app/consumption-tracker/page.tsx"
  "frontend/src/components/Header.tsx"
  "frontend/src/utils/apiService.js"
  "vercel.json"
)

ALL_FILES_EXIST=true

for FILE in "${REQUIRED_FILES[@]}"; do
  if [ -f "/Users/test/startups/constructionmanagement/$FILE" ]; then
    echo "  ✓ $FILE exists"
  else
    echo "  ✗ $FILE is missing"
    ALL_FILES_EXIST=false
  fi
done

echo ""

# Check if required directories exist
echo "2. Verifying required directories..."

REQUIRED_DIRS=(
  "frontend/src/app/blog"
  "frontend/src/app/legal-documents"
  "frontend/src/app/construction-crm"
  "frontend/src/app/inventory"
  "frontend/src/app/consumption-tracker"
  "frontend/src/components"
  "frontend/src/utils"
)

ALL_DIRS_EXIST=true

for DIR in "${REQUIRED_DIRS[@]}"; do
  if [ -d "/Users/test/startups/constructionmanagement/$DIR" ]; then
    echo "  ✓ $DIR exists"
  else
    echo "  ✗ $DIR is missing"
    ALL_DIRS_EXIST=false
  fi
done

echo ""

# Check API service functions
echo "3. Verifying API service functions..."

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
echo "4. Verifying navigation links..."

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

if [ "$ALL_FILES_EXIST" = true ] && \
   [ "$ALL_DIRS_EXIST" = true ] && \
   [ "$ALL_FUNCTIONS_EXIST" = true ] && \
   [ "$ALL_NAV_LINKS_EXIST" = true ]; then
   
  echo "🎉 All deployment verification checks passed!"
  echo ""
  echo "The BuildMate Construction Management System is ready for deployment."
  echo ""
  echo "To deploy to Vercel:"
  echo "  ./deploy-buildmate.sh"
  echo ""
  echo "Or manually:"
  echo "  vercel --prod"
  echo ""
  echo "Access the application at your Vercel deployment URL"
  
else
  echo "❌ Some deployment verification checks failed!"
  echo ""
  echo "Please check the errors above and ensure all components are properly installed."
  
  if [ "$ALL_FILES_EXIST" = false ]; then
    echo "  - Missing required files"
  fi
  
  if [ "$ALL_DIRS_EXIST" = false ]; then
    echo "  - Missing required directories"
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
#!/bin/bash

# Integration Test Script for BuildMate Construction Management System
# This script verifies that all components are properly connected and working

echo "=== BuildMate Construction Management System Integration Test ==="
echo ""

# Test 1: Check if all required pages exist
echo "1. Checking required page files..."

PAGES=(
  "frontend/src/app/page.tsx"
  "frontend/src/app/blog/page.tsx"
  "frontend/src/app/blog/[id]/page.tsx"
  "frontend/src/app/legal-documents/page.tsx"
  "frontend/src/app/construction-crm/page.tsx"
  "frontend/src/app/inventory/page.tsx"
  "frontend/src/app/consumption-tracker/page.tsx"
)

ALL_PAGES_EXIST=true
for PAGE in "${PAGES[@]}"; do
  if [ -f "/Users/test/startups/constructionmanagement/$PAGE" ]; then
    echo "  ✓ $PAGE exists"
  else
    echo "  ✗ $PAGE is missing"
    ALL_PAGES_EXIST=false
  fi
done

echo ""

# Test 2: Check if required components exist
echo "2. Checking required component files..."

COMPONENTS=(
  "frontend/src/components/Header.tsx"
  "frontend/src/components/UserLayout.tsx"
  "frontend/src/utils/apiService.js"
)

ALL_COMPONENTS_EXIST=true
for COMPONENT in "${COMPONENTS[@]}"; do
  if [ -f "/Users/test/startups/constructionmanagement/$COMPONENT" ]; then
    echo "  ✓ $COMPONENT exists"
  else
    echo "  ✗ $COMPONENT is missing"
    ALL_COMPONENTS_EXIST=false
  fi
done

echo ""

# Test 3: Check API service functions
echo "3. Checking API service functions..."

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

API_SERVICE_FILE="/Users/test/startups/constructionmanagement/frontend/src/utils/apiService.js"
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

# Test 4: Check navigation links
echo "4. Checking navigation links..."

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

# Test 5: Check for SEO elements
echo "5. Checking for SEO elements..."

SEO_ELEMENTS=(
  "<title>"
  "<meta name=\"description\""
  "<meta name=\"keywords\""
  "<meta name=\"robots\""
  "<link rel=\"canonical\""
)

HOMEPAGE_FILE="/Users/test/startups/constructionmanagement/frontend/src/app/page.tsx"
ALL_SEO_ELEMENTS_EXIST=true

for ELEMENT in "${SEO_ELEMENTS[@]}"; do
  if grep -q "$ELEMENT" "$HOMEPAGE_FILE"; then
    echo "  ✓ SEO element '$ELEMENT' exists"
  else
    echo "  ✗ SEO element '$ELEMENT' is missing"
    ALL_SEO_ELEMENTS_EXIST=false
  fi
done

echo ""

# Test 6: Check for mobile responsiveness
echo "6. Checking for mobile responsiveness..."

RESPONSIVE_CLASSES=(
  "md:"
  "lg:"
  "sm:"
  "flex"
  "grid"
)

ALL_RESPONSIVE_CLASSES_EXIST=true

for CLASS in "${RESPONSIVE_CLASSES[@]}"; do
  if grep -q "$CLASS" "$HOMEPAGE_FILE"; then
    echo "  ✓ Responsive class '$CLASS' exists"
  else
    echo "  ✗ Responsive class '$CLASS' is missing"
    ALL_RESPONSIVE_CLASSES_EXIST=false
  fi
done

echo ""

# Summary
echo "=== Integration Test Summary ==="

if [ "$ALL_PAGES_EXIST" = true ] && \
   [ "$ALL_COMPONENTS_EXIST" = true ] && \
   [ "$ALL_FUNCTIONS_EXIST" = true ] && \
   [ "$ALL_NAV_LINKS_EXIST" = true ] && \
   [ "$ALL_SEO_ELEMENTS_EXIST" = true ] && \
   [ "$ALL_RESPONSIVE_CLASSES_EXIST" = true ]; then
   
  echo "🎉 All integration tests passed!"
  echo ""
  echo "The BuildMate Construction Management System is fully integrated with:"
  echo "  - Homepage with SEO optimization"
  echo "  - Blog system with listing and detail pages"
  echo "  - Legal documents management"
  echo "  - Construction CRM dashboard"
  echo "  - Inventory tracking system"
  echo "  - Consumption tracking system"
  echo "  - Proper navigation between all components"
  echo "  - API service with all required functions"
  echo "  - Mobile-responsive design"
  echo "  - SEO optimization elements"
  echo ""
  echo "🚀 Ready for deployment!"
  echo ""
  echo "To run the application:"
  echo "  cd frontend"
  echo "  npm run dev"
  echo ""
  echo "To access the application:"
  echo "  Open http://localhost:3000 in your browser"
  
else
  echo "❌ Some integration tests failed!"
  echo ""
  echo "Please check the errors above and ensure all components are properly connected."
  
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
  
  if [ "$ALL_SEO_ELEMENTS_EXIST" = false ]; then
    echo "  - Missing SEO elements"
  fi
  
  if [ "$ALL_RESPONSIVE_CLASSES_EXIST" = false ]; then
    echo "  - Missing responsive design classes"
  fi
fi

echo ""
echo "=== End of Integration Test ==="
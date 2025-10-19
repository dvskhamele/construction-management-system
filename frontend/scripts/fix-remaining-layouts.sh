#!/bin/bash

# Script to fix all remaining pages with incorrect layout structure
# This script will update all pages to properly use UserLayout

cd /Users/test/startups/constructionmanagement/frontend/src/app

# Find all pages with the problematic structure
echo "Finding pages with incorrect layout structure..."

# List of pages to fix
pages_to_fix=(
  "housekeeping/page.tsx"
  "inventory/page.tsx"
  "pms-integration/page.tsx"
  "proposals/page.tsx"
  "reports-analytics/page.tsx"
)

# Fix each page
for page in "${pages_to_fix[@]}"; do
  if [ -f "$page" ]; then
    echo "Fixing $page..."
    
    # Fix the opening div structure - replace the entire div with UserLayout
    sed -i '' 's|<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">\n      <UserLayout user={user} onLogout={handleLogout}>|<UserLayout user={user} onLogout={handleLogout}>|' "$page"
    
    # Fix the closing div structure - replace the closing div with closing UserLayout
    sed -i '' 's|</div>\s*</main>|</main>\n    </UserLayout>|' "$page"
    
    echo "  Fixed $page"
  else
    echo "  Skipping $page (file not found)"
  fi
done

echo "All pages updated to use proper UserLayout!"
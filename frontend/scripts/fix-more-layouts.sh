#!/bin/bash

# Script to fix all remaining pages with incorrect layout structure
# This script will update all pages to properly use UserLayout

cd /Users/test/startups/constructionmanagement/frontend/src/app

# List of pages to fix
pages_to_fix=(
  "settings/page.tsx"
  "sites-details/page.tsx"
  "smart-rooms/page.tsx"
  "staff-performance/page.tsx"
  "staff-tracking/page.tsx"
)

# Fix each page
for page in "${pages_to_fix[@]}"; do
  if [ -f "$page" ]; then
    echo "Fixing $page..."
    
    # Fix the opening div structure
    sed -i '' 's|<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">|<UserLayout user={user} onLogout={handleLogout}>|' "$page"
    
    # Fix the closing div structure
    sed -i '' 's|</div>\s*</main>|</main>\n    </UserLayout>|' "$page"
    
    echo "  Fixed $page"
  else
    echo "  Skipping $page (file not found)"
  fi
done

echo "All remaining pages updated to use proper UserLayout!"
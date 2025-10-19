#!/bin/bash

# Script to fix all pages that have incorrect layout structure
# This script will update all pages to properly use UserLayout

cd /Users/test/startups/constructionmanagement/frontend/src/app

# Find all pages with the problematic structure
find . -name "page.tsx" -exec grep -l "div className.*min-h-screen.*bg-gradient" {} \; | while read file; do
  echo "Fixing $file..."
  
  # Skip if it's a login or signup page
  if [[ "$file" == *"login"* ]] || [[ "$file" == *"signup"* ]]; then
    echo "  Skipping login/signup page..."
    continue
  fi
  
  # Fix the opening div structure
  sed -i '' 's/<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">/<UserLayout user={user} onLogout={handleLogout}>/' "$file"
  
  # Fix the closing div structure
  sed -i '' 's/<\/div>\s*<\/main>/<\/main>\n    <\/UserLayout>/' "$file"
  
  echo "  Fixed $file"
done

echo "All pages updated to use proper UserLayout!"
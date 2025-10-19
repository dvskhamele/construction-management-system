#!/bin/bash

# Script to fix all pages that don't use UserLayout
# This script will update all pages to properly use UserLayout for sidebar navigation

cd /Users/test/startups/constructionmanagement/frontend/src/app

# Find all pages that use Header instead of UserLayout
find . -name "page.tsx" -exec grep -l "import Header" {} \; | while read file; do
  echo "Fixing $file..."
  
  # Skip if it's already using UserLayout
  if grep -q "import UserLayout" "$file"; then
    echo "  Already using UserLayout, skipping..."
    continue
  fi
  
  # Skip login and signup pages
  if [[ "$file" == *"login"* ]] || [[ "$file" == *"signup"* ]]; then
    echo "  Skipping login/signup page..."
    continue
  fi
  
  # Replace Header import with UserLayout
  sed -i '' 's/import Header from .*/import UserLayout from '\''..\/..\/components\/UserLayout'\''/' "$file"
  
  # Replace Header component usage with UserLayout
  sed -i '' 's/<Header user={user} onLogout={handleLogout} \/>/<UserLayout user={user} onLogout={handleLogout}>/' "$file"
  
  # Replace closing div with closing UserLayout tag
  sed -i '' 's/<\/div>\s*<\/main>/<\/main>\n      <\/UserLayout>/' "$file"
  
  echo "  Fixed $file"
done

echo "All pages updated to use UserLayout!"
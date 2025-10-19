#!/bin/bash

# Script to fix all remaining pages with duplicate UserLayout issues
# This script will remove duplicate UserLayout tags and fix closing tags

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
    
    # Remove duplicate UserLayout tags
    sed -i '' '/<UserLayout user={user} onLogout={handleLogout}>/,/<\/UserLayout>/{
      /<UserLayout user={user} onLogout={handleLogout}>/!{
        /<\/UserLayout>/!d
      }
    }' "$page"
    
    # Fix closing div tags to UserLayout
    sed -i '' 's|</div>\s*</main>|</main>\n    </UserLayout>|' "$page"
    
    echo "  Fixed $page"
  else
    echo "  Skipping $page (file not found)"
  fi
done

echo "All pages with duplicate UserLayout fixed!"
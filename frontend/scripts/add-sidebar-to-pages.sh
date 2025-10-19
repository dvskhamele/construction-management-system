#!/bin/bash

# Script to ensure all pages use UserLayout for sidebar navigation
# This script will update all page.tsx files to use UserLayout

# Change directory to the frontend src app folder
cd /Users/test/startups/constructionmanagement/frontend/src/app

# Backup the original files
echo "Creating backups..."
find . -name "page.tsx" -exec cp {} {}.bak \;

# Update all page.tsx files to use UserLayout
echo "Updating pages to use UserLayout..."

# Find all page.tsx files
find . -name "page.tsx" | while read file; do
  # Skip if already using UserLayout
  if grep -q "UserLayout" "$file"; then
    echo "Skipping $file (already using UserLayout)"
    continue
  fi
  
  # Skip if it's the login or signup page
  if [[ "$file" == *"login"* ]] || [[ "$file" == *"signup"* ]]; then
    echo "Skipping $file (login/signup page)"
    continue
  fi
  
  # Skip if it's the root page.tsx
  if [[ "$file" == "./page.tsx" ]]; then
    echo "Skipping $file (root page)"
    continue
  fi
  
  # Add UserLayout import
  sed -i '' '1s/^/import UserLayout from "..\/..\/components\/UserLayout"\n/' "$file"
  
  # Wrap content with UserLayout
  # Find the main content and wrap it
  if grep -q "export default function" "$file"; then
    # Get the function name
    func_name=$(grep "export default function" "$file" | awk '{print $4}' | cut -d'(' -f1)
    
    # Add UserLayout wrapper
    sed -i '' "s/export default function $func_name/{export default function $func_name/" "$file"
    sed -i '' '/export default function/a\
  const [isLoggedIn, setIsLoggedIn] = useState(true)\
  const [user, setUser] = useState<any>({ name: '"'$(basename $(dirname "$file"))' Manager'", role: "ADMIN" })\
  \
  const handleLogout = () => {\
    localStorage.removeItem('"'"'token'"'"')\
    setIsLoggedIn(false)\
    setUser(null)\
    window.location.href = "/login"\
  }\
  \
  if (!isLoggedIn) {\
    return <div>Please log in</div>\
  }\
  \
  return (\
    <UserLayout user={user} onLogout={handleLogout}>/' "$file"
    
    # Add closing tag
    sed -i '' '$s/)$/    <\/UserLayout>\
  )/' "$file"
  fi
  
  echo "Updated $file"
done

echo "Update complete!"
#!/bin/bash

# Fix syntax errors in all API route files

echo "Fixing syntax errors in API route files..."

# List of API route files to fix
API_FILES=(
  "/Users/test/startups/constructionmanagement/frontend/src/app/api/tools/crew-scheduling-optimizer/route.js"
  "/Users/test/startups/constructionmanagement/frontend/src/app/api/tools/daily-site-report-generator/route.js"
  "/Users/test/startups/constructionmanagement/frontend/src/app/api/tools/equipment-utilization-tracker/route.js"
  "/Users/test/startups/constructionmanagement/frontend/src/app/api/tools/project-milestone-tracker/route.js"
)

# Fix each file
for FILE in "${API_FILES[@]}"; do
  echo "Fixing $FILE..."
  
  # Fix line 57-58 issue (extra ');' line)
  LINE_58=$(sed -n '58p' "$FILE")
  if [ "$LINE_58" = "');" ]; then
    echo "  Removing extra ');' on line 58"
    sed -i '' '58d' "$FILE"
  fi
  
  # Fix line 78-79 issue (extra ');' line)
  LINE_78=$(sed -n '78p' "$FILE")
  if [ "$LINE_78" = "');" ]; then
    echo "  Removing extra ');' on line 78"
    sed -i '' '78d' "$FILE"
  fi
  
  echo "  Fixed $FILE"
done

echo "All API route files fixed!"
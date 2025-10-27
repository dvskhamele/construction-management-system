#!/bin/bash

# Fix syntax errors in all API route files comprehensively

echo "Fixing syntax errors in all API route files..."

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
  
  # Check if line 57 has unterminated string and fix it
  LINE_57=$(sed -n '57p' "$FILE")
  if [[ $LINE_57 == *"await fs.appendFile(analyticsLogFilePath, JSON.stringify(analyticsEvent) +"* ]] && [[ $LINE_57 != *");"* ]]; then
    echo "  Fixing unterminated string on line 57"
    sed -i '' '57s/$/\\n'\''/' "$FILE"
    sed -i '' '57s/$/);/' "$FILE"
  fi
  
  # Check if line 77 has unterminated string and fix it
  LINE_77=$(sed -n '77p' "$FILE")
  if [[ $LINE_77 == *"await fs.appendFile(analyticsLogFilePath, JSON.stringify(errorEvent) +"* ]] && [[ $LINE_77 != *");"* ]]; then
    echo "  Fixing unterminated string on line 77"
    sed -i '' '77s/$/\\n'\''/' "$FILE"
    sed -i '' '77s/$/);/' "$FILE"
  fi
  
  echo "  Fixed $FILE"
done

echo "All API route files fixed!"
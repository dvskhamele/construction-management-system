#!/bin/bash

# Script to update all hospitality-related terms to construction terms
# This script will update all property-related terms to site-related terms

# Change directory to the frontend src folder
cd /Users/test/startups/constructionmanagement/frontend/src

# Backup the original files
echo "Creating backups..."
find . -name "*.tsx" -exec cp {} {}.bak \;

# Update property-related terms to site-related terms
echo "Updating property terms to site terms..."

# Update component names and imports
sed -i '' 's/Property/Site/g' $(find . -name "*.tsx")
sed -i '' 's/property/site/g' $(find . -name "*.tsx")

# Update specific terms that might have been over-replaced
sed -i '' 's/SiteManagement/SiteManagement/g' $(find . -name "*.tsx")
sed -i '' 's/siteName/siteName/g' $(find . -name "*.tsx")
sed -i '' 's/propertyName/siteName/g' $(find . -name "*.tsx")

# Update status terms
sed -i '' 's/AVAILABLE/ACTIVE/g' $(find . -name "*.tsx")
sed -i '' 's/UNDER_CONTRACT/PLANNING/g' $(find . -name "*.tsx")
sed -i '' 's/SOLD/COMPLETED/g' $(find . -name "*.tsx")
sed -i '' 's/UPCOMING/ON_HOLD/g' $(find . -name "*.tsx")

# Update other hospitality terms
sed -i '' 's/Guest/Client/g' $(find . -name "*.tsx")
sed -i '' 's/guest/client/g' $(find . -name "*.tsx")
sed -i '' 's/Room/Area/g' $(find . -name "*.tsx")
sed -i '' 's/room/area/g' $(find . -name "*.tsx")
sed -i '' 's/Hotel/Site/g' $(find . -name "*.tsx")
sed -i '' 's/hotel/site/g' $(find . -name "*.tsx")

# Update specific phrases
sed -i '' 's/property listings/site management/g' $(find . -name "*.tsx")
sed -i '' 's/sales status/project status/g' $(find . -name "*.tsx")
sed -i '' 's/bedrooms/crew/g' $(find . -name "*.tsx")
sed -i '' 's/bathrooms/equipment/g' $(find . -name "*.tsx")

echo "Update complete!"

# Show a summary of changes
echo "Files updated:"
find . -name "*.tsx" -exec grep -l "Site\|site\|ACTIVE\|PLANNING\|COMPLETED\|ON_HOLD" {} \; | head -10

echo "Backup files created with .bak extension"
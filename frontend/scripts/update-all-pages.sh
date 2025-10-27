#!/bin/bash

# Script to update all pages to use the new GenericResponsivePage component

# Define the pages directory
PAGES_DIR="/Users/test/startups/constructionmanagement/frontend/src/app"

# Define the component import
IMPORT_COMPONENT="import GenericResponsivePage from '../../components/GenericResponsivePage'"

# Define the component usage template
COMPONENT_WRAPPER_START="  return (
    <GenericResponsivePage 
      title=\"PAGE_TITLE\" 
      subtitle=\"PAGE_SUBTITLE\" 
      user={user} 
      onLogout={handleLogout}
    >"

COMPONENT_WRAPPER_END="    </GenericResponsivePage>
  )"

# List of pages to update with their titles and subtitles
declare -A PAGES=(
  ["admin"]="Admin,Manage administrative functions"
  ["analytics"]="Analytics,View construction analytics and insights"
  ["bids"]="Bids,Manage construction bids and proposals"
  ["calendar"]="Calendar,View and manage construction schedules"
  ["clients"]="Clients,Manage construction clients and contacts"
  ["construction-crm"]="Construction CRM,Manage construction customer relationships"
  ["construction-dashboard"]="Construction Dashboard,View construction project dashboard"
  ["construction-features"]="Construction Features,Explore construction management features"
  ["crew"]="Crew,Manage construction crew members"
  ["crew-tracking"]="Crew Tracking,Track crew member locations and activities"
  ["dashboard"]="Dashboard,View your construction management dashboard"
  ["dashboard-enhanced"]="Enhanced Dashboard,View enhanced dashboard with advanced analytics"
  ["defects"]="Defects,Track and manage construction defects"
  ["demo"]="Demo,View BuildMate construction management demo"
  ["departments"]="Departments,Manage construction departments"
  ["emergency-system"]="Emergency System,Access emergency response system"
  ["enhanced-requests"]="Enhanced Requests,Manage enhanced construction requests"
  ["equipment"]="Equipment,Manage construction equipment and machinery"
  ["features"]="Features,Explore BuildMate features"
  ["guests"]="Guests,Manage hotel guests"
  ["home"]="Home,Welcome to BuildMate Construction Management"
  ["housekeeping"]="Housekeeping,Manage housekeeping services"
  ["inventory"]="Inventory,Track construction materials inventory"
  ["leads"]="Leads,Manage construction leads and prospects"
  ["login"]="Login,Sign in to BuildMate Construction Management"
  ["marketing"]="Marketing,Manage construction marketing campaigns"
  ["materials"]="Materials,Manage construction materials"
  ["opportunities"]="Opportunities,Track construction business opportunities"
  ["pms-integration"]="PMS Integration,Integrate with Property Management Systems"
  ["pricing"]="Pricing,View BuildMate pricing plans"
  ["projects"]="Projects,Manage construction projects"
  ["proposals"]="Proposals,Create and manage construction proposals"
  ["reports"]="Reports,Generate construction reports"
  ["reports-analytics"]="Reports Analytics,Analyze construction reports"
  ["requests"]="Requests,Manage construction requests"
  ["safety"]="Safety,Manage construction safety protocols"
  ["settings"]="Settings,Configure BuildMate settings"
  ["signup"]="Signup,Create a BuildMate account"
  ["sites"]="Sites,Manage construction sites"
  ["smart-rooms"]="Smart Rooms,Manage smart room systems"
  ["staff"]="Staff,Manage construction staff"
  ["staff-performance"]="Staff Performance,Track staff performance metrics"
  ["staff-tracking"]="Staff Tracking,Track staff locations and activities"
  ["subcontractors"]="Subcontractors,Manage construction subcontractors"
  ["tasks"]="Tasks,Manage construction tasks"
  ["voice-commands"]="Voice Commands,Use voice commands for construction management"
)

echo "Starting to update all pages..."

# Loop through each page and update it
for page in "${!PAGES[@]}"; do
  PAGE_PATH="$PAGES_DIR/$page/page.tsx"
  
  # Check if the page file exists
  if [ -f "$PAGE_PATH" ]; then
    echo "Updating $page..."
    
    # Extract title and subtitle
    IFS=',' read -r TITLE SUBTITLE <<< "${PAGES[$page]}"
    
    # Create backup
    cp "$PAGE_PATH" "$PAGE_PATH.bak"
    
    # Update the page content
    sed -i.bak \
      -e "s/import ResponsiveLayout from '..\/..\/components\/ResponsiveLayout'/import ResponsiveLayout from '..\/..\/components\/ResponsiveLayout'\n$IMPORT_COMPONENT/" \
      -e "s/return (/<GenericResponsivePage title=\"$TITLE\" subtitle=\"$SUBTITLE\" user={user} onLogout={handleLogout}>/" \
      -e "s/<\/ResponsiveLayout>/<\/GenericResponsivePage>/" \
      "$PAGE_PATH"
    
    echo "Updated $page"
  else
    echo "Page $page not found at $PAGE_PATH"
  fi
done

echo "Finished updating all pages!"
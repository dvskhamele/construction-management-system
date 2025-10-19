# Migration from Hospitality to Construction Management System

## Current Status
✅ Core construction management pages are in place:
- Dashboard with Vastu alignment
- Projects management
- Sites management
- Tasks tracking
- Crew management
- Equipment tracking
- Materials inventory
- Safety management
- Defects tracking

❌ Some hospitality-related components still present:
- EmergencyResponse (needs to be renamed to SiteEmergencyResponse)
- GuestPreferences (should be removed or renamed to ClientPreferences)
- Some pages with hospitality terminology

## Immediate Actions Required

### 1. Rename Components
- [ ] Rename `EmergencyResponse.tsx` to `SiteEmergencyResponse.tsx`
- [ ] Update all imports to use the new name
- [ ] Rename `GuestPreferences.tsx` to `ClientPreferences.tsx` or remove if not needed

### 2. Update Pages
- [ ] Update `rooms` directory to be more construction-appropriate (maybe `sites-details`)
- [ ] Remove or rename any remaining hospitality-specific pages
- [ ] Ensure all pages use construction terminology:
  - Properties → Sites/Projects
  - Guests → Clients
  - Rooms → Work Areas/Sites
  - Housekeeping → Site Maintenance

### 3. Update Terminology Throughout
- [ ] Find and replace "property" with "site" or "project"
- [ ] Find and replace "guest" with "client" or "stakeholder"
- [ ] Find and replace "room" with "work area" or "site section"
- [ ] Find and replace "housekeeping" with "site maintenance"

### 4. Update Navigation
- [ ] Ensure sidebar navigation is construction-focused
- [ ] Remove any hospitality-specific navigation items
- [ ] Add construction-specific items if missing

### 5. Role-Based Access Control
✅ Already implemented with proper role definitions:
- ADMIN: Full access
- PROJECT_MANAGER: Project management access
- SITE_SUPERVISOR: Site-level access
- CREW_LEADER: Crew management access
- WORKER: Task execution access
- CLIENT: View-only access with client dashboard

### 6. Vastu Dashboard
✅ Implemented with proper directional zones:
- East: Growth & Progress
- West: Issues & Improvements
- North: Future & Vision
- South: Stability & Completion

## Priority Fixes

### Highest Priority
1. Fix build errors by updating all property/room/guest references to site/project/client
2. Rename EmergencyResponse to SiteEmergencyResponse
3. Remove or rename GuestPreferences

### Medium Priority
1. Update sidebar navigation to remove hospitality items
2. Rename rooms directory to something more construction-appropriate
3. Update all page titles and content to use construction terminology

### Lower Priority
1. Add more construction-specific features
2. Improve Vastu dashboard with more construction-specific metrics
3. Add more role-specific views and permissions

## Files Affected

### Components Needing Renaming/Updating
- `EmergencyResponse.tsx` → `SiteEmergencyResponse.tsx`
- `GuestPreferences.tsx` → `ClientPreferences.tsx` or remove
- `SmartRoomControls.tsx` → `SmartSiteControls.tsx` (already done)

### Pages Needing Updating
- `/app/rooms/` → Consider renaming to `/app/sites-details/` (already done)
- `/app/guests/` → Consider renaming to `/app/clients/`
- `/app/housekeeping/` → Consider renaming to `/app/site-maintenance/`

### Navigation Updates
- Sidebar navigation items should be reviewed for hospitality references
- Mobile navigation should also be updated

## Implementation Plan

1. Fix build errors first (highest priority)
2. Rename components and update imports
3. Update page content and terminology
4. Review and update navigation
5. Test role-based access control
6. Verify Vastu dashboard functionality
7. Run full build to ensure no errors
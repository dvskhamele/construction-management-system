# Migration Plan: Convert Hospitality Components to Construction Equivalents

## Direct Replacements (Rename existing hospitality components to construction equivalents)

1. `/app/rooms` → `/app/sites` (Already exists, so merge or remove hospitality version)
2. `/app/housekeeping` → `/app/site-maintenance` or `/app/cleaning` (Construction equivalent)
3. `/app/guests` → `/app/clients` (Already exists, so remove hospitality version)
4. `/app/pms-integration` → `/app/cms-integration` (Construction Management System)
5. `/app/smart-rooms` → `/app/smart-sites` (Already partially converted)

## Components to Remove Entirely (Not Relevant to Construction)

1. `/app/housekeeping` (Unless converted to site maintenance)
2. `/app/pms-integration` (Unless converted to CMS integration)
3. `/app/guests` (Unless converted to clients - already exists)

## Files to Update

1. `components/SmartRoomControls.tsx` → `components/SmartSiteControls.tsx` (Already done)
2. `components/GuestPreferences.tsx` → Remove or convert to `ClientPreferences.tsx`
3. `components/EmergencyResponse.tsx` → Convert to `SiteEmergencyResponse.tsx`

## New Construction Components to Create

1. `components/SiteMaintenance.tsx` (Replacement for Housekeeping)
2. `components/ClientPreferences.tsx` (Replacement for GuestPreferences)
3. `components/SiteEmergencyResponse.tsx` (Replacement for EmergencyResponse)

## Navigation Updates

1. Update sidebar to remove hospitality links
2. Add construction-specific navigation items
3. Ensure role-based access control is properly implemented
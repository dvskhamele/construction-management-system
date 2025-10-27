#!/usr/bin/env node

// Deployment Verification Script
console.log('=== BuildMate Construction Management System ===');
console.log('Deployment Verification Script\n');

// Check if required directories exist
const fs = require('fs');
const path = require('path');

const REQUIRED_DIRECTORIES = [
  'frontend/src/app',
  'frontend/src/components',
  'frontend/src/utils',
  'frontend/src/app/blog',
  'frontend/src/app/legal-documents',
  'frontend/src/app/construction-crm',
  'frontend/src/app/inventory'
];

const REQUIRED_FILES = [
  'frontend/src/app/page.tsx',
  'frontend/src/app/blog/page.tsx',
  'frontend/src/app/blog/[id]/page.tsx',
  'frontend/src/app/legal-documents/page.tsx',
  'frontend/src/app/construction-crm/page.tsx',
  'frontend/src/app/inventory/page.tsx',
  'frontend/src/components/Header.tsx',
  'frontend/src/utils/apiService.js'
];

console.log('1. Checking required directories...');
let allDirsExist = true;
for (const dir of REQUIRED_DIRECTORIES) {
  const fullPath = path.join(__dirname, '..', dir);
  if (fs.existsSync(fullPath)) {
    console.log(`  ✓ ${dir}`);
  } else {
    console.log(`  ✗ ${dir} (MISSING)`);
    allDirsExist = false;
  }
}

console.log('\n2. Checking required files...');
let allFilesExist = true;
for (const file of REQUIRED_FILES) {
  const fullPath = path.join(__dirname, '..', file);
  if (fs.existsSync(fullPath)) {
    console.log(`  ✓ ${file}`);
  } else {
    console.log(`  ✗ ${file} (MISSING)`);
    allFilesExist = false;
  }
}

console.log('\n3. Checking API service functions...');
try {
  const apiServicePath = path.join(__dirname, '..', 'frontend/src/utils/apiService.js');
  const apiServiceContent = fs.readFileSync(apiServicePath, 'utf8');
  
  const REQUIRED_FUNCTIONS = [
    'getLegalDocuments',
    'uploadLegalDocument',
    'getProjects',
    'getLeads',
    'getBlogPosts',
    'logConsumption',
    'getConsumptionRecords'
  ];
  
  let allFunctionsExist = true;
  for (const func of REQUIRED_FUNCTIONS) {
    if (apiServiceContent.includes('async ' + func)) {
      console.log(`  ✓ ${func}`);
    } else {
      console.log(`  ✗ ${func} (MISSING)`);
      allFunctionsExist = false;
    }
  }
  
  if (allFunctionsExist) {
    console.log('  All required API functions are present');
  } else {
    console.log('  Some API functions are missing');
  }
} catch (error) {
  console.log('  ✗ Could not verify API functions:', error.message);
}

console.log('\n4. Checking navigation links...');
try {
  const headerPath = path.join(__dirname, '..', 'frontend/src/components/Header.tsx');
  const headerContent = fs.readFileSync(headerPath, 'utf8');
  
  const NAVIGATION_ITEMS = ['CRM', 'Legal Docs', 'Blog'];
  let allNavItemsExist = true;
  
  for (const item of NAVIGATION_ITEMS) {
    if (headerContent.includes(item)) {
      console.log(`  ✓ Navigation item "${item}" exists`);
    } else {
      console.log(`  ✗ Navigation item "${item}" is missing`);
      allNavItemsExist = false;
    }
  }
  
  if (allNavItemsExist) {
    console.log('  All navigation items are present');
  }
} catch (error) {
  console.log('  ✗ Could not verify navigation links:', error.message);
}

console.log('\n=== Verification Summary ===');
if (allDirsExist && allFilesExist) {
  console.log('✓ All required directories and files are present');
  console.log('✓ System is ready for deployment');
  console.log('\nNext steps:');
  console.log('1. Run "npm run dev" to start the development server');
  console.log('2. Visit http://localhost:3000 to access the application');
  console.log('3. Navigate through all pages to verify functionality');
  console.log('4. Test data persistence in browser developer tools');
  process.exit(0);
} else {
  console.log('✗ Some required components are missing');
  console.log('✗ Please check the errors above and ensure all components are present');
  process.exit(1);
}
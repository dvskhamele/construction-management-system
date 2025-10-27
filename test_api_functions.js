const fs = require('fs');

// Read the API service file
const apiServiceContent = fs.readFileSync('/Users/test/startups/constructionmanagement/frontend/src/utils/apiService.js', 'utf8');

// Check for key functions
const FUNCTIONS_TO_CHECK = [
  'getLegalDocuments',
  'uploadLegalDocument',
  'getProjects',
  'getLeads',
  'getBlogPosts',
  'logConsumption',
  'getConsumptionRecords'
];

FUNCTIONS_TO_CHECK.forEach(func => {
  if (apiServiceContent.includes('async ' + func)) {
    console.log('✓ ' + func + ' function exists');
  } else {
    console.log('✗ ' + func + ' function is missing');
  }
});
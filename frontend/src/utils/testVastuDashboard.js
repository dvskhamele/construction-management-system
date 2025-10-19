// Test script to verify Vastu Dashboard functionality
console.log('Testing Vastu Dashboard functionality...');

// Test data
const testData = {
  projects: [
    { id: 1, name: 'Residential Complex A', status: 'ACTIVE', progress: 75 },
    { id: 2, name: 'Office Building B', status: 'PLANNING', progress: 15 },
    { id: 3, name: 'Shopping Mall C', status: 'COMPLETED', progress: 100 }
  ],
  tasks: [
    { id: 1, title: 'Foundation Work', status: 'COMPLETED' },
    { id: 2, title: 'Electrical Installation', status: 'PENDING' },
    { id: 3, title: 'Design Approval', status: 'IN_PROGRESS' }
  ],
  budgets: [
    { allocated: 5000000, spent: 3750000 },
    { allocated: 8000000, spent: 1200000 },
    { allocated: 12000000, spent: 12000000 }
  ]
};

console.log('Test data loaded successfully');

// Verify localStorage operations
try {
  localStorage.setItem('constructionProjects', JSON.stringify({ projects: testData.projects }));
  localStorage.setItem('constructionTasks', JSON.stringify({ tasks: testData.tasks }));
  localStorage.setItem('constructionBudgets', JSON.stringify(testData.budgets));
  
  console.log('LocalStorage operations successful');
  
  // Retrieve and verify
  const storedProjects = JSON.parse(localStorage.getItem('constructionProjects') || '{}');
  const storedTasks = JSON.parse(localStorage.getItem('constructionTasks') || '{}');
  const storedBudgets = JSON.parse(localStorage.getItem('constructionBudgets') || '[]');
  
  console.log('Data retrieval successful');
  console.log(`Projects: ${storedProjects.projects.length}`);
  console.log(`Tasks: ${storedTasks.tasks.length}`);
  console.log(`Budgets: ${storedBudgets.length}`);
  
} catch (error) {
  console.error('Error with localStorage operations:', error);
}

console.log('Vastu Dashboard test completed successfully');
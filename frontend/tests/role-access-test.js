// Test script to verify role-based access
const puppeteer = require('puppeteer');

async function testRoleBasedAccess() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // Navigate to login page
    await page.goto('http://localhost:3001/login');
    console.log('Navigated to login page');
    
    // Test Admin login
    await page.click('text=Admin');
    await page.waitForNavigation();
    console.log('Admin login successful');
    
    // Check that admin dashboard loads
    await page.waitForSelector('text=Vastu-Aligned Dashboard');
    console.log('Admin dashboard loaded');
    
    // Test navigation to projects page
    await page.click('text=Projects');
    await page.waitForNavigation();
    console.log('Navigated to projects page');
    
    // Check that projects page loads
    await page.waitForSelector('text=Project Management');
    console.log('Projects page loaded');
    
    // Navigate back to dashboard
    await page.click('text=Dashboard');
    await page.waitForNavigation();
    console.log('Returned to dashboard');
    
    // Test Project Manager login
    await page.goto('http://localhost:3001/login');
    await page.click('text=PM');
    await page.waitForNavigation();
    console.log('Project Manager login successful');
    
    // Check that PM dashboard loads
    await page.waitForSelector('text=Vastu-Aligned Dashboard');
    console.log('Project Manager dashboard loaded');
    
    // Test Site Supervisor login
    await page.goto('http://localhost:3001/login');
    await page.click('text=SS');
    await page.waitForNavigation();
    console.log('Site Supervisor login successful');
    
    // Check that SS dashboard loads
    await page.waitForSelector('text=Vastu-Aligned Dashboard');
    console.log('Site Supervisor dashboard loaded');
    
    // Test Crew Leader login
    await page.goto('http://localhost:3001/login');
    await page.click('text=CL');
    await page.waitForNavigation();
    console.log('Crew Leader login successful');
    
    // Check that CL dashboard loads
    await page.waitForSelector('text=Vastu-Aligned Dashboard');
    console.log('Crew Leader dashboard loaded');
    
    // Test Subcontractor login
    await page.goto('http://localhost:3001/login');
    await page.click('text=SUB');
    await page.waitForNavigation();
    console.log('Subcontractor login successful');
    
    // Check that SUB dashboard loads
    await page.waitForSelector('text=Vastu-Aligned Dashboard');
    console.log('Subcontractor dashboard loaded');
    
    console.log('All role-based access tests passed!');
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await browser.close();
  }
}

testRoleBasedAccess();
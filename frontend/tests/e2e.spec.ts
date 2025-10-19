// @ts-check
import { test, expect } from '@playwright/test';

test('should allow user to login and navigate to dashboard', async ({ page }) => {
  // Navigate to the deployed application
  await page.goto('http://localhost:3001/login');
  
  // Check that we're on the login page
  await expect(page).toHaveTitle(/BuildMate/);
  
  // Fill in login credentials
  await page.fill('input[type="email"]', 'admin@buildmate.com');
  await page.fill('input[type="password"]', 'password123');
  
  // Click login button
  await page.click('button[type="submit"]');
  
  // Wait for navigation to dashboard
  await page.waitForURL('**/dashboard');
  
  // Check that we're on the dashboard
  await expect(page.locator('h1:text("Welcome")')).toBeVisible();
  
  // Check that the dashboard has the expected elements
  await expect(page.locator('text=Vastu-Aligned Dashboard')).toBeVisible();
  await expect(page.locator('text=Pending Tasks')).toBeVisible();
  await expect(page.locator('text=Active Sites')).toBeVisible();
  await expect(page.locator('text=Revenue Today')).toBeVisible();
  await expect(page.locator('text=Crew Members')).toBeVisible();
});

test('should show role-specific navigation', async ({ page }) => {
  // Navigate to the deployed application
  await page.goto('http://localhost:3001/login');
  
  // Login as admin
  await page.fill('input[type="email"]', 'admin@buildmate.com');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button[type="submit"]');
  
  // Wait for navigation to dashboard
  await page.waitForURL('**/dashboard');
  
  // Check that admin-specific navigation items are visible
  await expect(page.locator('text=Admin')).toBeVisible();
  await expect(page.locator('text=Projects')).toBeVisible();
  await expect(page.locator('text=Sites')).toBeVisible();
  await expect(page.locator('text=Tasks')).toBeVisible();
  await expect(page.locator('text=Crew')).toBeVisible();
  await expect(page.locator('text=Equipment')).toBeVisible();
  await expect(page.locator('text=Defects')).toBeVisible();
  await expect(page.locator('text=Materials')).toBeVisible();
  await expect(page.locator('text=Analytics')).toBeVisible();
  await expect(page.locator('text=Subcontractors')).toBeVisible();
});

test('should show client-specific dashboard', async ({ page }) => {
  // Navigate to the deployed application
  await page.goto('http://localhost:3001/login');
  
  // Login as client
  await page.fill('input[type="email"]', 'client@buildmate.com');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button[type="submit"]');
  
  // Wait for navigation to dashboard
  await page.waitForURL('**/dashboard');
  
  // Check that client-specific elements are visible
  await expect(page.locator('text=Project Progress')).toBeVisible();
  await expect(page.locator('text=Billing Status')).toBeVisible();
  await expect(page.locator('text=Pending Payment')).toBeVisible();
});

test('should navigate between different sections', async ({ page }) => {
  // Navigate to the deployed application
  await page.goto('http://localhost:3001/login');
  
  // Login as admin
  await page.fill('input[type="email"]', 'admin@buildmate.com');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button[type="submit"]');
  
  // Wait for navigation to dashboard
  await page.waitForURL('**/dashboard');
  
  // Navigate to projects page
  await page.click('text=Projects');
  await page.waitForURL('**/projects');
  await expect(page.locator('text=Project Management')).toBeVisible();
  
  // Navigate to tasks page
  await page.click('text=Tasks');
  await page.waitForURL('**/tasks');
  await expect(page.locator('text=Task Management')).toBeVisible();
  
  // Navigate to sites page
  await page.click('text=Sites');
  await page.waitForURL('**/sites');
  await expect(page.locator('text=Site Management')).toBeVisible();
  
  // Navigate back to dashboard
  await page.click('text=Dashboard');
  await page.waitForURL('**/dashboard');
  await expect(page.locator('text=Vastu-Aligned Dashboard')).toBeVisible();
});

test('should show Vastu dashboard elements', async ({ page }) => {
  // Navigate to the deployed application
  await page.goto('http://localhost:3001/login');
  
  // Login as admin
  await page.fill('input[type="email"]', 'admin@buildmate.com');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button[type="submit"]');
  
  // Wait for navigation to dashboard
  await page.waitForURL('**/dashboard');
  
  // Check for Vastu dashboard elements
  await expect(page.locator('text=Growth & Progress')).toBeVisible();
  await expect(page.locator('text=Issues & Improvements')).toBeVisible();
  await expect(page.locator('text=Future & Vision')).toBeVisible();
  await expect(page.locator('text=Stability & Completion')).toBeVisible();
  
  // Check for Vastu tips
  await expect(page.locator('text=Vastu Tip')).toBeVisible();
});
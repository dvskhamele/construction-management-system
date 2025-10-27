// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('BuildMate Construction Management System', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001');
  });

  test('should display BuildMate homepage', async ({ page }) => {
    // Verify homepage elements
    await expect(page.locator('text=BuildMate: Delhi\'s Premier Construction Management Platform')).toBeVisible();
    await expect(page.getByRole('banner').getByText('BuildMate')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Live Demo', exact: true })).toBeVisible();
  });

  test('should navigate to login page and show login form', async ({ page }) => {
    // Click Sign In button
    await page.click('button:has-text("Sign In")');
    await page.waitForURL('**/login');
    
    // Verify login page elements
    await expect(page.locator('text=Sign in to your account')).toBeVisible();
    await expect(page.locator('text=Manage your construction projects')).toBeVisible();
    await expect(page.locator('input#email')).toBeVisible();
    await expect(page.locator('input#password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
    
    // Verify quick login options are present
    await expect(page.getByRole('button', { name: 'Admin', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'PM', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'SS', exact: true })).toBeVisible();
  });

  test('should allow login with demo credentials and redirect to dashboard', async ({ page }) => {
    // Navigate to login page
    await page.click('button:has-text("Sign In")');
    await page.waitForURL('**/login');
    
    // Use demo credentials by clicking Admin quick login
    await page.click('button:has-text("Admin")');
    
    // Click the Sign In button
    await page.click('button:has-text("Sign In")');
    
    // Wait for redirect to dashboard and verify
    await page.waitForURL('**/dashboard');
    await expect(page.locator('text=Welcome, admin')).toBeVisible();
    await expect(page.getByRole('paragraph').filter({ hasText: 'Pending Tasks' })).toBeVisible();
    await expect(page.getByRole('paragraph').filter({ hasText: 'Active Sites' })).toBeVisible();
  });

  test('should show dashboard stats cards', async ({ page }) => {
    // Login first
    await page.click('button:has-text("Sign In")');
    await page.waitForURL('**/login');
    await page.click('button:has-text("Admin")');
    await page.click('button:has-text("Sign In")');
    await page.waitForURL('**/dashboard');
    
    // Verify dashboard stats cards are visible
    await expect(page.getByRole('paragraph').filter({ hasText: 'Pending Tasks' })).toBeVisible();
    await expect(page.getByRole('paragraph').filter({ hasText: 'Active Sites' })).toBeVisible();
    await expect(page.getByRole('paragraph').filter({ hasText: 'Revenue Today' })).toBeVisible();
    await expect(page.getByRole('paragraph').filter({ hasText: 'Crew Members' })).toBeVisible();
  });

  test('should show recent activity on dashboard', async ({ page }) => {
    // Login first
    await page.click('button:has-text("Sign In")');
    await page.waitForURL('**/login');
    await page.click('text=Admin');
    await page.click('button:has-text("Sign In")');
    await page.waitForURL('**/dashboard');
    
    // Verify recent activity section
    await expect(page.locator('text=Recent Activity')).toBeVisible();
    await expect(page.locator('text=Recent Tasks')).toBeVisible();
  });

  test('should navigate to projects page', async ({ page }) => {
    // Login first
    await page.click('button:has-text("Sign In")');
    await page.waitForURL('**/login');
    await page.click('button:has-text("Admin")');
    await page.click('button:has-text("Sign In")');
    await page.waitForURL('**/dashboard');
    
    // Click on the Active Sites card to navigate to projects
    await page.getByRole('paragraph').filter({ hasText: 'Active Sites' }).click();
    
    // Wait for navigation to projects page
    await page.waitForURL('**/projects');
    await expect(page.getByRole('heading', { name: 'Projects Dashboard' })).toBeVisible();
  });

  test('should navigate to tasks page', async ({ page }) => {
    // Login first
    await page.click('button:has-text("Sign In")');
    await page.waitForURL('**/login');
    await page.click('button:has-text("Admin")');
    await page.click('button:has-text("Sign In")');
    await page.waitForURL('**/dashboard');
    
    // Click on the Pending Tasks card to navigate to tasks
    await page.getByRole('paragraph').filter({ hasText: 'Pending Tasks' }).click();
    
    // Wait for navigation to tasks page
    await page.waitForURL('**/tasks');
    await expect(page.getByRole('heading', { name: 'Tasks Dashboard' })).toBeVisible();
  });

  test('should navigate to analytics page', async ({ page }) => {
    // Login first
    await page.click('button:has-text("Sign In")');
    await page.waitForURL('**/login');
    await page.click('button:has-text("Admin")');
    await page.click('button:has-text("Sign In")');
    await page.waitForURL('**/dashboard');
    
    // Click on the Revenue Today card to navigate to analytics
    await page.getByRole('paragraph').filter({ hasText: 'Revenue Today' }).click();
    
    // Wait for navigation to analytics page
    await page.waitForURL('**/analytics');
    await expect(page.getByRole('heading', { name: 'Analytics Dashboard' })).toBeVisible();
  });

  test('should show team leaderboard on dashboard', async ({ page }) => {
    // Login first
    await page.click('button:has-text("Sign In")');
    await page.waitForURL('**/login');
    await page.click('button:has-text("Admin")');
    await page.click('button:has-text("Sign In")');
    await page.waitForURL('**/dashboard');
    
    // Verify team leaderboard section
    await expect(page.getByRole('heading', { name: 'Team Performance Leaderboard' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Rank' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Team Member' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Performance' })).toBeVisible();
  });
});
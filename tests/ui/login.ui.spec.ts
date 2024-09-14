import { test, expect } from '@playwright/test';

const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8081';

test('successful login', async ({ page }) => {
  // Go to the login page
  await page.goto(frontendUrl);

  // Fill in the login form using name attributes
  await page.locator('input[name="username"]').fill('admin');
  await page.locator('input[name="password"]').fill('admin');

  // Click the login button
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify successful login
  await expect(page.getByRole('heading', { name: 'Hi Slawomir!' })).toBeVisible();
  await expect(page.getByText("You're logged in! Congratulations :)")).toBeVisible();

  // Verify the presence of expected elements after login
  await expect(page.getByRole('heading', { name: 'All registered users:' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Add more users' })).toBeVisible();

  // Verify the presence of registered users
  await expect(page.getByText('Slawomir Radzyminski')).toBeVisible();
  await expect(page.getByText('Gosia Radzyminska')).toBeVisible();
});
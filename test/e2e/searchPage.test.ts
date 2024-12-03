import { test, expect } from '@playwright/test';

test('search page displays products', async ({ page }) => {
  await page.goto('/'); 
  await expect(page).toHaveTitle(/Search/); 

  // search product
  await page.fill('input[placeholder="Search..."]', 'Product 1');
  await page.keyboard.press('Enter');

  
  const product = await page.locator('text=Product 1');
  await expect(product).toBeVisible();
});

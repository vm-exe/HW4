import { test, expect } from '@playwright/test';

test('E2E: search products, apply filters, and verify product details', async ({ page }) => {
  // Navigate to the search page
  await page.goto('http://localhost:5173');

  // Apply a filter by clicking on a collection (e.g., "Shirts")
  const collectionFilter = page.locator('text=Shirts');
  await collectionFilter.click();

  // Search for a product using the search bar
  const searchInput = page.locator('input[placeholder="Search..."]');
  await searchInput.fill('Product 1');
  await searchInput.press('Enter');

  // Wait for the specific product card to appear
  const productCard = page.locator('.MuiCard-root', { hasText: 'Product 1' });
  await expect(productCard).toBeVisible();

  // Click the "View Details" button within the specific product card
  const viewDetailsButton = productCard.locator('button:has-text("View Details")');
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'load' }),
    viewDetailsButton.click(),
  ]);

  // Assert that the URL changes to the product details page
  await expect(page).toHaveURL(/\/product\/1/);

  // Verify the product details on the details page
  const productName = page.locator('h4'); // Selector for product name
  const productPrice = page.locator('h5'); // Selector for product price
  const productDescription = page.locator('p'); // Selector for product description

  await expect(productName).toHaveText('Product 1');
  await expect(productPrice).toHaveText('$10.99');
  await expect(productDescription).toContainText('Description for Product 1');
});

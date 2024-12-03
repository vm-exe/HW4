import { test, expect } from '@playwright/test';

test('search page displays products and handles search', async ({ page }) => {
  
  await page.goto('http://localhost:5173'); 

  await expect(page).toHaveTitle(/Vite \+ React \+ TS/); 

 
  const productCards = page.locator('.MuiCard-root'); 
  await expect(productCards.first()).toBeVisible({ timeout: 10000 }); // Espera a que al menos un producto esté visible

  await page.fill('input[placeholder="Search..."]', 'Product 1'); // Asegúrate de que el placeholder sea el correcto
  await page.press('input[placeholder="Search..."]', 'Enter');

  await page.waitForTimeout(2000); 

  
  const productName = page.locator('.MuiCardContent-root h6').nth(0); // Selecciona el primer <h6> dentro de la tarjeta

  await expect(productName).toContainText('Product 1');
});

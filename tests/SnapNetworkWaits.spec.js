
    import { test, expect } from '@playwright/test';

test('Search shoes with proper waits', async ({ page }) => {

    await page.goto('https://www.snapdeal.com/');

    const searchBox = page.getByRole('textbox', {
        name: 'Search products & brands'
    });

    await searchBox.fill('shoes');
    await searchBox.press('Enter');

    // Wait for page navigation/load
    await page.waitForLoadState('domcontentloaded');

    // Wait for products to appear
    const products = page.locator('.product-row.js-product-list');

    await expect(products.first()).toBeVisible();

    // Verify products are displayed
    const count = await products.count();

    expect(count).toBeGreaterThan(0);

    console.log('Products displayed:', count);
});





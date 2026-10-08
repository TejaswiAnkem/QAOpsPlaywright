import { test, expect } from '@playwright/test';

test('Find Nike product using Show More', async ({ page }) => {

    await page.goto('https://www.snapdeal.com/');

    await page.locator('.search-box-input').fill('shoes');
await page.locator('.search-box-input').press('Enter');

    

    // Product cards
    const products = page.locator('.product-row.js-product-list');

    while (true) {

        // Check if Nike product is already loaded
        const nikeProduct = products
            .filter({ hasText: 'Nike' })
            .first();

        if (await nikeProduct.count() > 0) {

            console.log('Nike product found');

            await nikeProduct.scrollIntoViewIfNeeded();

            // Product may open a new tab
            const [newPage] = await Promise.all([
                page.waitForEvent('popup'),
                nikeProduct.locator('a').first().click()
            ]);

            await newPage.waitForLoadState('domcontentloaded');

            console.log('Nike URL:', newPage.url());

            break;
        }

        // Nike not found → look for Show More
        const showMore = page.getByRole('button', {
            name: /SHOW.*ITEMS/i
        });

        // If Show More doesn't exist, stop
        if (await showMore.count() === 0) {
            console.log('Nike product not found. No more products.');
            break;
        }

        // Click Show More
        await showMore.click();

        // Wait until additional products are loaded
        await expect(products.last()).toBeVisible();

        console.log('More products loaded');
    }
});
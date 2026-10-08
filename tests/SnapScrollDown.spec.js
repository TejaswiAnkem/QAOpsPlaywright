import {test,expect} from '@playwright/test';

test('snapdeal', async({page}) => {

await page.goto('https://www.snapdeal.com/');
await page.locator('.search-box-input').fill('shoes');
await page.locator('.search-box-input').press('Enter');  // re do you jz copied from gpt


// Product cards
    const products = page.locator('.product-row.js-product-list');

    while (true) {

        // Check whether Nike product is currently loaded
        const nikeProduct = products.filter({
            hasText: 'Nike'
        }).first();

        if (await nikeProduct.count() > 0) {

            // Scroll Nike product into view
            await nikeProduct.scrollIntoViewIfNeeded();

            // Click product - may open new tab
            const [newPage] = await Promise.all([
                page.waitForEvent('popup'),
                nikeProduct.locator('a').first().click()
            ]);

            await newPage.waitForLoadState('domcontentloaded');

            console.log('Nike product URL:', newPage.url());

            break;
        }

        // No Nike product yet → scroll down
        await page.mouse.wheel(0, 1000);

        // Wait for more products to load
        await page.waitForLoadState('domcontentloaded');
    }





})
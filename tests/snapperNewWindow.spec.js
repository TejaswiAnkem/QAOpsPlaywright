import { test, expect } from '@playwright/test';

test('snap E2E', async ({ page }) => {

    await page.goto('https://www.snapdeal.com/');

    // 1. Navigate to Biscuits
    await page.getByText('Beauty & Health', { exact: true }).hover();
    await page.getByText('Biscuits', { exact: true }).click();

    // 2. Sort by Discount
    await page.locator('.sort-drop').click();
    await page.locator('.sort-value li').nth(3).click();

    const products = page.locator('p.product-title');

    // allTextContents() returns an ARRAY
    const productNames = await products.allTextContents();

    const expectedProduct = 'PMW Namkeen 1 kg';
    

    // Search through the array
    for (let i = 0; i < productNames.length; i++) {

        if (productNames[i].trim() === expectedProduct) {

            console.log(`Product found at: ${i + 1}`);

            // Product opens a new window
            const [newPage] = await Promise.all([
                page.context().waitForEvent('page'),
                products.nth(i).click()
            ]);

            await newPage.waitForLoadState('domcontentloaded');

            const productText =
                await newPage.locator('.pdp-e-i-head').textContent();

            console.log("Product:", productText.trim());


            //add cart

            await newPage.locatorocator('.intialtext').filter({hasText: 'add to cart'}).click();
            await newPage.getByText('Proceed To Checkout').click();

            await newPage.getByPlaceholder('Mobile number').fill('9912171774');
            

            break;


        }
    }
});
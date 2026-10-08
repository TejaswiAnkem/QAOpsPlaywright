import { test, expect } from '@playwright/test';

test('snap E2E - click last product', async ({ page }) => {

    await page.goto('https://www.snapdeal.com/');

    // 1. Navigate to Biscuits
    await page.getByText('Beauty & Health', { exact: true }).hover();
    await page.getByText('Biscuits', { exact: true }).click();

    // 2. Verify category
    const categoryName = page.locator('.category-name-wrapper h1');
    const itemCount = page.locator('.category-name-wrapper .category-count');

    console.log((await categoryName.textContent()).trim());
    console.log((await itemCount.textContent()).trim());

    // 3. Sort by Discount
    await page.locator('.sort-selected').click();

    await page
        .locator('.sort-value li')
        .filter({ hasText: 'Discount' })
        .click();

    // 4. Get all currently loaded products
    const products = page.locator('p.product-title');

    let previousCount = 0;
    let stableCount = 0;

    while (stableCount < 3) {

        const currentCount = await products.count();

        console.log("Products loaded:", currentCount);

        if (currentCount === previousCount) {
            stableCount++;
        } else {
            stableCount = 0;
        }

        previousCount = currentCount;

        // Scroll page to load more products
        await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });

        await page.waitForTimeout(2000);
    }

    // 5. Final count
    const finalCount = await products.count();

    console.log("Final product count:", finalCount);

    // 6. Get last product
    // last product

const categoryText = await itemCount.textContent();
const totalItems = Number(categoryText.match(/\d+/)[0]);

console.log("Category total:", totalItems);

let previousCount = 0;
let stableCount = 0;

while (await products.count() < totalItems && stableCount < 3) {

    const currentCount = await products.count();

    console.log("Products loaded:", currentCount);

    if (currentCount === previousCount) {
        stableCount++;
    } else {
        stableCount = 0;
    }

    previousCount = currentCount;

    // Scroll the page, not the last product
    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });

    await page.waitForTimeout(1500);
}

const finalCount = await products.count();

console.log("Final product count:", finalCount);

if (finalCount >= totalItems) {

    const lastProduct = products.nth(totalItems - 1);

    console.log(
        "Last product:",
        (await lastProduct.textContent()).trim()
    );

    await lastProduct.scrollIntoViewIfNeeded();

    await lastProduct.click();

} else {

    console.log(
        `Could not load all products. Loaded ${finalCount} out of ${totalItems}.`
    );
}
});
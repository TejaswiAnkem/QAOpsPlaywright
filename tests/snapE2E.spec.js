import { test, expect } from '@playwright/test';

test('snap E2E', async ({ page }) => {

    await page.goto('https://www.snapdeal.com/');

    // 1. Navigate to Biscuits
    await page.getByText('Beauty & Health', { exact: true }).hover();
    await page.getByText('Biscuits', { exact: true }).click();


    //discount

    await page.locator('.sort-drop').click();
    await page.locator('.sort-value li').nth(3).click();

    // 2. Verify category
    const categoryName = page.locator('.category-name-wrapper h1');// to print 
    const itemCount = page.locator('.category-name-wrapper .category-count');// no.of items

    console.log((await categoryName.textContent()).trim());
    console.log((await itemCount.textContent()).trim());


    const productNames = await page.locator('p.product-title').allTextContents();
productNames.forEach((name, index) => {
    console.log(`${index + 1}. ${name.trim()}`);



});
const productDiscounts =
    await page.locator('.product-discount').allTextContents();

    // 70% converting into number 70
const discountNumbers = productDiscounts.map(product =>
    Number(product.match(/\d+/)[0])
);

const result = discountNumbers.filter(product => product > 70);

console.log("All discounts:", discountNumbers);
console.log("Discounts above 70%:", result);

//scroll load click
const targetProduct = 174;
const products = page.locator('p.product-title');

while (await products.count() < targetProduct) {

    const currentCount = await products.count();

    console.log("Products loaded:", currentCount);

    // Scroll to the last currently loaded product
    await products.last().scrollIntoViewIfNeeded();

    // Give Snapdeal time to load the next 20
    await page.waitForTimeout(1500);

    const newCount = await products.count();

    console.log("After scroll:", newCount);

    // Safety check
    if (newCount === currentCount) {
        console.log("No new products loaded.");
        break;
    }
}

// Check whether product 174 was loaded
const totalProducts = await products.count();

console.log("Final product count:", totalProducts);

if (totalProducts >= targetProduct) {

    // nth() is zero-based
    const target = products.nth(targetProduct - 1);

    console.log(
        "Product 174:",
        (await target.textContent()).trim()
    );

    // Scroll to product 174
    await target.scrollIntoViewIfNeeded();

    // Click product 174
    await target.click();

} else {

    console.log("Product 174 was not loaded.");
}

//last product
//const products = page.locator('p.product-title');

while (await products.count() < 296) {

    const currentCount = await products.count();

    console.log("Products loaded:", currentCount);

    await products.last().scrollIntoViewIfNeeded();

    await page.waitForTimeout(1500);

    const newCount = await products.count();

    if (newCount === currentCount) {
        console.log("No more products loaded.");
        break;
    }
}

 
});
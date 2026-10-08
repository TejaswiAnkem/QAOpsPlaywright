import { test, expect } from '@playwright/test';

test('Dynamic product details', async ({ page }) => {

    await page.goto('https://www.snapdeal.com/');

     await page.locator('.search-box-input').fill('shoes');
await page.locator('.search-box-input').press('Enter');


    // Find Nike product
    const product = page
        .locator('.product-row.js-product-list')
        .filter({ hasText: 'Nike' })
        .first();

    await expect(product).toBeVisible();

    // Product name
    const productName = await product
        .locator('.product-title')
        .textContent();

    // Product price
    const priceText = await product
        .locator('.product-price')
        .textContent();

    // Rating
    const ratingText = await product
        .locator('.product-rating')
        .textContent();

    console.log('Product:', productName);
    console.log('Price:', priceText);
    console.log('Rating:', ratingText);

    // Convert price to number
    const price = Number(
        priceText.replace('Rs.', '').replace(',', '').trim()
    );

    console.log('Price Number:', price);

    // Validate price
    expect(price).toBeGreaterThan(0);
});

//chatgpt 
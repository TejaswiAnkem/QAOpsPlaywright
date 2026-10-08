import { test, expect } from '@playwright/test';

async function selectDiscount(page, discount) {
    await page.locator(`label[for="discount-${discount}"]`).click();
}

test('snapdeal', async ({ page }) => {

    await page.goto('https://www.snapdeal.com/');

    await page.locator('.search-box-input').fill('shoes');
    await page.locator('.search-box-input').press('Enter');

    await selectDiscount(page, '20 - 30');
    
});
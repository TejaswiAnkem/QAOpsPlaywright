import { test, expect } from '@playwright/test';

test('Sauce Demo', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');

    await page.getByRole('button', { name: 'Login' }).click();

    console.log('URL:', page.url());
    console.log('TITLE:', await page.title());

    await expect(page).toHaveURL(/inventory.html/);

    await page.locator('[data-test="item-4-title-link"]').click();//add product
    await page.locator('[data-test="add-to-cart"]').click();//add to cart  button
    await page.locator('.shopping_cart_link').click();//click on cart

    await expect(
    page.getByText('Sauce Labs Backpack')
).toBeVisible();

await page.locator('#checkout').click();
await page.getByPlaceholder('First Name').fill('Tejaswi');
await page.locator('#last-name').fill('Surya');
await page.locator('#postal-code').fill('500081');
await page.locator('.cart_button').click();

await expect(page.locator('.inventory_item_name')).toBeVisible();
await expect(page.locator('.inventory_item_price')).toHaveText('$29.99');

await expect(page.getByRole('button', { name: 'Finish' })).toBeVisible();

await page.getByRole('button', { name: 'Finish' }).click();

await expect(page.getByText('Thank you for your order!')).toBeVisible();


});
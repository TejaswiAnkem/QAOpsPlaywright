import { test, expect } from '@playwright/test';

test('Sauce Multiple Products', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');

    await page.getByRole('button', { name: 'Login' }).click();

    const products = ['Sauce Labs Backpack','Sauce Labs Bike Light','Sauce Labs Bolt T-Shirt'];
for (const product of products) {
    const productCard = page.locator('.inventory_item')
        .filter({ hasText: product });

    await productCard
        .getByRole('button', { name: 'Add to cart' })
        .click();
}

// Cart count
const cartCount = page.locator('.shopping_cart_badge');

console.log("Expected products:", products.length);

await expect(cartCount).toHaveText(products.length.toString());

await page.locator('.shopping_cart_link').click();//click cart

for (const product of products) {
    console.log(product);
    await expect(
        page.getByRole('button', {
            name: `View details for ${product}`
        })
    ).toBeVisible(); //wrote by taking role and locator to check contains in that page
}

//remove product from cart
const productToRemove = 'Sauce Labs Bike Light';

for(const product of products) {
    if (product === productToRemove) {
        const productCard = page.locator('.cart_item')
            .filter({ hasText: product });

    }
}

    



     


})
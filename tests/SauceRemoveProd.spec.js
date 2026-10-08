import { test, expect } from '@playwright/test';

test('Sauce Multiple Products', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    const products = [
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt'
    ];

    // Add each product to the cart
    for (const name of products) {
        const productCard = page.locator('.inventory_item').filter({ hasText: name });
        await productCard.getByRole('button', { name: 'Add to cart' }).click();
    }

    // Verify cart count
    const cartCount = page.locator('.shopping_cart_badge');
    await expect(cartCount).toHaveText(products.length.toString());

    // Go to cart
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/cart\.html/);

    // Verify each product
    for (const name of products) {

    const cartItem = page.locator('.cart_item').filter({ hasText: name });

    await expect(cartItem).toBeVisible();
   }

   // remove product from cart
const productToRemove = 'Sauce Labs Bike Light';

const cartItem = page.locator('.cart_item').filter({ hasText: productToRemove });
await cartItem.getByRole('button', { name: 'Remove' }).click();

// verify it's gone
await expect(
    page.locator('.cart_item').filter({ hasText: productToRemove })
).toHaveCount(0);

console.log(`${productToRemove} removed successfully`);

// badge should decrement
await expect(cartCount).toHaveText((products.length - 1).toString());

const count = await cartCount.textContent();
console.log('Cart count:', Number(count));
});
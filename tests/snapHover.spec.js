import { test, expect } from '@playwright/test';


test('hover', async({page}) =>{

    await page.goto('https://www.snapdeal.com/');
const category = page.getByText("Men's Fashion", { exact: true });

await category.hover();

const subProduct = page.getByText("Jeans", {exact:true});
await subProduct.click();

expect(page.locator('h1', {hasText:"Jeans For Men"})).toBeVisible();
})
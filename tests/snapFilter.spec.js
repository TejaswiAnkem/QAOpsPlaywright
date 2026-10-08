import {test,expect} from '@playwright/test';

test('snapdeal', async({page}) => {

await page.goto('https://www.snapdeal.com/');
await page.locator('.search-box-input').fill('shoes');
await page.locator('.search-box-input').press('Enter');

await page.locator('input[name="fromVal"]').fill('500');
await page.locator('input[name="toVal"]').fill('1000');

await page.locator('.price-go-arrow').click();

const shoeProducts = page.locator('.lfloat product-price')// 500-1000
const count = await shoeProducts.count();


const prices = [];

for (let i = 0; i < count; i++) {

    const shoeRange = shoeProducts.nth(i);

    const price = await shoeRange.textContent();

    prices.push(price);
}

console.log("shoePrices:", prices);

const shoePricesNUm = prices.map(x=>Number(x.replace('Rs.', '').trim()));
console.log('shoePricesNUm:', shoePricesNUm);

const allNumeric = shoePricesNUm.every(price => typeof price === 'number');

console.log(allNumeric);
})
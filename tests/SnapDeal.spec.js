import {test,expect} from '@playwright/test';

test('snapdeal', async({page}) => {

await page.goto('https://www.snapdeal.com/');
await page.locator('.search-box-input').fill('shoes');
await page.locator('.search-box-input').press('Enter');
await expect(page.locator('.search-result-txt-section').getByText("We've got 10000+ results for shoes")).toBeVisible();
const products=await page.locator('#products').allTextContents();
const hasshoes=products.some(products=>products.toLowerCase().includes('shoes'));
console.log("hasshoes :", hasshoes);









})
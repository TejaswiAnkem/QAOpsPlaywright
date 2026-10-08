import {test,expect} from '@playwright/test';

test('snapDynamivSearch', async ({page}) =>{

await page.goto('https://www.snapdeal.com/');
await page.locator('.search-box-input').fill('watch');
await page.locator('.search-box-input').press('Enter');

const products =page.locator('.product-row.js-product-list');
//const count = await products.count();
    products.filter({hasText: 'QitmirMKT Rose Gold Metal Digital Womens Watch'});


    const [newPage] = await Promise.all([
    page.waitForEvent('popup'),
    products.locator('a').first().click()
]);

await newPage.waitForLoadState('domcontentloaded');
console.log('New tab URL:', newPage.url());

await expect(newPage.locator('.pdp-e-i-head'))
    .toHaveText('QitmirMKT Rose Gold Metal Digital Womens Watch');

    //price

    const sellingPrice= newPage.locator('.pdp-final-price');
    await expect(sellingPrice).toBeVisible();

    const priceTextsp = await sellingPrice.textContent();

console.log('SPPrice:', priceTextsp);
const spNum = Number(priceTextsp.replace('Rs.','').trim());
console.log(spNum);

//selling price < mrp



const mrp = newPage.locator('.pdpCutPrice');
const mrpText = await mrp.textContent();
console.log('MrpPrice:', mrpText);
const mrpNum = Number(mrpText.match(/\d+/)[0]);
expect(spNum).toBeLessThan(mrpNum);







 











})





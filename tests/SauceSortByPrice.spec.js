import{test,expect} from '@playwright/test';

test('sort by price', async({page}) =>{
await page.goto('https://www.saucedemo.com/');

    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Products').first()).toHaveText('Products');

    const dropDown=page.locator('.product_sort_container');
    await dropDown.selectOption('lohi');

    const prices =await page.locator('.inventory_item_price').allTextContents();

    const priceValues = prices.map(prices=>Number(prices.replace('$','')));
    console.log('Price Values:', priceValues);

   const sortedPrices = [...priceValues].sort((a,b)=> a-b);
    console.log('Sorted Prices:', sortedPrices);

    expect(priceValues).toEqual(sortedPrices);

    const products = await page.locator('.inventory_item_name').allTextContents();
    expect(products[0]).toBe('Sauce Labs Onesie');
    


})
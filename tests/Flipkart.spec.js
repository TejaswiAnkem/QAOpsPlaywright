import {test,expect} from '@playwright/test';

test('E2E', async ({page})=>{

    await page.goto('https://www.flipkart.com');
    await page.locator('text=✕').click();
    await page.waitForLoadState('networkidle');
    await page.locator('input[name="q"]').first().fill('womens clothing');    
    await page.keyboard.press('Enter');
    const products = page.locator('a.atJtCj');
    await products.first().waitFor();

    const count = await products.count();
    console.log("count is:", count);
    const productNames = await products.allTextContents();
    for(const product of productNames){
    console.log(product);
    }
}


)

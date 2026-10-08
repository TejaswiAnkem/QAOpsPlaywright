import {test,expect} from '@playwright/test';

test('security test intercept', async ({ page }) => {
    const email = "suryatejaswi03@gmail.com";
    const password = "Aircooler@98";
    const products = page.locator(".card-body");
    const productName = "iphone 13 pro";

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill(password);
    await page.locator("[type='submit']").click();
    await page.waitForLoadState('networkidle'); //network loading
    await page.locator(".card-body b").first().waitFor();//


    const count = await products.count();

    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            await products.nth(i).locator("text= Add To Cart").click();
            break;

        }
    }
    await page.locator("[routerlink ='/dashboard/cart']").click();
    //request id changes everytime so replacee with *
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/7778888888888' })
    )
    await page.locator("button: has-text('View')").first.click();
    await page.pause();


})
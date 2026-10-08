import { test, expect, request } from '@playwright/test';
import { APIUtils } from '../Utilities/APIUtils.js';

const loginPayLoad = {
    userEmail: "suryatejaswi03@gmail.com",
    userPassword: "Aircooler@98"
};

const orderPayLoad = {
    orders: [
        {
            country: "India",
            productOrderedId: "6960eae1c941646b7a8b3ed3"
        }
    ]
};

let response;

test.beforeAll(async () => {

    const apiContext = await request.newContext();

    const apiUtils = new APIUtils(apiContext,loginPayLoad);

    response = await apiUtils.createOrder(orderPayLoad);

});
 
 
//create order is success
test('@API Place the order', async ({page})=>
{ 
    await page.addInitScript(value => {
 
        window.localStorage.setItem('token',value);
    }, response.token );
await page.goto("https://rahulshettyacademy.com/client");
 await page.locator("button[routerlink*='myorders']").click();
 await page.locator("tbody").waitFor();
const rows = await page.locator("tbody tr");
 
 
for(let i =0; i<await rows.count(); ++i)
{
   const rowOrderId =await rows.nth(i).locator("th").textContent();
   if (response.orderId.includes(rowOrderId))
   {
       await rows.nth(i).locator("button").first().click();
       break;
   }
}
const orderIdDetails =await page.locator(".col-text").textContent();
//await page.pause();
expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
 
});
 
//Verify if order created is showing in history page
// Precondition - create order 

//to login fast and by pass login then use the token to login to the application and verify the order is created and showing in history page.
//also to bypass cart page and checkout page, we can directly create order using API and verify the order is created and showing in history page.
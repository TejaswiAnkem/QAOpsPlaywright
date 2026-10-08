import { test, expect, request } from '@playwright/test';
import { APIUtils } from '../Utilities/APIUtils.js';

const fakePayLoadOrders = { data: [], message: 'No Orders' };
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

    const apiUtils = new APIUtils(
        apiContext,
        loginPayLoad
    );

    response = await apiUtils.createOrder(orderPayLoad);

});

test('Create Order', async ({ page }) => {

    await page.addInitScript(token => {
        window.localStorage.setItem('token', token);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
        async route=>
            {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoadOrders); 
              route.fulfill(
                {
                    response,
                    body
                });
               // intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
            }
        );
    
    await page.locator("button[routerlink='/dashboard/myorders']").click();

    await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*')
            await page.pause();
});
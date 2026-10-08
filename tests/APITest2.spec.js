import {test,expect,request} from '@playwright/test';
let webcontext; //let → declared outside, so the test can access it later.
test.beforeAll(async ({browser})=>{
    
    const context = await browser.newContext();
    const page = await context.newPage();//Creates a page inside that context.

//You use this page to login.

//After login, you save the login state: this is 15 lines of code to login and save the state, you can use this state in other tests to avoid logging in multiple times.
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("suryatejaswi03@gmail.com");
    await page.locator("#userPassword").fill("Aircooler@98");
    await page.locator("[type='submit']").click();
    await page.waitForLoadState('networkidle'); //network loading
    await context.storageState({path: 'state.json'});
    webcontext = await browser.newContext({storageState: 'state.json'}) //Creates another context, but this time it loads the saved login state.

})
//context = temporary context used for login → webcontext = new context created using the saved login state.

test('AllTextContents',async ( {} ) => {
    const page = await webcontext.newPage();//Create a new page inside the already-authenticated webcontext.
    await page.goto("https://rahulshettyacademy.com/client");

    const products = page.locator(".card-body");
   // wait page.locator(".card-body b").first().waitFor();//
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles);

     }
   
);

// login one time and use the same login state for all tests, to avoid logging in multiple times, we can use storageState to save the login state and reuse it in other tests.
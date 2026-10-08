
import {test,expect} from '@playwright/test';

test('AllTextContents',async ( {page} ) => {


    const email = "suryatejaswi03@gmail.com";
    const password = "Aircooler@98";
    //const products = page.locator(".card-body b");
   

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill(password);
    await page.locator("[type='submit']").click();




  await page.waitForLoadState('networkidle'); //network loading
   await page.locator(".card-body b").first().waitFor();//
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles);
   
   
 }

);


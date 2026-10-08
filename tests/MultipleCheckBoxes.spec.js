import {test,expect} from '@playwright/test';

test('Multiple checkboxes', async ({page}) =>
{

    await page.goto('https://testautomationpractice.blogspot.com/')

    const locators =[
        "//input[@id='sunday']" , "//input[@id='monday'] ", "//input[@id='tuesday']"
    ]
 
    for (const locator of locators){
    await page.waitForTimeout(5000)

   await page.locator(locator).check()
    }

    for(const locator of locators){

        await page.locator(locator).isChecked()
         
        await page.waitForTimeout(1000)
        await page.locator(locator).uncheck()
    }


})
import {test,expect} from '@playwright/test';

test('Dropdown', async ({page}) =>{

    page.goto('https://testautomationpractice.blogspot.com/')

    await page.locator('#country').selectOption({label:'India'}); //by label

    await page.locator('#country').selectOption({label:'India'}); //by label
    await page.locator('#country').selectOption('India'); // visible text
    await page.locator('#country').selectOption({Value:'UK'}); //by value
    await page.locator('#country').selectOption({index:1}); //by index

    page.locator('#country', 'India'); //by id and then passing value directly





    await page.waitForTimeout(5000);




})
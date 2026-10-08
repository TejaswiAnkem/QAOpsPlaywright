import {test,expect} from '@playwright/test';

test('Locate all elements', async ({page})=> {

    await page.goto('https://demoblaze.com/');

   await expect(page).toHaveTitle('STORE')

   const elements = await page.$$()





} )
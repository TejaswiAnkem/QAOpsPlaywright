
import {test,expect} from '@playwright/test';

test('homepage1', async ({page}) =>{

    await page.goto('https://demoblaze.com/')

   const title = await page.title()
    console.log(title)

    await expect(page).toHaveTitle('STORE')

    const url = await page.url()
    console.log(url)
     
    await expect(page).toHaveURL('https://demoblaze.com/')
 

})
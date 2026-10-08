import { test, expect } from '@playwright/test';

test('Login', async ({ page }) => {
    
    await page.goto('https://demoblaze.com/')
    //property
    await page.click('id=login2')

    //css
    await page.fill('#loginusername', 'pavanol')
    console.log('un entered')

    await page.fill('#loginpassword', 'test@123')
    console.log('pswd entered')
   // await page.getByText('Log in').click()

   //xpath
   await page.click("//button[normalize-space()='Log in']")


}
)
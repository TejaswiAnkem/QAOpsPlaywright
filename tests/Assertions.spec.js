import {test,expect} from '@playwright/test';

test('Assertions', async ({page}) =>{

await page.goto("https://demoblaze.com/index.html")

// await expect(page).toHaveURL("https://demoblaze.com/index.htmla")
// await expect(page.locator('.navbar-brand')).toBeVisible()

//soft
await expect.soft(page).toHaveTitle('STOREs')
await expect(page).toHaveURL("https://demoblaze.com/index.html")
console.log('url validation passed')
await expect(page.locator('.navbar-brand')).toBeVisible()
console.log('this validation passed')



})
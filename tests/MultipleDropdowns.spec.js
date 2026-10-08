import {test,expect} from '@playwright/test';

test('multiple dropdown', async ({page}) =>{

    await page.goto('https://testautomationpractice.blogspot.com/')

await page.locator('#colors', ['Blue', 'yellow', 'Red'])

await page.waitForTimeout(5000)

//check no.of options in dropdown

const options = await page.locator('#country option')
console.log(await options.count())
await expect(options).toHaveCount(10)


const optionsclrs = await page.locator('#colors option')
console.log(await options.count())
await expect(optionsclrs).toHaveCount(7)

const optionsclrs1 = await page.$$('#colors option') //$$ returns options in the form of array
console.log("Count of colors:", optionsclrs1.length)

})
import {test,expect} from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test('Hide',async( {page} )=>{

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    // await page.goto('https://www.google.com/');
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
    page.on("dialog",dialog => dialog.accept());
    await page.locator('#confirmbtn').click();
    await page.locator('#mousehover').hover();
    const framePage = page.frameLocator('#courses-iframe');
    await framePage.locator('li a[href*="lifetime-access"]:visible').click();
    const textCheck = await framePage.locator('.text h2').textContent();
    console.log(textCheck.split(" ")[1]);
    
})

test("screenshot", async({page})=>{

await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
const textBox = page.locator('#displayed-text');

  await expect(textBox).toBeVisible();
  await textBox.screenshot({ path: 'partialScreenshot.png' });
    await page.locator('#hide-textbox').click();
    await page.screenshot({path: 'screenshot.png'});
    await expect(page.locator('#displayed-text')).toBeHidden();

    
}

)

// test.only('visual', async({page})=>{
//     await page.goto("https://flightware.com/");
//     expect(await page.screenshot()).toMatchSnapshot('landing.png');
// })
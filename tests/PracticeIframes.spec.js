import {test} from '@playwright/test'

test('Iframes', async({page}) =>{

    await page.goto('https://playground.qajourney.net/iframes/?utm_source=chatgpt.com')
    const frame = page.frameLocator('[data-testid="form-iframe"]');
    await frame.locator('[data-testid="iframe-input"]').fill('hello');
    await frame.getByRole('button', {name:'SUBMIT IN FRAME'}).click()

})

test.only('Iframe2', async({page}) =>{

    await page.goto('https://the-internet.herokuapp.com/nested_frames')
    const parentFrame = page.frameLocator('frame[name="frame-top"]');

    const middleFrame =
        parentFrame.frameLocator('frame[name="frame-middle"]');

       const text = await middleFrame.locator('body').textContent();
       console.log(text)
   }
)

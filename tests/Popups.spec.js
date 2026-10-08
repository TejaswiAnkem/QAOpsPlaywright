import {test} from '@playwright/test'

test('Popups', async({page}) =>
{
await page.goto('https://the-internet.herokuapp.com/javascript_alerts?utm_source=chatgpt.com')


page.on('dialog', async dialog =>{
await dialog.accept();
})
    await page.getByRole('button', { name: 'Click for JS Alert' }).click();


    page.removeAllListeners('dialog');
    
page.on('dialog', async dialog =>{
await dialog.dismiss();
})

await page.getByRole('button',{name: 'Click for JS Confirm'}).click();

})
import { test, expect } from '@playwright/test';

test('AutoSugg', async({page}) =>{
    await page.goto('https://www.snapdeal.com/');

    const searchBox = page.locator('.search-box-input')
   .pressSequentially('plaz');

   await page.locator('.HeaderStyle__AutoSuggestionsEle-sc-dc90d7cb-13.loWdqC').nth(1).click();
   await expect(page.locator('.search-result-txt-section.marT12').filter({hastext:"We've got 550 results for plazzzo pants"})).toBeVisible();

    




}
)
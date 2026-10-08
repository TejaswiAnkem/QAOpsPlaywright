import { test, expect } from '@playwright/test';

test('Invalid Login', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secsauce');

        await page.getByRole('button', { name: 'Login' }).click();


    await expect(page.locator('[role="alert"]'))
    .toContainText('Epic sadface: Username and password do not match any user in this service');

})

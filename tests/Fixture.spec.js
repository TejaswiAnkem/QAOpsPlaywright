import { test as base } from '@playwright/test';

export const test = base.extend({

    appPage: async ({ page }, use) => {

        await page.goto('https://www.saucedemo.com/');

        await use(page);
    }
});

export { expect } from '@playwright/test';
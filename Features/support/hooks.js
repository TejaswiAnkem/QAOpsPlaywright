
import {chromium} from '@playwright/test';
import { POManager } from '../../pageObjects/POManager.js';
import { Before, After, BeforeStep, AfterStep } from '@cucumber/cucumber';

Before(async function() {
    this.browser = await chromium.launch({
            headless: false
        });

        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();

        this.poManager = new POManager(this.page);


});

After(async function() {
    console.log("Closing the browser");
});

AfterStep(async function(scenario) {
    if (scenario.result.status === 'FAILED') {
        const screenshot = await this.page.screenshot({ path: `screenshots.png` });
    }
    })
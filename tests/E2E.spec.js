import {test,expect} from '@playwright/test';

test('AllTextContents', async ({ page }) => {

    const email = "suryatejaswi03@gmail.com"
    const password = "Aircooler@98";
    const products = page.locator(".card-body");
    const productName = "iphone 13 pro";

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill(password);
    await page.locator("[type='submit']").click();




    await page.waitForLoadState('networkidle'); //network loading
    await page.locator(".card-body b").first().waitFor();//


    const count = await products.count();

    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            await products.nth(i).locator("text= Add To Cart").click();
            break;

        }
    }
    await page.locator("[routerlink ='/dashboard/cart']").click();
    await page.locator("div li").first().waitFor();

    const boolean = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
    expect(boolean).toBeTruthy;
    await page.locator("text=Checkout").click();


    await page.locator("input.input.txt").nth(1).fill("234");
    await page.locator("input.input.txt").nth(2).fill("Surya Tejaswi");


    await page.locator("[placeholder='Select Country']").pressSequentially("ind");
    const dropdown = page.locator("section.ta-results");
    await dropdown.waitFor();

    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; i++) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text == " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    await page.locator("text=Place Order").click();

    const orderIdLocator = page.locator("td.em-spacer-1 label").last();

    await expect(orderIdLocator).toBeVisible();



    const orderId = await orderIdLocator.textContent();
    const cleanedOrderId = orderId.replace(/\|/g, "").trim();

    console.log(cleanedOrderId);

    // goto orders and and find the order id and click on view and assert any thing

    const orders = await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");


    for (let i = 0; i < await rows.count(); i++) {

        const rowOrderId = await rows.nth(i).locator("th").textContent();

        if (cleanedOrderId.includes(rowOrderId.trim())) {

            for (let i = 0; i < await rows.count(); i++) {

                const rowOrderId = await rows.nth(i).locator("th").textContent();

                if (cleanedOrderId.includes(rowOrderId.trim())) {

                    await rows.nth(i)
                        .getByRole('button', { name: 'View' })
                        .click();

                    break;
                }
            }
        }
    }


    await page.locator("div.col-text").waitFor();

    const SummaryOrderId =
        (await page.locator("div.col-text").textContent()).trim();

    expect(cleanedOrderId).toBe(SummaryOrderId);

});
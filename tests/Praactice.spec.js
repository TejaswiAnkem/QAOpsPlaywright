import { test, expect } from "@playwright/test";
 
test("Practice playwright", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/locatorspractice/");
 
  await page.getByPlaceholder("Username").fill("suryatejaswi03@gmail.com");
  await page.getByPlaceholder("Password").fill("rahulshettyacademy");
 
  await page.getByRole("button", { name: "Sign In" }).click();
 
  const message = await page.locator("h2").innerText();
  console.log(message);
});

test.only("practice", async ({ browser }) => {

    const context = await browser.newContext({
        ignoreHTTPSErrors: true
    });
   
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    console.log(await page.title());

    await page.locator("input[value='radio1']").check();

    await page.getByPlaceholder("Type to Select Countries").fill("Surya");

    await page.getByRole("combobox").selectOption("option3");

    // New window
    const [newPage] = await Promise.all([
        context.waitForEvent("page"),
        page.getByRole("button", { name: "Open Window" }).click()
    ]);

await newPage.waitForLoadState("domcontentloaded");
      // NOW newPage exists, so check it
    console.log("New page URL:", newPage.url());
    console.log("New page title:", await newPage.title());
    console.log("Closed:", newPage.isClosed());

    const text = await newPage.locator(".button.float-left").textContent();

    console.log(text);

    // New tab
    await page.locator("#opentab").click();

    // Dialog
    page.on("dialog", async dialog => {
        console.log(dialog.message());
        await dialog.dismiss();
    });

    await page.locator("#confirmbtn").click();

    // Mouse hover
    await page.getByRole("button", { name: "Mouse Hover" }).hover();

    await page.getByRole("link", { name: "Top" }).click();

    // Table
    const headers = await page
        .locator("#product thead th")
        .allTextContents();

    const rows = page.locator("#product tbody tr");
    const rowCount = await rows.count();

    const tableData = [];

    for (let i = 0; i < rowCount; i++) {

        const values = await rows
            .nth(i)
            .locator("td")
            .allTextContents();

        const rowObject = {};

        headers.forEach((header, index) => {
            rowObject[header.trim()] = values[index]?.trim() || "";
        });

        tableData.push(rowObject);
    }

    console.log(tableData);

    await context.close();
});





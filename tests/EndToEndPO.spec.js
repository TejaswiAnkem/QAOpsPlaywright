import { test, expect } from '@playwright/test';
import { POManager } from '../pageObjects/POManager.js';
import dataSet from '../Utilities/PlaceOrder.json' assert { type: 'json' };

for (const data of dataSet) {
test(`@new E2E Scenario - ${data.productName}`, async ({ page }) => {
    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    const dashBoard = poManager.getDashBoard();
    const cartPage = poManager.getCartPage();
    const checkoutPage = poManager.getCheckoutPage();
    const ordersPage = poManager.getOrdersPage();

    

    // Login
    await loginPage.goTo();
    await loginPage.Validlogin(data.email, data.password);

    // Dashboard
    await dashBoard.searchProduct(data.productName);
    await dashBoard.navigateToCart();

    // Cart
    await cartPage.verifyProductDisplay(data.productName);
    await cartPage.navigateToCheckout();

    // Checkout
    await checkoutPage.fillCountry(
        "234",
        "Surya Tejaswi",
        "ind",
        "India"
    );

    await checkoutPage.placeOrder();

    // Get Order ID
    const orderId = await checkoutPage.getOrderId();

    console.log(orderId);

    // Orders
    await ordersPage.goToOrders();
    await ordersPage.viewOrder(orderId);

    const summaryOrderId = await ordersPage.getSummaryOrderId();

    expect(orderId).toBe(summaryOrderId);
});
}

//create .js and keep the data as object in the file and export it. Then import it here and use it in the test. This way we can run the same test with different data sets.
//make own fixture and use it in the test. This way we can run the same test with different data sets.
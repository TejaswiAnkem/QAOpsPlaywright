import {Given,When,Then,setDefaultTimeout} from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { POManager } from '../../pageObjects/POManager.js';
setDefaultTimeout(120 * 1000);

Given(
    'login to the ecommerce website {string} and {string}',
    async function (email, password) {

        

        this.loginPage = this.poManager.getLoginPage();
        this.dashBoard = this.poManager.getDashBoard();
        this.cartPage = this.poManager.getCartPage();
        this.checkoutPage = this.poManager.getCheckoutPage();
        this.ordersPage = this.poManager.getOrdersPage();

        await this.loginPage.goTo();

        await this.loginPage.Validlogin(email, password);
    }
);


When(
    'the user places an order {string}',
    async function (productName) {

        // Dashboard
        await this.dashBoard.searchProduct(productName);
        await this.dashBoard.navigateToCart();
    }
);


Then(
    'verify {string} is displayed in the cart',
    async function (productName) {

        // Cart
        await this.cartPage.verifyProductDisplay(productName);
        await this.cartPage.navigateToCheckout();
    }
);


When(
    'entered valid details and place the order',
    async function () {

        // Checkout
        await this.checkoutPage.fillCountry(
            "234",
            "Surya Tejaswi",
            "ind",
            "India"
        );

        await this.checkoutPage.placeOrder();

        // Get Order ID
        this.orderId = await this.checkoutPage.getOrderId();

        console.log("Order ID:", this.orderId);
    }
);


Then(
    'verify the order is placed in orders place',
    async function () {

        // Orders
        await this.ordersPage.goToOrders();

        await this.ordersPage.viewOrder(this.orderId);

        const summaryOrderId =
            await this.ordersPage.getSummaryOrderId();

        expect(this.orderId).toBe(summaryOrderId);

        // Close browser
        await this.browser.close();
    }
);
import { LoginPage } from './LoginPage.js';
import { DashBoard } from './DashBoard.js';
import { CartPage } from './CartPage.js';
import { CheckoutPage } from './CheckOutPage.js';
import { OrdersPage } from './OrdersPage.js';

export class POManager {

    constructor(page) {

        this.page = page;

        this.loginPage = new LoginPage(this.page);
        this.dashBoard = new DashBoard(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
        this.ordersPage = new OrdersPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashBoard() {
        return this.dashBoard;
    }

    getCartPage() {
        return this.cartPage;
    }

    getCheckoutPage() {
        return this.checkoutPage;
    }

    getOrdersPage() {
        return this.ordersPage;
    }
}
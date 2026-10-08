class CartPage {

    constructor(page) {

        this.page = page;

        this.cartProduct = page.locator("h3");
        this.checkoutButton = page.locator("text=Checkout");
    }

    async verifyProductDisplay(productName) {

        await this.page
            .locator(`h3:has-text('${productName}')`)
            .waitFor();
    }

    async navigateToCheckout() {

        await this.checkoutButton.click();
    }
}

export { CartPage };
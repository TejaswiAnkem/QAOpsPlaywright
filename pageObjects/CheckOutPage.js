class CheckoutPage {

    constructor(page) {

        this.page = page;

        this.cvv = page.locator("input.input.txt").nth(1);
        this.nameOnCard = page.locator("input.input.txt").nth(2);

        this.countryInput =
            page.locator("[placeholder='Select Country']");

        this.countryDropdown =
            page.locator("section.ta-results");

        this.placeOrderButton =
            page.locator("text=Place Order");

        this.orderIdLocator =
            page.locator("td.em-spacer-1 label").last();
    }

    async fillCountry(cvv, name, country, countryName) {

        await this.cvv.fill(cvv);

        await this.nameOnCard.fill(name);

        await this.countryInput.pressSequentially(country);

        await this.countryDropdown.waitFor();

        const optionsCount =
            await this.countryDropdown.locator("button").count();

        for (let i = 0; i < optionsCount; i++) {

            const text =
                await this.countryDropdown
                    .locator("button")
                    .nth(i)
                    .textContent();

            if (text.trim() === countryName) {

                await this.countryDropdown
                    .locator("button")
                    .nth(i)
                    .click();

                break;
            }
        }
    }

    async placeOrder() {

        await this.placeOrderButton.click();
    }

    async getOrderId() {

        await this.orderIdLocator.waitFor();

        const orderId =
            await this.orderIdLocator.textContent();

        return orderId.replace(/\|/g, "").trim();
    }
}

export { CheckoutPage };
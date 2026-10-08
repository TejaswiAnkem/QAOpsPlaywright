class OrdersPage {

    constructor(page) {

        this.page = page;

        this.ordersButton =
            page.locator("button[routerlink='/dashboard/myorders']");

        this.rows =
            page.locator("tbody tr");

        this.orderSummaryId =
            page.locator("div.col-text");
    }

    async goToOrders() {

        await this.ordersButton.click();

        await this.rows.first().waitFor();
    }

    async viewOrder(orderId) {

        const rowCount = await this.rows.count();

        for (let i = 0; i < rowCount; i++) {

            const rowOrderId =
                await this.rows.nth(i)
                    .locator("th")
                    .textContent();

            if (orderId.includes(rowOrderId.trim())) {

                await this.rows.nth(i)
                    .getByRole('button', { name: 'View' })
                    .click();

                break;
            }
        }
    }

    async getSummaryOrderId() {

        await this.orderSummaryId.waitFor();

        return (
            await this.orderSummaryId.textContent()
        ).trim();
    }
}

export { OrdersPage };
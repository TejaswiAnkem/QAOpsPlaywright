class DashBoard {

    constructor(page)  {
        
        this.page   = page;
        this.products = page.locator(".card-body");
        this.cartButton = page.locator("[routerlink ='/dashboard/cart']");
      }

      async searchProduct(productName){


        const count = await this.products.count();

    for (let i = 0; i < count; i++) {
        if (await this.products.nth(i).locator("b").textContent() === productName) {
            await this.products.nth(i).locator("text= Add To Cart").click();
            break;

        }
    }
    } 

    async navigateToCart(){
        await this.cartButton.click();
       await this.page.locator("div li").first().waitFor();

    }

}

export { DashBoard };
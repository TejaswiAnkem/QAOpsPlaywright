class LoginPage {

    constructor(page) {
        // locators
        this.page = page;
        this.email = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.signInbutton = page.locator("[type='submit']");
    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    // actions
    async Validlogin(email, password) {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.signInbutton.click();

        await this.page.waitForLoadState('networkidle');
    }
}

export { LoginPage };
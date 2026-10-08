
class APIUtils {

    constructor(apiContext, loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken() {

        const loginResponse = await this.apiContext.post(
            'https://rahulshettyacademy.com/api/ecom/auth/login',
            {
                data: this.loginPayLoad
            }
        );

        const loginResponseJson = await loginResponse.json();

        const token = loginResponseJson.token;

        console.log("Token:", token);

        return token;
    }

    async createOrder(orderPayLoad) {

        const response = {};//created empty obj to store token and orderid into response, hence return response will return both

        const token = await this.getToken();

        response.token = token;

        const orderResponse = await this.apiContext.post(
            'https://rahulshettyacademy.com/api/ecom/order/create-order',
            {
                data: orderPayLoad,
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json'
                }
            }
        );

        const orderResponseJson = await orderResponse.json();

        response.orderId = orderResponseJson.orders[0];
        //response.orderId = orderId;
        console.log("API Status:", orderResponse.status());
console.log("API Response:", orderResponseJson);

        return response;
          
    }
}

export { APIUtils };
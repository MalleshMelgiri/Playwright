const { test, expect, request } = require('@playwright/test');
const { ApiUtil } = require('./utils/ApiUtil');
let token;
let utilObject;
const payload = { userEmail: "dxltestmails@gmail.com", userPassword: "Monday12@" };
const orderPAyload = { orders: [{ country: "India", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] }
test.beforeAll(async () => {

    const api = await request.newContext();
    // const call= await api.post('https://rahulshettyacademy.com/api/ecom/auth/login',
    //     {data:payload}
    // )

    // expect(call.ok).toBeTruthy();
    // console.log(call);
    // const responsedata= await call.json();
    utilObject = new ApiUtil(api, payload);
    token = await utilObject.GetToken();
    console.log(token);
});

test('api call test', async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, token);
    const products = page.locator('#products h5');

    await page.goto('https://rahulshettyacademy.com/client');
    await page.waitForLoadState('networkidle');
    console.log(await products.allTextContents());
});

test('order with api call', async ({ page }) => {
    //  const context = await request.newContext();

    // const apiCall = await context.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
    //   data: orderPAyload,
    //   headers: {
    //     'Authorization': token,
    //     'Content-Type': 'application/json'
    //   }
    // });

    // // Correct method to check if request succeeded
    // expect(apiCall.ok()).toBeTruthy(); 

    // const responseData = await apiCall.json();
    const responseData = await utilObject.CreateOrder(orderPAyload);
    const orderId = responseData.orderId;

    console.log('Order ID:', orderId);
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, token
    );
    await page.goto('https://rahulshettyacademy.com/client');
    await page.waitForLoadState('networkidle');
    await page.locator('[routerlink="/dashboard/myorders"][style*="margin-top"]').click();
    const orderList = page.locator('.ng-star-inserted th[scope="row"]');
    await orderList.nth(0).waitFor();
    for (let orderIndex = 0; orderIndex < await orderList.count(); orderIndex++) {
        console.log(await orderList.nth(orderIndex).textContent());
        if (await orderList.nth(orderIndex).textContent() === orderId) {
            await orderList.locator('~td>button[tabindex]').nth(orderIndex).click();
            break;
        }
    }

    expect(await page.locator('div.col-text').textContent()).toBe(orderId);
}
);
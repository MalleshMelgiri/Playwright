const {test, expect}=require('@playwright/test');
let webcontext;

test.beforeAll(async ({browser})=>{
const context= await browser.newContext();
const page=await context.newPage();
await page.goto('https://test.raptortech.com/');
   console.log(await page.title());
   await expect(page).toHaveTitle('Login')
   await page.locator('#Username').fill('Mobileda00@raptor.com');
   await page.locator('#showPassword > button').click();
   await page.locator('#Password').fill("Monday");
   await page.locator('#login-btn').click();
   await page.waitForLoadState('networkidle');
   await page.locator('.product-tile').nth(0).click();
   await context.storageState({path:'loginsession.json'});
   webcontext=await browser.newContext({storageState:'loginsession.json'});
    
});

test('tests with default browser context', async function () {
     
    const page= await webcontext.newPage();
   await page.goto('https://test.raptortech.com/');
//    console.log(await page.title());
//    await expect(page).toHaveTitle('Login')
//    await page.locator('#Username').fill('Mobileda00@raptor.com');
//    await page.locator('#showPassword > button').click();
//    await page.locator('#Password').fill("Monday12!");
//    await page.locator('#login-btn').click();
   console.log(await page.title());
   await expect(page).toHaveTitle('The Raptor System');
});

test('tests-2 with default browser context', async function () {
     
    const page= await webcontext.newPage();
   await page.goto('https://test.raptortech.com/');
//    console.log(await page.title());
//    await expect(page).toHaveTitle('Login')
//    await page.locator('#Username').fill('Mobileda00@raptor.com');
//    await page.locator('#showPassword > button').click();
//    await page.locator('#Password').fill("Monday12!");
//    await page.locator('#login-btn').click();
   console.log(await page.title());
   await expect(page).toHaveTitle('The Raptor System');
});
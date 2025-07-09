const {test, expect}=require('@playwright/test');
const { connect } = require('http2');

test('@UI tests with browser context', async ({browser})=>{

    const context=await browser.newContext();
    const page= await context.newPage();
    await page.goto('https://staging.raptortech.com/');
});

test('@UI tests with default browser context', async function ({page}) {
     
   await page.goto('https://test.raptortech.com/');
   console.log(await page.title());
   await expect(page).toHaveTitle('Login')
   await page.locator('#Username').fill('Mobileda00@raptor.com');
   await page.locator('#showPassword > button').click();
   await page.locator('#Password').fill("Monday12!");
   await page.locator('#login-btn').click();
   console.log(await page.title());
   await expect(page).toHaveTitle('The Raptor System');
});

test('@UI Get first product name', async ({page})=>{
    //dxltestmails@gmail.com
   const products=page.locator('#products h5');
   await page.goto('https://rahulshettyacademy.com/client');
   await page.locator('#userEmail').fill('dxltestmails@gmail.com');
   await page.locator('#userPassword').fill('Monday12@');
   await page.locator('#login').click();
   //await expect(await products.nth(0).textContent()).toBe('ZARA COAT 3');
   await page.waitForLoadState('networkidle');
   console.log(await products.allTextContents());

})
test('@UI Perform ui actions',async ({page})=>
{
    const termsCheckbox= page.locator('#terms');
    const learnerType=page.locator('select.form-control')
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator('#username').fill('dxltestmails@gmail.com');
    await page.locator('#password').fill('Monday12@');
    await termsCheckbox.click();
    const isSelected=await termsCheckbox.isChecked();
    console.log(isSelected);
    expect(isSelected).toBeTruthy;
    await termsCheckbox.uncheck();
    await learnerType.selectOption('Consultant');
    await expect(page.locator('body > a')).toHaveAttribute('class','blinkingText')
    await page.locator('#signInBtn').click();
    //await page.pause();
})

test('@UI Multiple tab tests',async ({browser})=>{
const context= await browser.newContext();
const page = await context.newPage();
 await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
 
 const [newpage]=await Promise.all(
    [
        context.waitForEvent('page'),
        page.locator('.blinkingText').click(),
    ]
 )
  console.log(await newpage.locator('.red').textContent());
await page.locator('#username').fill('dxltestmails@gmail.com');
});

test('@UI Adding product to cart', async ({page})=>{
    const email='dxltestmails@gmail.com';
   const products=page.locator('#products h5');
   await page.goto('https://rahulshettyacademy.com/client');
   await page.locator('#userEmail').fill(email);
   await page.locator('#userPassword').fill('Monday12@');
   await page.locator('#login').click();
   //await expect(await products.nth(0).textContent()).toBe('ZARA COAT 3');
   await page.waitForLoadState('networkidle');
   console.log(await products.allTextContents())

   const productlist=page.locator('.card-body');
   for (let index = 0; index < await productlist.count(); index++) {
    if(await productlist.nth(index).locator('b').textContent()==='ZARA COAT 3')
    {
        await productlist.nth(index).locator('text=  Add To Cart').click();
        break
    }
}

    await page.locator('[routerlink="/dashboard/cart"]').click();
    await page.locator('div li').nth(0).waitFor();
    const istextVisible=await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(istextVisible).toBeTruthy();
    await page.locator("button:has-text('Checkout')").click();
    await page.locator('[placeholder="Select Country"]').pressSequentially('ind', {delay:100});
    const listOfItmes=page.locator('.ta-results');
    await listOfItmes.locator('button').nth(0).waitFor();
    console.log(await listOfItmes.locator('button').count());
    for (let i = 0; i < await listOfItmes.locator('button').count(); i++) {
        
        if(await listOfItmes.locator('button').nth(i).textContent()===' India')
        {
          await listOfItmes.locator('button').nth(i).click();
          break;
        }
    }
    await expect(page.locator('.user__name [type="text"]').first()).toHaveText(email);
    await page.locator('a:has-text("Place Order ")').click();
    await expect(page.locator('h1:has-text(" Thankyou for the order. ")')).toHaveText(' Thankyou for the order. ');
    //expect(isSuccessfulySubmitted).toBeTruthy();
    const orderID=await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    const orderid=orderID.split(" ")[2];
    await page.locator('[routerlink="/dashboard/myorders"][style*="margin-top"]').click();
    const orderList= page.locator('.ng-star-inserted th[scope="row"]');
    await orderList.nth(0).waitFor();
    for(let orderIndex=0;orderIndex<await orderList.count();orderIndex++)
    {
        console.log(await orderList.nth(orderIndex).textContent());
        if(await orderList.nth(orderIndex).textContent()===orderid)
        {
         await orderList.locator('~td>button[tabindex]').nth(orderIndex).click();
         break;
        }
    }

    expect(await page.locator('div.col-text').textContent()).toBe(orderid);
    
    await page.pause();
});
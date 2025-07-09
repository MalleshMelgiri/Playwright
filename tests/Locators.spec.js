const {test, expect}=require('@playwright/test');

test('@locator Get by Label', async({page})=>{
await page.goto('https://rahulshettyacademy.com/angularpractice/');
await page.getByLabel('Check me out if you Love IceCreams!').check();
await page.getByLabel('Employed').check();
expect(await page.getByLabel('Employed').isChecked()).toBeTruthy();
await page.getByPlaceholder('Password').fill("123wwww");
await page.getByLabel('Gender').selectOption('Female');
console.log(await page.getByLabel('Gender').textContent());
await page.getByRole('button',{name: /submit/i}).click();
const submitted=await page.getByText('Success! The Form has been submitted successfully!.').isVisible();
expect(submitted).toBeTruthy();
await page.getByRole('link',{name:/shop/i}).click();
await page.locator('app-card').filter({hasText:'Nokia Edge'}).getByRole('button').click();
await page.pause();
});

test('@locator test more ui methods', async({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
    //page.on('dialog', dialog=>dialog.accept());
    await page.locator('#confirmbtn').click();
     await page.locator('#mousehover').hover();

     const frame= page.frameLocator('#courses-iframe');
     //await frame.getByRole('link',{name:'Courses'}).click();
     await frame.locator("//a[text()='Courses']").nth(0).click();
     await page.locator('#checkBoxOption1').check();
     await frame.locator("xpath=/html/body/div/header/div[3]/div/div/div[2]/nav/div[2]/ul/li[9]/a/text()").hover();
     await frame.locator('xpath=/html/body/div/header/div[3]/div/div/div[2]/nav/div[2]/ul/li[9]/ul/li[1]/a').click();
});
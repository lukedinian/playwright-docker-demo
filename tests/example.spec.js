const { test, expect } = require('@playwright/test');


test('百度首页测试', async ({page})=>{

    await page.goto('https://www.baidu.com');

    const title = await page.title();

    console.log(title);

    expect(title).toContain('百度');

});
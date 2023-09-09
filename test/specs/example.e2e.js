const { pages } = require('../pages/Pages');

describe('My First Test', () => {
    it.only('Perform login', async () => {
        await pages.loginPage.navigate();
        console.log(await pages.loginPage.getUrl())
        await pages.loginPage.performLogin('standard_user', 'secret_sauce');
        await browser.pause(5000)

        await expect(pages.inventoryPage.headerTitle).toBeExisting();
        await browser.pause(5000)
        //await browser.pause(2000);
        await expect(pages.inventoryPage.headerTitle).toBeExisting();
        //await browser.pause(15000);
        await browser.pause(5000)
        await expect(pages.inventoryPage.inventoryItems).toBeElementsArrayOfSize({ gte: 1 });
        console.log(await pages.inventoryPage.inventoryItems)
       // await browser.pause(2000);

    });

    it('Add and remove product from the cart', async () => {
        await pages.loginPage.navigate();
        await browser.pause(5000);
        await pages.loginPage.performLogin('standard_user', 'secret_sauce');
        await browser.pause(8000);
        await pages.inventoryPage.addItemToCartById(0);
     
        expect(await pages.inventoryPage.getNumberOfItemsInCart()).toBe('1');

        await pages.inventoryPage.shopingCart.click();
        await browser.pause(5000);
        await expect(pages.shopingCartPage.cartItems).toBeElementsArrayOfSize(1);

        await pages.shopingCartPage.removeCartItemById(0);
        await browser.pause(5000);
        await expect(pages.shopingCartPage.cartItems).not.toBeExisting();
        await browser.pause(5000);
    });
});

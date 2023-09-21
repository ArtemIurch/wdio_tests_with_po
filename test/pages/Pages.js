const { InventoryPage } = require('./Inventory.page');
const { LoginPage } = require('./Login.page');
const { ShopingCartPage } = require('./ShopingCart.page');
const {  CheckoutYourInformation } = require('../pages/Checkout.page.js');
const {  CheckoutOverview } = require('../pages/CheckoutOverview.page.js');

module.exports = {
    pages: {
        loginPage: new LoginPage(),
        inventoryPage: new InventoryPage(),
        shopingCartPage: new ShopingCartPage(),
        checkoutYourInformation: new CheckoutYourInformation(),
        checkoutOverview: new CheckoutOverview()
    },
};




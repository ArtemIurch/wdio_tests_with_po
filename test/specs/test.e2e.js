const chai = require('chai');
const chai_expect = chai.expect;

const { pages } = require('../pages/Pages');
const {  CheckoutYourInformation } = require('../pages/Checkout.page.js');
const {  CheckoutOverview } = require('../pages/CheckoutOverview.page.js');


 // получаем рандомное число от 0 до 5 
  function rundom(min, max) {        
     return Math.floor(Math.random() * (max-1 - min + 1)) + min; 
 }


describe('Test1:', () => {
    it('Perform and verify sorting on the Inventory page', async () => {
        //Login
        await pages.loginPage.navigate();
        await pages.loginPage.performLogin('standard_user', 'secret_sauce');

        //получаем список всех товаров   
        const all_products = await pages.inventoryPage.allInventoruItem

        //создаем пустой массив чтобы складывать список цен
        let first_price_list = []

        for (let index = 1; index <= all_products.length; index++) {
            // складываем цены в массив
            let formatInventoryPrice = await (pages.inventoryPage.productPrice(index).getText()) 
            first_price_list.push(parseFloat (formatInventoryPrice.slice(1))); 
        }

        //сортируем массив
        first_price_list.sort(function (a, b) {
            return a - b;
        });

        // меняем фильтр на Price (low to high)
        await pages.inventoryPage.sortlowToHigh.click()


        //создаем пустой массив чтобы закинуть цены отсортированных товаров
        let second_price_list = []

        for (let index = 1; index <= all_products.length; index++) {
            // складываем цены в массив
            let formatInventoryPrice = await (pages.inventoryPage.productPrice(index).getText())
            second_price_list.push(parseFloat (formatInventoryPrice.slice(1)));
        }

        //сравниваем 2 массива
        chai_expect(first_price_list).to.deep.equal(second_price_list);
    });
});

describe('Test2', () => {
    it('Add several random products to the Shopping Cart ', async () => {

        //Login

        await pages.loginPage.navigate();
        await pages.loginPage.performLogin('standard_user', 'secret_sauce');

        //  Add several random products to the Shopping Cart

        //получаем список всех товаров   
        const all_products = await pages.inventoryPage.allInventoruItem
        let random_first_product = rundom(0, all_products.length)

        // добавляем первый товар в корзину
        await pages.inventoryPage.addItemToCartById(random_first_product);

        let random_second_product
        do {
            // получаем рандомное число от 0 до 5  НО НЕ равное предыдущему товару
            random_second_product = rundom(0, all_products.length);
        } while (random_second_product == random_first_product);


        // добавляем 2й товар в корзину
        await pages.inventoryPage.addItemToCartById(random_second_product);

        //проверяем иконку(число) возле корзины
        chai_expect(await pages.inventoryPage.getNumberOfItemsInCart()).eql('2');


        //переходим в корзину
        await pages.inventoryPage.shopingCart.click();

        //проверяем что мы в корзине
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html')

        //Verify products are displayed correctly (check Name, Description, and Price values)

        // получаем количество товаров корзине
         const amount_of_product_in_cart = await pages.shopingCartPage.cartItems
        


         // проверяем наличие полей у всех добавленных товаров
         for (let indexProduct = 1; indexProduct <= amount_of_product_in_cart.length; indexProduct++) {
               expect( await pages.shopingCartPage.getItemNameByIndex(indexProduct)).toBeDisplayed()
               expect( await pages.shopingCartPage.getItemDescByIndex(indexProduct)).toBeDisplayed()
               expect( await pages.shopingCartPage.getItemPriceByIndex(indexProduct)).toBeDisplayed()
         }
    });
});

describe('Test3:', () => {
    it.only('Add several random products to the Shopping Cart', async () => {
        //Login
        await pages.loginPage.navigate();
        await pages.loginPage.performLogin('standard_user', 'secret_sauce');

        //  Add several random products to the Shopping Cart

        //получаем список всех товаров   
        const allProducts = await pages.inventoryPage.allInventoruItem 

        let randomFirstProduct = rundom(0, allProducts.length)

        // добавляем первый товар в корзину
        await pages.inventoryPage.addItemToCartById(randomFirstProduct);

        let random_second_product
        do {
            // получаем рандомное число от 0 до 5  НО НЕ равное предыдущему товару
            random_second_product = rundom(0, allProducts.length);
        } while (random_second_product == randomFirstProduct);

        // добавляем 2й товар в корзину
        await pages.inventoryPage.addItemToCartById(random_second_product);

         // переходим в корзину
         await pages.inventoryPage.shopingCart.click();

         //получаем все данные(Name, Description, and Price values) из товаров которые в корзине.
         // складываем данные в переменные
 
         let product1 = await pages.shopingCartPage.getItemByIndex(1)
         let product2 = await pages.shopingCartPage.getItemByIndex(2)
        
          //click Checkout
          
         pages.shopingCartPage.clickCheckout() 
         await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-one.html')


        // fill the data
      
        let checkoutYourInformation =  new CheckoutYourInformation();
        await checkoutYourInformation.addValueInCheckoutPage()
        

        // click Continue
        await checkoutYourInformation.clickContinue() 

        //Verify: products (Name, Description, and Price values)
        // стягиваем все данные продуктов из Checkout: Overview
        let product11 = await pages.shopingCartPage.getItemByIndex(1)
        let product22 = await pages.shopingCartPage.getItemByIndex(2)
       
        // сравниваем данные товаров которые в корзине с теми которые попали в Checkout: Overview
        // сравниваем объекты 
          chai_expect(product1).to.deep.equal(product11);
          chai_expect(product2).to.deep.equal(product22);
    
        // получаем total price in Checkout: Overview
        let checkoutOverview = new CheckoutOverview;
        let total_1 = await checkoutOverview.totalPriceInCheckoutOverview();
       
        // получаем сумму налогов
        let tax = await checkoutOverview.taxesInCheckoutOverview();
     
        // суммируем цены всех товаров
        let total_2 = +product1.price.slice(1) + +product2.price.slice(1) + +tax.slice(6)

        // сравниваем полную цену в Checkout: Overview и подсчет суммы товаров
        chai_expect(total_1.slice(8)).to.equal(total_2.toFixed(2));
    
    });

});



   





 
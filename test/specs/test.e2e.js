const chai = require('chai');
const chai_expect = chai.expect;

const { pages } = require('../pages/Pages');
const { random } = require('../pages/utils.js');





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

        //сравниваем 2 массива по Price (low to high)
        chai_expect(first_price_list).to.deep.equal(second_price_list);

/////////////////////////////// соритировка - Price ( high to low )/////////////////////////////////////////////////////////////////

         //сортируем массив Price ( high to low )
         first_price_list.sort(function (a, b) {
            return b - a;
        });

        // меняем фильтр на Price ( high to low )
        await pages.inventoryPage.highToLow.click()

        second_price_list = []
        for (let index = 1; index <= all_products.length; index++) {
            // складываем цены в массив
            let formatInventoryPrice = await (pages.inventoryPage.productPrice(index).getText())
            second_price_list.push(parseFloat (formatInventoryPrice.slice(1)));
        }

         //сравниваем 2 массива по Price ( high to low )
         chai_expect(first_price_list).to.deep.equal(second_price_list);

///////////////////////////////сортировка - Name (A to Z)/////////////////////////////////////////////////////////////////

        //создаем пустой массив чтобы складывать список цен
        let first_productName_list = []

        for (let index = 1; index <= all_products.length; index++) {
            // складываем цены в массив
            let formatInventoryPrice = await (pages.inventoryPage.productName(index).getText()) 
            first_productName_list.push(formatInventoryPrice); 
        }


        //сортируем массив имен Name (A to Z)
        first_productName_list.sort();

        // меняем фильтр на Name (A to Z)
        await pages.inventoryPage.nameAtoZ.click()


        let second_productName_list = []
        for (let index = 1; index <= all_products.length; index++) {
            // складываем имена в массив
            let formatInventoryPrice = await (pages.inventoryPage.productName(index).getText())
            second_productName_list.push(formatInventoryPrice);
        }

         //сравниваем 2 массива по Name (A to Z)
         chai_expect(first_productName_list).to.deep.equal(second_productName_list);

///////////////////////////////   соритировка - Name (Z to A)   //////////////////////////////////////////////////////////////////

        //сортируем массив имен Name (Z to A)
        first_productName_list.sort( (a, b) => b.localeCompare(a))

        // меняем фильтр на Name (Z to A)
        await pages.inventoryPage.nameZtoA.click()

        second_productName_list = []
        for (let index = 1; index <= all_products.length; index++) {
            // складываем имена в массив
            let formatInventoryPrice = await (pages.inventoryPage.productName(index).getText())
            second_productName_list.push(formatInventoryPrice);
        }

         //сравниваем 2 массива по Name (Z to A)
         chai_expect(first_productName_list).to.deep.equal(second_productName_list);
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
        let randomm = random(0, all_products.length)

        // добавляем рандомное количество товаров в корзину
        for (let i = randomm; i >= 0; i--){  
            await pages.inventoryPage.addItemToCartById(i);
        }

        //проверяем иконку(число) возле корзины  `${randomm + 1 }`
         chai_expect(await pages.inventoryPage.getNumberOfItemsInCart()).eql(`${randomm + 1 }`);

         //переходим в корзину
        await pages.inventoryPage.shopingCart.click();

        //проверяем что мы в корзине
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html')

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
        const all_products = await pages.inventoryPage.allInventoruItem
        let randomm = random(0, all_products.length)

        // добавляем рандомное количество товаров в корзину
        for (let i = randomm; i >=0; i--){  
            await pages.inventoryPage.addItemToCartById(i);
        }
      
        // переходим в корзину
        await pages.inventoryPage.shopingCart.click();
      
        //получаем все данные(Name, Description, and Price values) из товаров которые в корзине.
        // складываем данные в массив
        let productList1 = []
        for (let i = randomm+1; i >= 1; i--){  
            productList1.push( await pages.shopingCartPage.getItemByIndex(i))
        }

        //click Checkout
        pages.shopingCartPage.clickCheckout() 
        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-one.html');

         // fill the data
        await pages.CheckoutYourInformation.addValueInCheckoutPage()

        // click Continue
        await pages.CheckoutYourInformation.clickContinue()

        await browser.pause(3000)


        //Verify: products (Name, Description, and Price values)
        // стягиваем все данные продуктов из Checkout: Overview
        let productList2 = []
        for (let i = randomm + 1; i >= 1; i--){  
            productList2.push( await pages.shopingCartPage.getItemByIndex(i))
        }
      
        // сравниваем данные товаров которые в корзине с теми которые попали в Checkout: Overview
        // сравниваем массивы 
        chai_expect(productList1).to.deep.equal(productList2);

        // получаем total price in Checkout: Overview
        let total_1 = await pages.CheckoutOverview.totalPriceInCheckoutOverview()

        // получаем сумму налогов
        let tax = await pages.CheckoutOverview.taxesInCheckoutOverview()

        let productSumPrice = 0;
        for (let i = 0; i < productList2.length; i++){      
           productSumPrice += +((productList2[i].price).slice(1))
        }
         // суммируем цены всех товаров + налоги
         let totalSum = productSumPrice + +tax.slice(6)

        // сравниваем полную цену в Checkout: Overview и подсчет суммы товаров
         chai_expect(total_1.slice(8)).to.equal(totalSum.toFixed(2));
            
    });

});



   





 
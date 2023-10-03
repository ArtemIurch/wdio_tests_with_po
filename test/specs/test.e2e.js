const chai = require('chai');
const chai_expect = chai.expect;

const { pages } = require('../pages/Pages');
const { random, randomize } = require('../pages/utils.js');

beforeEach(async () => {
    //Login
    await pages.loginPage.navigate();
    await pages.loginPage.performLogin('standard_user', 'secret_sauce');
     //получаем список всех товаров   
    all_products = await pages.inventoryPage.allInventoryItem
 });

 describe('Test1:', async () => {

    let price_list = [];
    let product_name_list = [];
    let sortOption = [];

    it(`Perform and verify sorting`, async () => {
       for(let i = 1; i <= all_products.length; i++){
           let formatInventoryPrice = await (pages.inventoryPage.productPrice(i).getText())
           let formatInventoryName = await (pages.inventoryPage.productName(i).getText()) 
   
           //складываем данные в пустые массивы
           price_list.push(parseFloat (formatInventoryPrice.slice(1))); 
           product_name_list.push(formatInventoryName); 
       }
    }); 
        
        // создаем массив с методами сортировки 
         sortOption = [
            {option: "az",   sort: function() {
                return product_name_list.slice().sort(function(a, b) {
                    return a.localeCompare(b);
                });
            }}
             ,
             {option: "za",   sort: function() {
                return product_name_list.slice().sort(function(a, b) {
                     return b.localeCompare(a);
                 });
             }},
             {option: "lohi",   sort: function() {
                return price_list.slice().sort(function(a, b) {
                     return a - b;
                 });
             }},
             {option: "hilo",   sort: function() {
                return price_list.slice().sort(function(a, b) {
                     return b - a;
                 });
             }}
        ]

        for(let elem  of sortOption){
            it(`Perform and verify sorting on the Inventory page - Price ${elem.option}`, async () => {
                await pages.inventoryPage.changeSortingOrder(elem.option).click()// нажимаем на сортировку
                
                let unsorted_list = [] // создаем пустой массив чтобы сложить данные с сайта после того как нажали на сортировку
                if(elem.option == "az" || elem.option == "za"){
                    for(let i = 1; i <= all_products.length; i++){
                        let formatInventoryName = await (pages.inventoryPage.productName(i).getText()) 
                        unsorted_list.push(formatInventoryName); // складываем в массив 
                    }
                }
                else if(elem.option == "lohi" || elem.option == "hilo") {
                    for(let i = 1; i <= all_products.length; i++){
                        let formatInventoryPrice = await (pages.inventoryPage.productPrice(i).getText())    
                        unsorted_list.push(parseFloat (formatInventoryPrice.slice(1))); // складываем в массив
                    }
                }

                chai_expect(elem.sort()).to.deep.equal(unsorted_list); // через цикл сравниваем отсортированный массив с обычным массивом 
            });
        } 
});

describe('Test2', () => {
    it('Add several random products to the Shopping Cart ', async () => {

        let randomm = random(0, all_products.length);// выполняем первый рандом с опеределением сколько всего товаров положем в корзину
               
        let exclude = [0]
        for (let i = 1; i <= randomm; i++ ){
            let randomNumber  = randomize(0, all_products.length, exclude)// определив количество товаров (допустим 3) добовляем рандомные 3 товара в козину 
            
            await pages.shopingCartPage.clickAddtocartByInd(randomNumber)
            await exclude.push(randomNumber)
        }    

        //проверяем иконку(число) возле корзины 
        chai_expect(await pages.inventoryPage.getNumberOfItemsInCart()).eql(`${randomm}`);

        // переходим в корзину
        await pages.inventoryPage.shopingCart.click();
                
        //проверяем что мы в корзине
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html')

        // получаем количество товаров корзине
        const cartItems = await pages.shopingCartPage.cartItems
   
        // проверяем наличие полей у всех добавленных товаров
           for (let indexProduct = 1; indexProduct <= cartItems.length; indexProduct++) {
               expect( await pages.shopingCartPage.getItemNameByIndex(indexProduct)).toBeDisplayed()
               expect( await pages.shopingCartPage.getItemDescByIndex(indexProduct)).toBeDisplayed()
               expect( await pages.shopingCartPage.getItemPriceByIndex(indexProduct)).toBeDisplayed()
           }
    });
});
   
describe('Test3:', () => {
    it('Add several random products to the Shopping Cart', async () => {
         let randomm = random(0, all_products.length);// выполняем первый рандом с опеределением сколько всего товаров положем в корзину

         let productList1 = [];      

        let exclude = [0];
        for (let i = 1; i <= randomm; i++ ){
            let randomNumber  = randomize(0, all_products.length, exclude)// определив количество товаром (допустим 3) добовляем рандомные 3 товара в козину 

            await pages.shopingCartPage.clickAddtocartByInd(randomNumber)

            //получаем все данные(Name, Description, and Price values) из товаров которые в inventory page.
            // складываем данные в массив
            await productList1.push( await pages.shopingCartPage.getItemInfoByIndex(randomNumber))

            await exclude.push(randomNumber)
        }   
          
            //сортируем массив
            await sort(productList1)
       
            // переходим в корзину
            await pages.inventoryPage.shopingCart.click();

            //получаем все данные(Name, Description, and Price values) из товаров которые в корзине.
            // складываем данные в массив
            let productList2 = []
            for (let i = randomm; i >= 1; i--){  
                productList2.push( await pages.shopingCartPage.getItemInfoByIndex(i))
            }
            await sort(productList2)

            // сравниваем данные товаров которые в inventory page  с теми которые попали в корзине
            // сравниваем массивы 
            chai_expect(productList1).to.deep.equal(productList2);

            //click Checkout
            await pages.shopingCartPage.clickCheckout() 
            await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-one.html');

            // fill the data
            await pages.checkoutYourInformation.fillUserData()

            // click Continue
            await pages.checkoutYourInformation.clickContinue()

            //Verify: products (Name, Description, and Price values)
            // стягиваем все данные продуктов из Checkout: Overview
            let productList3 = []
            for (let i = randomm ; i >= 1; i--){  
                productList3.push( await pages.shopingCartPage.getItemInfoByIndex(i))
            }
        
            // сравниваем данные товаров которые в корзине с теми которые попали в Checkout: Overview
            // сравниваем массивы 
              await sort(productList3)
              chai_expect(productList1).to.deep.equal(productList3);

            // получаем total price in Checkout: Overview
            let total_1 = await pages.checkoutOverview.getTotalPrice()

            // получаем сумму налогов
            let tax = await pages.checkoutOverview.getTaxes()

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




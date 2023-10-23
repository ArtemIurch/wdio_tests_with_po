const chai = require('chai');
const chai_expect = chai.expect;

const { pages } = require('../pages/Pages');
const { addRandomProducts } = require('../pages/commonStep.js');
const { randomnumber } = require('../pages/utils.js');

//сортировка массивов 
function sort(productArray){
    return productArray.sort(function(obj1, obj2) {
        return obj2.name.localeCompare(obj1.name);
    });

}

beforeEach(async () => {
    //Login
    await pages.loginPage.navigate();
    await pages.loginPage.performLogin('standard_user', 'secret_sauce');
     //получаем список всех товаров   
    all_products = await pages.inventoryPage.allInventoryItem
   
 });

 describe('Test1:',  async() => { 
    let price_list = [];
    let product_name_list = [];
    let sortOption = [];
 
    before(async () => {
              //Login
              await pages.loginPage.navigate();
              await pages.loginPage.performLogin('standard_user', 'secret_sauce');
               //получаем список всех товаров   
              all_products = await pages.inventoryPage.allInventoryItem
             
      
             for (let i = 1; i <= all_products.length; i++) {
              let formatInventoryPrice = await (pages.inventoryPage.productPrice(i).getText())
               let formatInventoryName = await (pages.inventoryPage.productName(i).getText())
      
               price_list.push(parseFloat(formatInventoryPrice.slice(1)));
               product_name_list.push(formatInventoryName);
           }
    });

    sortOption = [
        {option: "az",   sort: function(priseOrNameList) {
            return priseOrNameList.slice().sort(function(a, b) {
                return a.localeCompare(b);
            });
        }}
         ,
         {option: "za",   sort: function(priseOrNameList) {
            return priseOrNameList.slice().sort(function(a, b) {
                 return b.localeCompare(a);
             });
         }},
         {option: "lohi",   sort: function(priseOrNameList) {
            return priseOrNameList.slice().sort(function(a, b) {
                 return a - b;
             });
         }},
         {option: "hilo",   sort: function(priseOrNameList) {
            return priseOrNameList.slice().sort(function(a, b) {
                 return b - a;
             });
         }}
    ]
    
         for(let elem  of sortOption){
             it(`Perform and verify sorting on the Inventory page - Price ${elem.option}`, async () => {
                 await pages.inventoryPage.changeSortingOrder(elem.option).click()// нажимаем на сортировку
                
                 let unsorted_list
                 if(elem.option === "az" || elem.option === "za"){
                      unsorted_list = await Promise.all(await pages.inventoryPage.allTitleList.map(async (text) => {// складываем данные в массив
                      return text.getText();
                     }));
                 }
                 else {
                         unsorted_list = await Promise.all(await pages.inventoryPage.allPriceList.map(async (price) => {// складываем данные в массив
                         const priceText = await price.getText();
                         return parseFloat(priceText.replace('$', ''));
                     }));           
                 }
                
                 chai_expect(elem.sort(unsorted_list)).to.deep.equal(unsorted_list); // через цикл сравниваем отсортированный массив с обычным массивом 
             });
         } 
       
});

describe('Test2', () => {
    xit('verification  Total Price and verification: products (Name, Description, and Price values) ',  async() => {
       
        let random = randomnumber(0, all_products.length);// выполняем первый рандом с опеределением сколько всего товаров положем в корзину

        let totalInformationofProduct = await addRandomProducts(random); // складываем масив данных с продуктами которые попадут в корзину
               
        sort(totalInformationofProduct)// сортируем массив 
         
        //проверяем иконку(число) возле корзины 
        chai_expect(await pages.inventoryPage.getNumberOfItemsInCart()).eql(`${random}`);

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
        //складываем массив продуктов которые в корзине
           let expected_productList = []
           for (let i = random; i >= 1; i--){  
               expected_productList.push( await pages.shopingCartPage.getItemInfoByIndex(i))
           }

           sort(expected_productList)// сортируем массив чтобы струкрура была идентичной totalInformationofProduct

           chai_expect(totalInformationofProduct).to.deep.equal(expected_productList);// сравниваем 2 массива 
          
    });

   
});
   
describe('Test3:', () => {
    xit('Add several random products to the Shopping Cart', async () => {
           let random = random(0, all_products.length);// выполняем первый рандом с опеределением сколько всего товаров положем в корзину

           let actual_productList = [];      
            // определив количество товаров (допустим 3) добовляем рандомные 3 товара в козину 
           await addRandomProducts(random, actual_productList);

            //сортируем массив
              sort(actual_productList)

            // переходим в корзину
            await pages.inventoryPage.shopingCart.click();

            //получаем все данные(Name, Description, and Price values) из товаров которые в корзине.
            // складываем данные в массив
            let expected_productList = []
            for (let i = random; i >= 1; i--){  
                expected_productList.push( await pages.shopingCartPage.getItemInfoByIndex(i))
            }

             sort(expected_productList)

            // сравниваем данные товаров которые в inventory page  с теми которые попали в корзину
            // сравниваем массивы 
            chai_expect(actual_productList).to.deep.equal(expected_productList);

            //click Checkout
            await pages.shopingCartPage.clickCheckout() 
            await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-one.html');

            // fill the data
            await pages.checkoutYourInformation.fillUserData()

            // click Continue
            await pages.checkoutYourInformation.clickContinue()

            //Verify: products (Name, Description, and Price values)
            // стягиваем все данные продуктов из Checkout: Overview
            let checkoutexpectedProductList = []
            for (let i = random ; i >= 1; i--){  
                checkoutexpectedProductList.push( await pages.shopingCartPage.getItemInfoByIndex(i))
            }
        
            // сравниваем данные товаров которые в корзине с теми которые попали в Checkout: Overview
            // сравниваем массивы 
             sort(checkoutexpectedProductList)
            chai_expect(actual_productList).to.deep.equal(checkoutexpectedProductList);

            // получаем total price in Checkout: Overview
            let totalPrice = await pages.checkoutOverview.getTotalPrice()

            // получаем сумму налогов
            let tax = await pages.checkoutOverview.getTaxes()

            let productSumPrice = 0;
            for (let i = 0; i < expected_productList.length; i++){      
            productSumPrice += +((expected_productList[i].price).slice(1))
            }
            // суммируем цены всех товаров + налоги
            let totalSum = productSumPrice + +tax.slice(6)

            // сравниваем полную цену в Checkout: Overview и подсчет суммы товаров
            chai_expect(totalPrice.slice(8)).to.equal(totalSum.toFixed(2));
        
            
    });

});

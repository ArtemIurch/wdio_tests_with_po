
const chai = require('chai');
const chai_expect = chai.expect;

const { pages } = require('../pages/Pages');
const {  Get_prod_data, product_1, product_2, product_11, product_22 } = require('../pages/class.js');


describe('Test1:', () => {
    it.only('Perform and verify sorting on the Inventory page', async () => {
            //Login


            await pages.loginPage.navigate();
            await pages.loginPage.performLogin('standard_user', 'secret_sauce');


        //Price (high to low) - выбираем в фильтре значение
        await $('//option[@value="hilo"]').click()


        // получаем цену самого дешевого товара (записываем в переменную)
        let low_price = await $('(//div[@class="inventory_item_price"])[last()]').getText()
        //console.log(a);


         // получаем цену самого дорогого товара (записываем в переменную)
        //let a = await $("//span[@class='shopping_cart_badge']").getText()
        let hig_price = await $('(//div[@class="inventory_item_price"])[1]').getText()
        //console.log(b);


        // меняем фильтр на Price (low to high)
        await $('//option[@value="lohi"]').click()


        // получаем цену самого дешевого товара (записываем в переменную)
        let low_price2 = await $('(//div[@class="inventory_item_price"])[last()]').getText()
       // console.log(c);


       // получаем цену самого дорогого товара (записываем в переменную)
        let hig_price2 = await $('(//div[@class="inventory_item_price"])[1]').getText()
       // console.log(d);


        // теперь сравниваем поменялись ли местами цены и равны ли они друг другу
       chai_expect(low_price).to.equal(hig_price2);
       chai_expect(hig_price ).to.equal(low_price2);
      
      
 
       
        
    });


});

describe('Test2', () => {
    it('Add several random products to the Shopping Cart ', async () => {

                    //Login

                    await pages.loginPage.navigate();
                    await pages.loginPage.performLogin('standard_user', 'secret_sauce');

                    //  Add several random products to the Shopping Cart

                    //получаем рандомное число от 1 до 6    
                    const randomNumber = Math.floor(Math.random() * 6) + 1;
                    //добавляем 2 товара в корзину
                    await pages.inventoryPage.addItemToCartById(randomNumber);
                    await pages.inventoryPage.addItemToCartById(randomNumber);


                    //проверяем иконку(число) возле корзины
                    chai_expect(await pages.inventoryPage.getNumberOfItemsInCart()).eql('2');


                    //переходим в корзину
                    await pages.inventoryPage.shopingCart.click();


                    //проверяем что мы в корзине
                    await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html')

                    //Verify products are displayed correctly (check Name, Description, and Price values)
                    await expect($('div.inventory_item_name')).toBeDisplayed()
                    await expect($('div.inventory_item_desc')).toBeDisplayed()
                    await expect($('div.inventory_item_price')).toBeDisplayed()


                    //второй продукт
                    await expect($("(//div[@class='inventory_item_name'])[2]")).toBeDisplayed()
                    await expect($("(//div[@class='inventory_item_desc'])[2]")).toBeDisplayed()
                    await expect($("(//div[@class='inventory_item_price'])[2]")).toBeDisplayed()



            
    });


});

describe('Test3:', () => {
    it('Add several random products to the Shopping Cart', async () => {
                //Login
                await pages.loginPage.navigate();
                await pages.loginPage.performLogin('standard_user', 'secret_sauce');

                //  Add several random products to the Shopping Cart

                //получаем рандомное число от 1 до 6
                const randomNumber = Math.floor(Math.random() * 6) + 1;
                //добавляем 2 товара в корзину
                await pages.inventoryPage.addItemToCartById(randomNumber);
                await pages.inventoryPage.addItemToCartById(randomNumber);
                // переходим в корзину
                await pages.inventoryPage.shopingCart.click();

                //получаем все данные(Name, Description, and Price values) из товаров которые в корзине.
                // складываем данные в экземпляр класса
                await product_1.get_text(1)
                await product_2.get_text(2)

                //click Checkout
                await $('#checkout').click()
                await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-one.html')


                // fill the data
                await $('#first-name').addValue("standard_user")
                await $('#last-name').addValue("standard_user")
                await $('#postal-code').addValue("standard_user")


                // click Continue
                await $('#continue').click()                        


                //Verify: products (Name, Description, and Price values)


                // стягиваем все данные продуктов из Checkout: Overview
                console.log(await product_11.get_text(1))
                console.log(await product_22.get_text(2))

                // сравниваем данные товаров которые в корзине с теми которые попали в Checkout: Overview
                // сравниваем объекты (экземпляры классов)
                chai_expect(product_1).to.deep.equal(product_11);
                chai_expect(product_2).to.deep.equal(product_22);
             

               // получаем total price in Checkout: Overview
               let total_1 = await $("//div[@class='summary_info_label summary_total_label']").getText();

               // получаем сумму налогов
               let tax = await $("//div[@class='summary_tax_label']").getText();

                // суммируем цены всех товаров
               let total_2 = +product_1.Price_values.slice(1) + +product_2.Price_values.slice(1) + +tax.slice(6)

             // сравниваем полную цену в Checkout: Overview и подсчет суммы товаров
              chai_expect(total_1.slice(8)).to.equal(total_2.toFixed(2));



    });

});
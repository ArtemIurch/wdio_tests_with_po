const { BaseSwagLabPage } = require('./BaseSwagLab.page');
const  {pages}  = require('C:/Users/Кікі/Downloads/Нова папка/wdio_tests_with_po/test/pages/Pages');

function onee(){
    return pages;
}


class InventoryPage extends BaseSwagLabPage {

    one(){
        console.log(pages);
    }



    url = '/inventory.html';

    get headerTitle() { return $('.title'); }

    get inventoryItems() { return $$('.inventory_item'); }

    get addItemToCartBtns() { return $$('[id^="add-to-cart"]'); }

    get allInventoryItem() { return $$('//div[@class="inventory_list"]/child::*'); }

    get sortlowToHigh(){return $('//option[@value="lohi"]' )}
    get highToLow(){return $('//option[@value="hilo"]')}
    get nameAtoZ(){return $('//option[@value="az"]' )}
    get nameZtoA(){return $('//option[@value="za"]' )}

    get allPriceList(){return $$('//div[@class="inventory_item_price"]');}
    get allTitleList(){return $$('//div[@class="inventory_item_name"]');}

    changeSortingOrder(sortingOrder){return $(`//select[@class="product_sort_container"]/option[@value="${sortingOrder}"]`)}
    productPrice(index){return $( `(//div[@class='inventory_item_price'])[${index}]`)}
    productName(index){return $( `(//div[@class='inventory_item_name'])[${index}]`)}
   
    // get allInventoruItem ...

    async addItemToCartById(id) {
        await this.addItemToCartBtns[id].click();
    }

  







/*
     randomize(min, max, exclude) {        
        let randomNumber;
            do {
                randomNumber = Math.floor(Math.random() * (max - min + 1)) + min; 
              } while (exclude.includes(randomNumber));
              return randomNumber;
        }
    
    async addRandomProducts(random, productList ){
        let totalInformationofProduct = [];
        let exclude = [0];
        for (let i = 1; i <= random; i++ ){
          let randomNumber = this.randomize(0, all_products.length, exclude);// определив количество товаров (допустим 3) добовляем рандомные 3 товара в козину
          console.log(pages);
         totalInformationofProduct.push(await pages.shopingCartPage.getItemInfoByIndex(randomNumber))// закидываем рандомные продукты в массив
       
          await  pages.shopingCartPage.clickAddToCartByInd(randomNumber);   
          exclude.push(randomNumber);   
        } 
        console.log(totalInformationofProduct);
        return totalInformationofProduct;
       
    }
    */
}

module.exports = { InventoryPage };




//module.exports = { onee };
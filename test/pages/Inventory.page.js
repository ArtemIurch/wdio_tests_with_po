const { BaseSwagLabPage } = require('./BaseSwagLab.page');

class InventoryPage extends BaseSwagLabPage {
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
    get allTitleList(){return $$('//div[@class="inventory_item_name "]');}

    changeSortingOrder(sortingOrder){return $(`//select[@class="product_sort_container"]/option[@value="${sortingOrder}"]`)}
    productPrice(index){return $( `(//div[@class='inventory_item_price'])[${index}]`)}
    productName(index){return $( `(//div[@class='inventory_item_name '])[${index}]`)}
   
    // get allInventoruItem ...

    async addItemToCartById(id) {
        await this.addItemToCartBtns[id].click();
    }
}
module.exports = { InventoryPage };

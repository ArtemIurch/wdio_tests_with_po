const { BaseSwagLabPage } = require('./BaseSwagLab.page');

class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    get headerTitle() { return $('.title'); }

    get inventoryItems() { return $$('.inventory_item'); }

    get addItemToCartBtns() { return $$('[id^="add-to-cart"]'); }

    get allInventoruItem() { return $$('//div[@class="inventory_list"]/child::*'); }

    get sortlowToHigh(){return $('//option[@value="lohi"]' )}
    
    productPrice(index){return $( "(//div[@class='inventory_item_price'])[" + index + "]")}
   
    // get allInventoruItem ...

    async addItemToCartById(id) {
        await this.addItemToCartBtns[id].click();
    }
}

module.exports = { InventoryPage };





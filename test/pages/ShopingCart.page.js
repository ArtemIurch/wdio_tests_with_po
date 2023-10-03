const { BaseSwagLabPage } = require('./BaseSwagLab.page');

class ShopingCartPage extends BaseSwagLabPage {
    url = '/cart.html';

    cartItemSelector = '.cart_item';

    removeItemSelector = '[id^="remove"]';

    get headerTitle() { return $('.title'); }

    get cartItems() { return $$(this.cartItemSelector); }

    // async below added to show the function returns a promise
    async getCartItemByName(name) { return $(`${this.cartItemSelector}=${name}`); }

    async removeCartItemByName(name) {
        const item = await this.getCartItemByName(name);
        return item.$(this.removeItemSelector);
    }

    async removeCartItemById(id) {
        await this.cartItems[id].$(this.removeItemSelector).click();
    }

    async clickCheckout() {
        await this.сheckout.click();
    }

    get сheckout(){ return $('#checkout'); }

    async clickAddtocartByInd(randomNumber) {
        await this.addtocartByInd(randomNumber).click()
    }

     addtocartByInd(randomNumber) { return $(`(//div[@class="pricebar"]/button)[${randomNumber}]`); }

     getItemNameByIndex(indexProduct) { return $("(//div[@class='inventory_item_name'])[" + indexProduct + "]"); }
     getItemDescByIndex(indexProduct) { return $("(//div[@class='inventory_item_desc'])[" + indexProduct + "]"); } 
     getItemPriceByIndex(indexProduct) { return $("(//div[@class='inventory_item_price'])[" + indexProduct + "]"); }  

    async getItemInfoByIndex(indexProduct){
        let name =  await this.getItemNameByIndex(indexProduct).getText();
        let description = await this.getItemDescByIndex(indexProduct).getText();
        let price = await this.getItemPriceByIndex(indexProduct).getText();

        return {name, description, price }
    }
} 

module.exports = { ShopingCartPage };


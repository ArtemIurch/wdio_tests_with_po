const { BasePage } = require('./Base.page');

class BaseSwagLabPage extends BasePage {
    // header
    get mainMenuBtn() { return $('TBD'); }

    get shopingCart() { return $('.shopping_cart_link'); }

    get shopingCartBadge() { return $('.shopping_cart_badge'); }
 
    async getNumberOfItemsInCart() {
        return this.shopingCartBadge.getText();
    }
}

module.exports = { BaseSwagLabPage };

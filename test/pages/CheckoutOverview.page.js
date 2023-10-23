const { BaseSwagLabPage } = require('./BaseSwagLab.page');
class CheckoutOverview extends BaseSwagLabPage{

    url = 'https://www.saucedemo.com/checkout-step-two.html';

    get totalPrice() {  
        return $("//div[@class='summary_info_label summary_total_label']");  
    }

    get taxes() {  
        return $("//div[@class='summary_tax_label']");  
    }

    async getTotalPrice(){
        return this.totalPrice.getText();
    }

    async getTaxes(){
        return this.taxes.getText();
    }
    
   
}
module.exports = { CheckoutOverview };


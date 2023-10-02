class CheckoutOverview extends BaseSwagLabPage{

    url = 'https://www.saucedemo.com/checkout-step-two.html';

    get totalPriceInCheckoutOverview() {  
        return $("//div[@class='summary_info_label summary_total_label']");  
    }

    get taxesInCheckoutOverview() {  
        return $("//div[@class='summary_tax_label']");  
    }

    async getTotalPriceInCheckoutOverview(){
        return this.totalPriceInCheckoutOverview.getText();
    }

    async getTaxesInCheckoutOverview(){
        return this.taxesInCheckoutOverview.getText();
    }
    
   
}
module.exports = { CheckoutOverview };


class CheckoutOverview {

    get gettotalPriceInCheckoutOverview() {  
        return $("//div[@class='summary_info_label summary_total_label']");  
    }

    get gettaxesInCheckoutOverview() {  
        return $("//div[@class='summary_tax_label']");  
    }

    async totalPriceInCheckoutOverview(){
        return this.gettotalPriceInCheckoutOverview.getText();
    }

    async taxesInCheckoutOverview(){
        return this.gettaxesInCheckoutOverview.getText();
    }
    
   
}
module.exports = { CheckoutOverview };


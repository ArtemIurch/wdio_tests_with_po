class CheckoutOverview {

    async totalPriceInCheckoutOverview(){
        return await $("//div[@class='summary_info_label summary_total_label']").getText();
    }

    async taxesInCheckoutOverview(){
        return await $("//div[@class='summary_tax_label']").getText();
    }
    
   
}
module.exports = { CheckoutOverview };


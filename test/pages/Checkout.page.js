class CheckoutYourInformation {
    async addValueInCheckoutPage() {
        await $('#first-name').addValue("firstname");
        await $('#last-name').addValue("firstname");
        await $('#postal-code').addValue(123); 
   }

   async clickContinue() {
    await $('#continue').click();
}
   
}
module.exports = { CheckoutYourInformation };


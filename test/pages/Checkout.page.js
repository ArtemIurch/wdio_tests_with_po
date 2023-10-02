class CheckoutYourInformation extends BaseSwagLabPage{
   

    get firstName() {  
        return $('#first-name');
     }

     get lastName() {  
        return $('#last-name');
    }
    get postalCode() {  
        return $('#postal-code');  
    }

     async addValueInCheckoutPage({ firstname = "firstname", lasttname = "lasttname", code = 123}  =  {} ) {
        await this.firstName.addValue(firstname);
        await this.lastName.addValue(lasttname);
        await this.postalCode.addValue(code);
     }

    get continueBtn() {  
        return $('#continue');  
    }

    async clickContinue() {
        await this.continueBtn.click();
    }
   
}
module.exports = { CheckoutYourInformation };


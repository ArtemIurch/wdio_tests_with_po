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

    get clickContinue() {  
        return $('#continue');  
    }

    async clickContinue() {
        await this.clickContinue.click();
    }
   
}
module.exports = { CheckoutYourInformation };


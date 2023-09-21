class CheckoutYourInformation {
   

    get addFirstName() {  
        return $('#first-name');
     }

     get addLastName() {  
        return $('#last-name');
    }
    get addPostalCode() {  
        return $('#postal-code');  
    }

     async addValueInCheckoutPage(firstname = "firstname", lasttname = "lasttname", code = 123 ) {
        await this.addFirstName.addValue(firstname);
        await this.addLastName.addValue(lasttname);
        await this.addPostalCode.addValue(code);
     }

     get getClickContinue() {  
        return $('#continue');  
    }

    async clickContinue() {
        await this.getClickContinue.click();
    }
   
}
module.exports = { CheckoutYourInformation };


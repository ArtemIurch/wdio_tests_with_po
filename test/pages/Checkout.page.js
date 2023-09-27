class CheckoutYourInformation {
   

    get FirstName() {  
        return $('#first-name');
     }

     get LastName() {  
        return $('#last-name');
    }
    get PostalCode() {  
        return $('#postal-code');  
    }

     async addValueInCheckoutPage({ firstname = "firstname", lasttname = "lasttname", code = 123}  =  {} ) {
        await this.FirstName.addValue(firstname);
        await this.LastName.addValue(lasttname);
        await this.PostalCode.addValue(code);
     }

     get getClickContinue() {  
        return $('#continue');  
    }

    async clickContinue() {
        await this.getClickContinue.click();
    }
   
}
module.exports = { CheckoutYourInformation };


 class Get_prod_data{
   

    async get_text(v){
    
        this.Name = await $("(//div[@class='inventory_item_name'])[" + v + "]").getText();
        this.Description = await $("(//div[@class='inventory_item_desc'])[" + v + "]").getText();
        this.Price_values = await $("(//div[@class='inventory_item_price'])[" + v + "]").getText();
    }
}

let product_1 = new Get_prod_data;
let product_2 = new Get_prod_data;
let product_11 = new Get_prod_data;
let product_22 = new Get_prod_data;

module.exports = { Get_prod_data, product_1, product_2, product_11, product_22 };

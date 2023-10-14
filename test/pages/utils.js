const { pages } = require("./Pages");

 // получаем рандомное число от 0 до 5 
 function randomnumber(min, max) {        
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}
/*
function randomize(min, max, exclude) {        
    let randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * (max - min + 1)) + min; 
          } while (exclude.includes(randomNumber));
          return randomNumber;
    }

async function addRandomProducts(random, productList ){
    let totalInformationofProduct = [];
    let exclude = [0];
    for (let i = 1; i <= random; i++ ){
      let randomNumber  = randomize(0, all_products.length, exclude);// определив количество товаров (допустим 3) добовляем рандомные 3 товара в козину 
      totalInformationofProduct.push(await pages.shopingCartPage.getItemInfoByIndex(randomNumber))// закидываем рандомные продукты в массив
      await  pages.shopingCartPage.clickAddToCartByInd(randomNumber);   
      exclude.push(randomNumber);   
    } 
    return totalInformationofProduct;
   
}

*/
module.exports = { randomnumber};
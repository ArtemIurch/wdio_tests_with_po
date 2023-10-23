 const { pages } = require("./Pages");
 const { randomize } = require('./utils.js');


 async function addRandomProducts(random, productList ){
     let totalInformationofProduct = [];
     let exclude = [0];
     for (let i = 1; i <= random; i++ ){
       let randomNumber  = randomize(0, all_products.length, exclude); //определив количество товаров (допустим 3) добовляем рандомные 3 товара в козину 
       totalInformationofProduct.push(await pages.shopingCartPage.getItemInfoByIndex(randomNumber)) //закидываем рандомные продукты(нейм дескрипшен прайс) в массив
       await  pages.shopingCartPage.clickAddToCartByInd(randomNumber);   
       exclude.push(randomNumber);   
     } 
     return totalInformationofProduct;
 }

 module.exports = {addRandomProducts};

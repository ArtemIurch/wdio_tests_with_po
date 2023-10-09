const { pages } = require("./Pages");

 // получаем рандомное число от 0 до 5 
 function random(min, max) {        
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function randomize(min, max, exclude) {        
    let randomNumber 
        do {
            randomNumber = Math.floor(Math.random() * (max - min + 1)) + min; 
          } while (exclude.includes(randomNumber));
          return randomNumber
    }

function addRandomProducts(randomm, productList){
    let exclude = [0]
    for (let i = 1; i <= randomm; i++ ){
        let randomNumber  = randomize(0, all_products.length, exclude)// определив количество товаров (допустим 3) добовляем рандомные 3 товара в козину 
        pages.shopingCartPage.clickAddtocartByInd(randomNumber)    
        productList.push(pages.shopingCartPage.getItemInfoByIndex(randomNumber))
        exclude.push(randomNumber)   
    } 
}

function sort(productArray){
    productArray.sort(function(obj1, obj2) {
        return obj2.name.localeCompare(obj1.name);
    });
}


module.exports = { random, randomize, addRandomProducts, sort};
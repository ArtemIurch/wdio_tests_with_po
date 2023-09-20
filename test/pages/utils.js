 // получаем рандомное число от 0 до 5 
 function random(min, max) {        
    return Math.floor(Math.random() * (max-1 - min + 1)) + min; 
}


module.exports = { random };
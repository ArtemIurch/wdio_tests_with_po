 // получаем рандомное число от 0 до 5 
 function randomnumber(min, max) {        
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function randomize(min, max, exclude) {        
    let randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * (max - min + 1)) + min; 
          } while (exclude.includes(randomNumber));
          return randomNumber;
    }
module.exports = {randomnumber, randomize};
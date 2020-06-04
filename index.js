const readlineSync = require('readline-sync');

console.log("Hi there, welcome to the counsel")
setTimeout(function() {
    console.log("There is great wisdom here")
}, 3000);
let name = ""
setTimeout(function() {
    name = readlineSync.question('What is your name? ');

}, 6000);


setTimeout(function() {
    console.log(name + " I can see you're troubled.")
}, 8000);





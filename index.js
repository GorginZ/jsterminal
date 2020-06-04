const readlineSync = require('readline-sync');

console.log("Hi there, welcome to the counsel")

    console.log("There is great wisdom here")



race = ['High Elf', 'Human', 'Dragonborn', 'Dwarf', 'Gnome', 'Orc', 'Half-Orc', 'Half-Elf', 'Tiefling'],
index = readlineSync.keyInSelect(race, 'Which race?');
console.log('Ok, ' + race[index]);

let name = ""
name = readlineSync.question('What is your name? ');


classes = ['Paladin', 'Bard', 'Barbarian', 'Ranger', 'Cleric','Druid','Fighter','Monk','Wizard','Warlock','Sorcerer','Rogue'],
class_index = readlineSync.keyInSelect(classes, `What class are you ${race[index]}?`);


alignment = ['Lawful Good', 'Chaotic Good', 'Chaotic Neutral', 'Lawful Neutral', 'Chaotic Evil', 'Lawful Evil'],
alignment_index = readlineSync.keyInSelect(alignment, `What is your alignment?`);
console.log('Ok, ' + alignment[alignment_index] + ' is your alignment.');

// dice roll for stats
function rolldice() {
    var x = Math.floor(Math.random() * 10 + 1);
    var dicetotal = x;
    console.log(x);
};

rolldice()

    console.log(name + " I can see you're troubled.")

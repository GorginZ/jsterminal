const readlineSync = require('readline-sync');
const fetch = require('node-fetch');

// console.log("Hi there, welcome to the counsel")

// console.log("There is great wisdom here")
const requestRaces = async () => {
    try {
        const BASE_URL = 'https://www.dnd5eapi.co/api/';
        const response = await fetch(`${BASE_URL}/races`);
    
        if (!response.ok) throw new Error('Race not Found!');
    
        const data = await response.json();
        

        return data;
    } catch (error) {
        console.log(error.message);
        return null;
    }
};

const app = async () =>{

    const race_data = await requestRaces();
    // await new Promise(r => setTimeout(r, 2000));
    if(race_data){
        const races = [];
        for(value in race_data["results"][1]){
            races.push(value["name"]);
        }
        console.log(race);
        index = readlineSync.keyInSelect(race, 'Which race?');
        console.log('Ok, ' + race[index]);
        const your_race = race[index];
        // const what_race = await requestUserData(your_race.toLowerCase());
    }


let name = ""
name = readlineSync.question('What is your name? ');

classes = ['Paladin', 'Bard', 'Barbarian', 'Ranger', 'Cleric','Druid','Fighter','Monk','Wizard','Warlock','Sorcerer','Rogue'],
class_index = readlineSync.keyInSelect(classes, `What class are you ${race[index]}?`);

alignment = ['Lawful Good', 'Chaotic Good', 'Chaotic Neutral', 'Lawful Neutral', 'Chaotic Evil', 'Lawful Evil'],
alignment_index = readlineSync.keyInSelect(alignment, `What is your alignment?`);
console.log('Ok, ' + alignment[alignment_index] + ' is your alignment.');

// console.log(name + "  Now we must see what your strengths are, there is a great journey ahead of you")

// each class has different starting values
// each race has different starting values
//to do: what classes each race can be // rolling for modifiers not base values
// dice roll for stats
// can reroll but only once
// 1 extra point to 2 different skills
// race influences starting skills
function rolldice() {
    const x = Math.floor(Math.random() * 10 + 1);
    return x;
};

const stats = [];
for(i = 1; i < 5; i++){
    stats.push(rolldice());
}

let stat_string = 'You rolled'
for(num of stats){
    stat_string += `, ${num}`;
}
console.log(stat_string);

    // console.log(name + " I can see you're troubled.")



}

app();
const readlineSync = require("readline-sync");
const fetch = require("node-fetch");
const _ = require("lodash");
const { Select } = require("enquirer");
const { rollD6, getStats } = require('./utilities');
var inquirer = require("inquirer");
//character object
class Character {}

// console.log("Hi there, welcome to the counsel")

// console.log("There is great wisdom here")
const requestRaces = async () => {
  try {
    const BASE_URL = "https://www.dnd5eapi.co/api/";
    const response = await fetch(`${BASE_URL}/races`);

    if (!response.ok) throw new Error("Race not Found!");

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const chooseRace = async (race_data) => {
  //   console.log(race_data);
  const races = [];
  for (value of race_data.results) {
    // console.log(value);
    races.push(value["name"]);
  }
  //   console.log(races);
  index = readlineSync.keyInSelect(races, "Which race?");
  if (index === -1) {
    process.exit();
  }
  console.log("Ok, " + races[index]);
  const your_race = races[index];
  return your_race;
};

const chooseClass = async (race, race_data) => {
  try {
    const BASE_URL = "https://www.dnd5eapi.co/api/";
    const response = await fetch(`${BASE_URL}/classes`);

    if (!response.ok) throw new Error("classes not Found!");

    const data = await response.json();
    const classes = [];

    for (value of data.results) {
      classes.push(value["name"]);
    }

    index = readlineSync.keyInSelect(classes, `What class are you ${race}?`);

    if (index === -1) {
      process.exit();
    }

    console.log("Ok, " + classes[index]);
    const your_class_response = await fetch(
      `${BASE_URL}/classes/${classes[index].toLowerCase()}`
    );

    if (!your_class_response.ok) throw new Error("class not Found!");

    const your_class = await your_class_response.json();

    return your_class;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const retrieveStat = async (stat) =>{
  try {
    const BASE_URL = "https://www.dnd5eapi.co/api/";
    const response = await fetch(`${BASE_URL}/ability-scores/${stat}`);

    if (!response.ok) throw new Error("Stat not Found!");

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

// const statSelector = (stringStats, stat) => {
//   let prompt = new Select({
//     name: "stats",
//     message: `Pick a number for ${stat}`,
//     choices: stringStats,
//   });
//   prompt
//     .run()
//     .then((answer) => {
//       console.log(`${stat}: `, answer);
//       return answer;
//     })
//     .catch(console.error);
// };

const app = async () => {
  // creates your character
  const character = new Character();
  const race_data = await requestRaces();
  character.your_race = await chooseRace(race_data);
  character.your_class = await chooseClass(character.your_race, race_data);

  // await new Promise(r => setTimeout(r, 2000));

  let name = "";
  name = readlineSync.question("What is your name? ");

  (alignment = [
    "Lawful Good",
    "Chaotic Good",
    "Chaotic Neutral",
    "Lawful Neutral",
    "Chaotic Evil",
    "Lawful Evil",
  ]),
    (alignment_index = readlineSync.keyInSelect(
      alignment,
      `What is your alignment ${name} the ${character.your_race}?`
    ));
  console.log("Ok, " + alignment[alignment_index] + " is your alignment.");

  console.log(
    name +
      "  Now we must see what your strengths are, there is a great journey ahead of you"
  );

  // each class has different starting values
  // each race has different starting values
  //to do: what classes each race can be // rolling for modifiers not base values
  // dice roll for stats
  // can reroll but only once
  // 1 extra point to 2 different skills
  // race influences starting skills 

  const stats = getStats();
  const stringStats = [];
  stats.forEach((number) => {
    stringStats.push(number.toString());
  });
 
  let stat_string = "You rolled";
  for (num of stats) {
    stat_string += `, ${num}`;
  }
  console.log(stat_string);
  const stat_names = [
    "str",
    "dex",
    "con",
    "int",
    "wis",
    "cha",
  ];

  for (stat of stat_names) {
    const ability =  await retrieveStat(stat);
    console.log(ability.desc[0]);
    await inquirer
      .prompt([
        {
          type: "list",
          name: `${stat}`,
          message: `What value do you want to assign ${stat}?`,
          choices: stringStats,
        },
      ])
      .then((answers) => {
        stringStats.splice(stringStats.indexOf(answers[stat]), 1);
        character[stat] = answers[stat];
      });
    }
    
    // await console.log(character);
    await console.log(character.your_class.proficiencies);
    await console.log(character.your_class.proficiency_choices);
    // for(j = 1; j <= character.your_class.)
    inquirer
.prompt([
  {
    type: 'checkbox',
    message: 'Select your proficiencies',
    name: 'Proficiencies',
    choices: character.your_class.proficiency_choices[0].from,
    validate: function(answer) {
      if (answer.length != character.your_class.proficiency_choices[0].choose) {
        return `You must choose ${character.your_class.proficiency_choices[0].choose}`;
      }

      return true;
    }
  }
])
.then(answers => {
  console.log(JSON.stringify(answers, null, '  '));
});
    // for(i = 1; i <= character.your_class.proficiency_choices[0].choose; i++){
    //   await inquirer
    //   .prompt([
    //     {
    //       type: "list",
    //       name: `Proficiency ${i}`,
    //       message: `What proficiency do want?`,
    //       choices: character.your_class.proficiency_choices[0].from
    //     },
    //   ])
    //   .then((answers) => {
    //     // stringStats.splice(stringStats.indexOf(answers[stat]), 1);
    //     character[`proficiency${i}`] = answers[stat];
    //   });
    // }
  // console.log(name + " I can see you're troubled.")
};

app();

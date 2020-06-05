const _ = require("lodash");
const { Select } = require("enquirer");
const { rollD6, getStats } = require('./utilities');
const { chooseClass, retrieveStat, requestRaces } = require('./char_api');
var inquirer = require("inquirer");
//character object
class Character {}

// console.log("Hi there, welcome to the counsel")

// console.log("There is great wisdom here")

const chooseRace = async (race_data) => {
  //   console.log(race_data);
  const races = [];
  for (value of race_data.results) {
    // console.log(value);
    races.push(value["name"]);
  }
  //   console.log(races);
  let your_race  = '';
  await inquirer
  .prompt([
    {
      type: "list",
      name: `race`,
      message: `Which race?`,
      choices: races,
    },
  ])
  .then((answers) => {
    console.log(answers);
    your_race = answers.race;
  });

  // index = readlineSync.keyInSelect(races, "Which race?");
  // if (index === -1) {
  //   process.exit();
  // }
  console.log("Ok, " + your_race);
  return your_race;

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
}

const app = async () => {
  // creates your character
  const character = new Character();
  const race_data = await requestRaces();
  character.your_race = await chooseRace(race_data);
  character.your_class = await chooseClass(character.your_race, race_data);

  // await new Promise(r => setTimeout(r, 2000));
  
  let name = "";
  await inquirer.prompt(
    {
      type: 'input',
      name: 'name',
      message: "What is your name?"
    }
    ).then(answers => {
    name = answers.name;
  });

  // name = readlineSync.question("What is your name? ");

  
  alignment = [
    "Lawful Good",
    "Chaotic Good",
    "Chaotic Neutral",
    "Lawful Neutral",
    "Chaotic Evil",
    "Lawful Evil",
  ]
    await inquirer
    .prompt([
      {
        type: "list",
        name: `alignment`,
        message: `What is your alignment ${name} the ${character.your_race}?`,
        choices: alignment,
      },
     ])
    .then((answers) => {
       console.log(answers);
       your_alignment = answers.alignment;
     });
    console.log("Ok, " + your_alignment + " is your alignment.");
    
    console.log(
    name +
      "  Now we must see what your abilities are, there is a great journey ahead of you!"
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
    // await console.log(character.your_class.proficiencies);
    // await console.log(character.your_class.proficiency_choices);
    for(i = 0; i < character.your_class.proficiency_choices.length; i++){
      await console.log(`Choose ${character.your_class.proficiency_choices[i].choose} proficiencies`);
      await inquirer
        .prompt([
        {
          type: 'checkbox',
          message: 'Select your proficiencies',
          name: `proficiencies`,
          choices: character.your_class.proficiency_choices[i].from,
          validate: function(answer) {
            if (answer.length != character.your_class.proficiency_choices[i].choose) {
              return `You must choose ${character.your_class.proficiency_choices[i].choose}`;
            }
  
            return true;
          }
        }
      ])
      .then(answers => {
        character[`Proficiency#${i+1}`] = answers.proficiencies;
      });
    }
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
  console.log(character);
};

app();

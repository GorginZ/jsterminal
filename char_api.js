const fetch = require("node-fetch");
const inquirer = require("inquirer");

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
  
    //   index = readlineSync.keyInSelect(classes, `What class are you ${race}?`);
      let class_choice = '';
      await inquirer
      .prompt([
        {
          type: "list",
          name: `class`,
          message: `What class are you ${race}?`,
          choices: classes,
        },
      ])
      .then((answers) => {
        console.log(answers);
        console.log("Ok, " + answers.class);
        class_choice = answers.class;
    });
    
        const your_class_response = await fetch(`${BASE_URL}/classes/${class_choice.toLowerCase()}`);

        if (!your_class_response.ok) throw new Error("class not Found!");

        const your_class = await your_class_response.json();

        return your_class;
    //   if (index === -1) {
    //     process.exit();
    //   }
  
      
    } catch (error) {
      console.log(error.message);
      return null;
    }
};

module.exports = {
    retrieveStat,
    requestRaces,
    chooseClass
}
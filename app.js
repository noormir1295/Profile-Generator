const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//Empty array to show different roles
const teamArray=[];

//Manager Questions
const managerQuestions = [
  {
    type: "Input",
    name: "managerName",
    message:
      "Who is the manager of this team? If you are the manager, please write your name.",
  },
  {
    type: "Input",
    name: "managerId",
    message:
      "What is this managers ID number? Enter your ID number if you are the manager of this team.",
  },
  {
    type: "Input",
    name: "managerEmail",
    message:
      "What is this managers email address? Enter your email adress if you are the manager.",
  },
  {
    type: "Input",
    name: "managerOfficeNumber",
    message:
      "What is this managers office number? if you are the manager of this team, enter your office number",
  },
];
//Engineer Questions
const engineerQuestions = [
  {
    type: "Input",
    name: "engineerName",
    message:
      "Who is the Engineer of this project?",
  },
  {
    type: "Input",
    name: "engineerId",
    message:
      "What is the ID number of the engineer?",
  },
  {
    type: "Input",
    name: "engineerEmail",
    message:
      "What is the email of the Engineer",
  },
  {
    type: "Input",
    name: "github",
    message:
      "What is the engineers github?",
  },
];

//Intern
const internQuestions = [
  {
    type: "Input",
    name: "internName",
    message: "Who is the Intern of this project?",
  },
  {
    type: "Input",
    name: "internId",
    message: "What is the ID number of the Intern?",
  },
  {
    type: "Input",
    name: "internEmail",
    message: "What is the email of the Intern",
  },
  {
    type: "Input",
    name: "school",
    message: "What school does the Intern attend to or has attended?",
  },
]; 

//Adding additional intern or engineer
const anotherPerson = [
  {
    type: "list",
    name: "nextEmployee",
    message: "Would you like to add another person in this project? If not, select Done",
    choices:["Engineer", "Intern", "Done"]
  },
];


 

//next person function 

function next(){
    inquirer.prompt(anotherPerson).then((response)=>{
        console.log(response);
        switch (response.nextEmployee) {
      case "Engineer":
        engineerPrompt();
        break;
      case "Intern":
        internPrompt();
        break;
      case "Done":
        console.log("Creating your team!");
        makeTeam();
    };
});
}

//manager prompt
function managerPrompt() {
    inquirer.prompt(managerQuestions).then((response)=>{
        let name=response.managerName;
        let id=response.managerId;
        let email=response.managerEmail;
        let office=response.managerOfficeNumber;

    // creating object
    const manager = new Manager(name, id, email, office);

    teamArray.push(manager);
        console.log(teamArray)
    next();
    })
}
//creating prompt for engineer
function engineerPrompt(){
    inquirer.prompt(engineerQuestions).then((response)=>{
        let name=response.engineerName;
        let id=response.engineerId;
        let email=response.engineerEmail;
        let github=response.github;

        const engineer = new Engineer(name, id, email, github);
        //pushing engineer to team array
        teamArray.push(engineer);
        console.log(teamArray)
        next();

    })
}
//creating prompt for intern 
function internPrompt(){
    inquirer.prompt(internQuestions).then((response)=>{
    let name=response.internName;
    let id=response.internId;
    let email=response.internEmail;
    let school=response.school;

    const intern= new Intern(name, id, email, school);
//pushing intern to team array
    teamArray.push(intern);
    console.log(teamArray);
    next();
    });
}

//starting prompt with manager 
function init() {
    managerPrompt();
};
//vreating html file for the whole team
function makeTeam(){
    fs.writeFile(outputPath, render(teamArray), (err) =>{
        if(err){
           return console.log(err)
        }
    });
}

init();


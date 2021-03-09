const Manager = require("./Develop/lib/Manager");
const Engineer = require("./Develop/lib/Engineer");
const Intern = require("./Develop/lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./Develop/lib/htmlRenderer");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const employeeList = [];

//Create an employee
function createEmployee () {
    inquirer.prompt([
        {
            name: "role",
            type: "list",
            message: "What is your position?",
            choices: [
                "Manager",
                "Engineer",
                "Intern"
            ],
        },
        {
            type: "input",
            meggage: "what is your name?",
            name: "name"
        },
        {
            type: "input",
            message: "what is your employee id?",
            name: "id"
        },
        {
            type: "input",
            message: "what is your email?",
            name: "email"
        }
    ])
      .then((user) => {
          if (user.role === "Manager"){
              return renderManager(user);
          }
          else if (user.role === "Engineer"){
              return renderEngineer(user);
          }
          else if (user.role === "Intern"){
              return renderIntern(user);
          }
      });
    
}

createEmployee();

function addEmployee() {
    return inquirer.prompt([
        {
            name: "addEmployee",
            message: " would you like to add another employee?",
            type: "confirm"
        }
    ])
      .then((response) => {
        if(response.addEmployee){
            createEmployee();
        }
        else {
            createHtmlFile();
            return;
        }
      });
};

function renderManager(response){
    return inquirer.prompt([
        {
            name: "number",
            message: "what is your office number?",
            type: "input"
        }
    ])
      .then((managerData) => {
          const manager = new Manager(response.name, response.id, response.email, managerData.number);

          employeeList.push(manager);

          addEmployee();
      });
};

function renderEngineer(response) {
    return inquirer.prompt([
        {
            name: "github",
            message: "what is your github username?",
            type: "input"
        }
    ])
      .then((engineerData) => {
          const engineer = new Engineer(response.name, response.id, response.email, engineerData.github);
          
          employeeList.push(engineer);

          addEmployee();

      })
};

function renderIntern(response) {
    return inquirer.prompt([
        {
            name: "school",
            message: "what school do you go to?",
            type: "input"
        }
    ])
      .then((internData) => {
          const intern = new Intern(response.name, response.id, response.email, internData.school);

          employeeList.push(intern);

          addEmployee();
      })
};

function createHtmlFile() {
    const htmlContent = render(employeeList);

    fs.writeFile( outputPath, htmlContent, (err) => 
    err ? console.error("Failed to create HTML file:(") : console.error("New HTML file has been created!:)"));
}

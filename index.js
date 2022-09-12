const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/manager");
const Intern = require("./lib/intern");
const Engineer = require("./lib/engineer");

const teamMembers = [];
const teamIds = [];
const renderHtml = require("./src/generateHtml")


function buildTeam() {
    console.log("Start building the team profile.")
    function addManager () {
        inquirer.prompt([
            {
                type: 'input',
                name: 'managerName',
                message: 'Input the name of the team manager.',
                validate: input => {
                    if (input !== "" && isNaN(input)) {
                        return true;
                    }
                    return 'You must enter a valid name.';
                }
            },
            {
                type: 'input',
                name: 'managerId',
                message: 'Input the manager employee ID number.',
                validate: input => {
                    if (input !== "" && !isNaN(input)) {
                        return true;
                    }
                    return 'You must enter a number.';
                }
            },
            {
                type: 'input',
                name: 'managerEmail',
                message: 'Input the manager email address.',
                validate: input => {
                    if (input !== "" && /^\S+@\S+\.(com|net|gov)/.test(input)) {
                        return true;
                    }
                    return 'You must enter an email address.';
                }
            },
            {
                type: 'input',
                name: 'managerOfficeNumber',
                message: 'Input the manager office number.',
                validate: input => {
                    if (input !== "" && !isNaN(input)) {
                        return true;
                    }
                    return 'You must enter a number.';
                }
            }
        ]).then(inputs => {
            const manager = new Manager(inputs.managerName, inputs.managerId, inputs.managerEmail, inputs.managerOfficeNumber);
            teamMembers.push(manager);
            teamIds.push(inputs.managerId);
            addTeamMembers();
        });
    }

    function addTeamMembers() {
        inquirer.prompt([
            {
                type: 'list',
                name: 'memberRole',
                message: 'Select the team member role to add next.',
                choices: [
                    'Intern',
                    'Engineer',
                    'No other members to add to team.'
                ]
            }
        ]).then(selection => {
            switch (selection.memberRole) {
                case 'Intern':
                    addIntern();
                    break;
                case 'Engineer':
                    addEngineer();
                    break;
                default:
                    generateHtml();
            }
        })
    }

    function addIntern() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'internName',
                message: 'Input the name of the intern.',
                validate: input => {
                    if (input !== "" && isNaN(input)) {
                        return true;
                    }
                    return 'You must enter a valid name.';
                }
            },
            {
                type: 'input',
                name: 'internId',
                message: 'Input the intern employee ID number.',
                validate: input => {
                    if (input !== "" && !isNaN(input)) {
                        return true;
                    }
                    return 'You must enter a number.';
                }
            },
            {
                type: 'input',
                name: 'internEmail',
                message: 'Input the intern email address.',
                validate: input => {
                    if (input !== "" && /^\S+@\S+\.(com|net|gov)/.test(input)) {
                        return true;
                    }
                    return 'You must enter an email address.';
                }
            },
            {
                type: 'input',
                name: 'internSchool',
                message: 'Input the school the intern employee attends.',
                validate: input => {
                    if (input !== "" && isNaN(input)) {
                        return true;
                    }
                    return 'You must enter a school.';
                }
            }
        ]).then(inputs => {
            const intern = new Intern(inputs.internName, inputs.internId, inputs.internEmail, inputs.internSchool);
            teamMembers.push(intern);
            teamIds.push(inputs.internId);
            addTeamMembers();
        })
    }

    function addEngineer() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'engineerName',
                message: 'Input the name of the engineer.',
                validate: input => {
                    if (input !== "" && isNaN(input)) {
                        return true;
                    }
                    return 'You must enter a valid name.';
                }
            },
            {
                type: 'input',
                name: 'engineerId',
                message: 'Input the engineer employee ID number.',
                validate: input => {
                    if (input !== "" && !isNaN(input)) {
                        return true;
                    }
                    return 'You must enter a number.';
                }
            },
            {
                type: 'input',
                name: 'engineerEmail',
                message: 'Input the engineer email address.',
                validate: input => {
                    if (input !== "" && /^\S+@\S+\.(com|net|gov)/.test(input)) {
                        return true;
                    }
                    return 'You must enter an email address.';
                }
            },
            {
                type: 'input',
                name: 'engineerGithub',
                message: 'Input the school the engineer GitHub username.',
                validate: input => {
                    if (input !== "" && isNaN(input)) {
                        return true;
                    }
                    return 'You must enter a username.';
                }
            }
        ]).then(inputs => {
            const engineer = new Engineer(inputs.engineerName, inputs.engineerId, inputs.engineerEmail, inputs.engineerGithub);
            teamMembers.push(engineer);
            teamIds.push(inputs.engineerId);
            addTeamMembers();
        })
    }

    function generateHtml() {
        fs.writeFileSync('./dist/index.html', renderHtml(teamMembers), 'utf-8')
        .then(() => console.log('Team profile generated'))
        .catch ((err) => console.log(err))
    }

    addManager();
}

buildTeam();



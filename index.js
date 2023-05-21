const inquirer = require('inquirer');
const mysql = require('mysql2');

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'012204Lovelexy()'
});

con.connect(async function(err) {
    if(err) throw err;
    console.log("Connected to mysql at " +con.threadId+"\n");
    showMenu();
});


const showMenu = () => {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'menu',
            message: 'What do you want to do?',
            choices: [
                { name: 'View all employees', value: 'viewEmployees'},
                { name: 'Add employee', value: 'addEmployee'},
                { name: 'Update employee role', value: 'updateEmployee'},
                { name: 'View all roles', value: 'viewRoles'},
                { name: 'Add role', value: 'addRole'},
                { name: 'View all departments', value: 'viewDepartments'},
                { name: 'Add department', value: 'addDepartment'},
                { name: 'Quit', value: 'quit'}
            ]
        }
    ]).then((answers) => {
        const { choices } = answers;

        if (choices === 'ViewEmployees') {
            console.log('test');
        }
    }) 
}


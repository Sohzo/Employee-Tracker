const inquirer = require('inquirer');
const mysql = require('mysql2');

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'012204Lovelexy()',
    database: 'employeetracker_db'
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
                'View all employees',
                'Add employee',
                'Update employee role',
                'View all roles',
                'View all departments',
                'Add department',
                'Quit',
            ]
        }
    ]).then((answers) => {
    
        if (answers.menu === 'View all employees') {
            showEmployees();
        };

        if (answers.menu === 'Add employee') {
            addEmployee();
        };

        if (answers.menu === 'Update employee role') {
            updateRole();
        };

        if (answers.menu === 'View all roles') {
            viewRoles();
        };

        if (answers.menu === 'View all departments') {
            viewDepartments();
        };

        if (answers.menu === 'Add department') {
            addDepartment();
        };

        if (answers.menu === 'Quit') {
            con.end()
        };
    }); 
};

showEmployees = () => {
    console.log('Showing all employees\n')

    const sql = `SELECT * FROM employees`
    con.query(sql, (err, rows) => {
        if (err) throw err;
    })
}

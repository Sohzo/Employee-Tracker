const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config()

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: process.env.password,
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
            viewEmployees();
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

viewEmployees = () => {
    console.log('Showing all employees\n')

    const sql = `SELECT * FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.id = departments.id`

    con.query(sql, (err, res) => {
        if (err) throw err;

        console.table(res);

        showMenu();

    })
}

addEmployee = () => {

}

updateRole = () => {

}

viewRoles = () => {
    console.log('Showing all roles\n')

    const sql = `SELECT * FROM roles`
    con.query(sql, (err, res) => {
        if (err) throw err;

        console.table(res)
        showMenu();
    })
}

viewDepartments = () => {
    console.log('Showing all departments\n')
    
    const sql = `SELECT * FROM departments`
    con.query(sql, (err, res) => {
        if (err) throw err;

        console.table(res)
        showMenu();
    });
}

addDepartment = () => {

}



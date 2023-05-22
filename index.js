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
    inquirer.prompt ([
        {
            type: 'input',
            name: 'firstname',
            message: "What is the employee's first name",
            validate: firstName => {
                if (firstName) {
                    return true;
                } else {
                    console.log('Please enter a first name');
                    return false
                }
            }
        },
        {
            
            type: 'input',
            name: 'lastname',
            message: "What is the employee's last name",
            validate: lastName => {
                if (lastName) {
                    return true;
                } else {
                    console.log('Please enter a last name');
                    return false
                }
            }
        }
    ]).then(answer => {
        const fullInfo = [answer.firstname, answer.lastname]

        const roleQuery = `SELECT roles.id, roles.title FROM roles`;

        con.query(roleQuery, (err, res) => {
            if (err) throw err;

            const roles = res.map(({id,title}) => ({ name: title, value: id}));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'role',
                    message: "What is the employee's role?",
                    choices: roles
                }
            ]).then(rolechoice => {
                const role = rolechoice.role
                fullInfo.push(role);

                const managerQuery = `SELECT * FROM employees`;

                con.query(managerQuery, (err, res) => {
                    if (err) throw err;

                    const managers = res.map(({id,first_name,last_name}) => ({ name: first_name + " " + last_name, value: first_name}));

                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'manager',
                            message: "Who manages this employee?",
                            choices: managers
                        }
                    ]).then(managerchoice => {
                        const manager = managerchoice.manager;
                        fullInfo.push(manager)

                        const insSql = `INSERT INTO employees (first_name, last_name, role_id, manager)VALUES (?, ?, ?, ?)`;

                        con.query(insSql, fullInfo, (err, res) => {
                            if (err) throw err;

                            console.log("Employee added");
                            viewEmployees();
                        })
                    })
                })
            })
        })
    })
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



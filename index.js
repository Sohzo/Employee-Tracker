const inquirer = require('inquirer');


const showMenu = () => {
    const menu = [
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
    ]

    return inquirer.prompt(menu);
}



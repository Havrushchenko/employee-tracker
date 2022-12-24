const mysql = require('mysql2');
const inquirer = require("inquirer");
const cTable = require('console.table');

// Connect to database
const connection = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'bonik566569',
        database: 'employee'
    },
    console.log('Connected to the employee database.')
);

const questions = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: [
                'View all departments.',
                'View all roles.',
                'View all employees.',
                'Add a department.',
                'Add a role.',
                'Add an employee.',
                'Update an employee role.'
            ],
            validate: choicesList => {
                if (choicesList) {
                    return true;
                } else {
                    console.log('You must select one from the list!');
                    return false;
                }
            }
        }
    ]).then(function (answers) {
        const { choices } = answers;
        if (choices === "View all departments.") {
            showDepartments();
        }
        if (choices === "View all roles.") {
            showRoles();
        }
        if (choices === "View all employees.") {
            showEmployees();
        }
    });
};

function showDepartments() {
    console.log('Showing all departments');
    const sql = `SELECT department.id AS id, department.name AS department FROM department`;
    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        questions();
    })
};

function showRoles() {
    console.log('Showing all roles');
    const sql = `SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    JOIN department ON role.department_id = department.id`;
    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        questions();
    })
};







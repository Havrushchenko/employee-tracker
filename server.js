// Import mysql2
const mysql = require('mysql2');
// import inquirer 
const inquirer = require("inquirer");
// import console.table
const cTable = require('console.table');

// Connect to database
const connection = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: '',
        database: 'employee'
    },
    console.log('Connected to the employee database.')
);

connection.connect(function (err) {
    if (err) throw err
    console.log("Connected as Id" + connection.threadId)
    questions();
});

// Inquirer prompt
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
                'Add an employee.'
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
        if (choices === "Add a department.") {
            addDepartment();
        }
        if (choices === "Add a role.") {
            addRole();
        }
        if (choices === "Add an employee.") {
            addEmployee();
        }
    });
};

// Function to show all Departments 
showDepartments = () => {
    console.log('Showing all departments');
    const sql = `SELECT department.id AS ID, department.name AS Department FROM department`;
    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        questions();
    })
};

// Function to show all Roles
showRoles = () => {
    console.log('Showing all roles');
    const sql = `SELECT role.id AS ID, role.title AS Job_Title, role.salary AS Salary, department.name AS Department
    FROM role
    INNER JOIN department ON role.department_id = department.id`;
    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        questions();
    })
};

// Function to show all Employees
showEmployees = () => {
    console.log('Showing all employees');
    const sql = `SELECT employee.id AS ID, 
    employee.first_name AS First_Name, 
    employee.last_name AS Last_Name, 
    role.title AS Job_Title, 
    department.name AS Department,
    role.salary AS Salary, 
    CONCAT (manager.first_name, " ", manager.last_name) AS Manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id`;
    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        questions();
    })
};

// Function to show add Department 
addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: "What department do you want to add?",
            validate: department => {
                if (department) {
                    return true;
                } else {
                    console.log('Please enter a department!');
                    return false;
                }
            }
        }
    ])
        .then(answer => {
            const sql = `INSERT INTO department(name)
                    VALUES (?)`;
            connection.query(sql, answer.department, (err, result) => {
                if (err) throw err;
                console.log('Added ' + answer.department + " to departments!");
                showDepartments();
            });
        });
};

// Function to show add Role 
addRole = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "addRole",
            message: "What is the role Title?"

        },
        {
            type: "input",
            name: "addSalary",
            message: "What is the Salary?"

        },
        {
            type: "input",
            name: "addDepartment",
            message: "What is the Department?"

        },
    ])
        .then(answer => {
            const sql = `INSERT INTO role (title, salary, department_id)
            VALUES (?, ?, ?)`;
            const params = [answer.addRole, answer.addSalary, answer.addDepartment];
            connection.query(sql, params, (err, result) => {
                if (err) throw err;
                console.log('Added ' + answer.addRole, answer.addSalary, answer.addDepartment + " to departments!");
                showRoles();
            });
        });

}

// Function to add Employee 
addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?"

        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?"

        },
        {
            type: "input",
            name: "role",
            message: "What is the employee's role?"

        },
        {
            type: "input",
            name: "manager",
            message: "What is the employee's manager?"

        },
    ])
        .then(answer => {
            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES (?, ?, ?, ?)`;
            const params = [answer.firstName, answer.lastName, answer.role, answer.manager];
            connection.query(sql, params, (err, result) => {
                if (err) throw err;
                console.log('Added ' + answer.firstName, answer.lastName, answer.role, answer.manager + " to departments!");
                showEmployees();
            });
        });
}






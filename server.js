const inquirer = require("inquirer");
const cTable = require('console.table');
const mysql = require('mysql2');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: '',
        database: 'employee'
    },
    console.log('Connected to the election database.')
);

const questions = [
    {
        type: 'list',
        name: 'choise',
        message: 'What would you like to do?',
        choices: [
            'View all departments.',
            'View all roles.',
            'View all employees.',
            'Add a department.',
            'Add a role.',
            'Add an employee.',
            'Update an employee role.',
        ],
        validate: choiceList => {
            if (choiceList) {
                return true;
            } else {
                console.log('You must select one from the list!');
                return false;
            }
        }
    }
];

inquirer.prompt(questions).then((answers) => {
    console.log('\nOrder receipt:');
    console.log(JSON.stringify(answers, null, '  '));
});

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // Add MySQL password here
    password: 'password',
    database: 'employeetracker_db'
  },
);

function question(){

    let employeeChoices = [];
        db.query('SELECT first_name, last_name FROM employees', function (err, results) {
                if (err) throw err;
                for (let i = 0; i < results.length; i++) {
                employeeChoices.push(results[i].first_name + " " + results[i].last_name);
                } 
              });
    let roleChoices = [];
            db.query('SELECT title FROM role', function (err, results) {
                if (err) throw err;
                for (let i = 0; i < results.length; i++) {
                roleChoices.push(results[i].title);
                } 
              });
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices:[
               "View All Employees",
               "Add Employee",
               "Update Employee Role",
               "View All Roles",
               "Add Role",
               "View All Departments",
               "Add Department",
               "Quit"
            ]
        }
    ])

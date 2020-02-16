// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "************",
    database: "employee_tracker_db"
});

connection.connect((err) => {
    if (err) throw err;
    // console.log("Connected");
    // connection.end();
    start();
});

function start() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["View departments", "View roles", "View employees", "Add department", "Add role", "Add employee", "Update employee roles", "EXIT"]
    }).then(function (answer) {
        switch (answer.action) {
            case "View departments":
                viewDepartments();
            case "View roles":
                viewRoles();
            case "View employees":
                viewEmployees();
            case "Add department":
                addDepartment();
            case "Add role":
                addRole();
            case "Add employee":
                addEmployee();
            case "Update employee role":
                updateEmployeeRole();
            default:
                connection.end();
        }
    });
}

function viewDepartments() {

}

function viewRoles() {

}

function viewEmployees() {

}

function addDepartment() {

}

function addRole() {

}

function addEmployee() {

}

function updateEmployeeRole() {

}
// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "homework",
    password: "12345",
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
                break;
            case "View roles":
                viewRoles();
                break;
            case "View employees":
                viewEmployees();
                break;
            case "Add department":
                addDepartment();
                break;
            case "Add role":
                addRole();
                break;
            case "Add employee":
                addEmployee();
                break;
            case "Update employee role":
                updateEmployeeRole();
                break;
            case "EXIT":
                connection.end();
                break;
        }
    });
}

function viewDepartments() {
    const query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        console.log("\n")
        console.table(res);
        start();
    });
}

function viewRoles() {
    const query = `
    SELECT 
        role.id, role.title, role.salary, department.name 
    FROM 
        role 
    LEFT JOIN 
        department 
    ON (role.department_id = department.id)`

    connection.query(query, function (err, res) {
        console.log("\n");
        console.table(res);
        start();
    })

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
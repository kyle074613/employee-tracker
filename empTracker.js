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
    const query = "SELECT * FROM department ORDER BY id";
    connection.query(query, function (err, res) {
        console.log("\n")
        console.table(res);
        start();
    });
}

function viewRoles() {
    const query = `
    SELECT 
        role.id, role.title, role.salary, department.department
    FROM 
        role 
    LEFT JOIN 
        department 
    ON (role.department_id = department.id)
    ORDER BY id`;

    connection.query(query, function (err, res) {
        console.log("\n");
        console.table(res);
        start();
    });

}

function viewEmployees() {
    const query = `
    SELECT
        employee.id, employee.first_name, employee.last_name, 
        role.title, department.department, role.salary, 
        concat(manager.first_name, ' ', manager.last_name) AS manager 
    FROM
        employee AS employee
    LEFT JOIN
        role
    ON (role.id = employee.role_id)
    LEFT JOIN 
        department
    ON (department.id = role.department_id)
    LEFT JOIN
        employee AS manager
    ON (employee.manager_id = manager.id)
    ORDER BY id`;

    connection.query(query, function (err, res) {
        console.log("\n");
        console.table(res);
        start();
    });
}

function addDepartment() {
    inquirer.prompt({
        name: "depName",
        type: "input",
        message: "Enter department name. "
    }).then(function (answer) {
        const query = `INSERT INTO department SET ?`;
        connection.query(query, { department: answer.depName }, function (err) {
            if (err) throw err;

            console.log(`${answer.depName} added to the list of departments.`)

            start();
        });
    });
}

function addRole() {
    connection.query("SELECT * FROM department", function (err, res) {
        inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "Enter role title. "
            },
            {
                name: "salary",
                type: "input",
                message: "Enter role salary. "
            },
            {
                name: "department",
                type: "list",
                message: "Choose department: ",
                choices: function () {
                    let depArray = [];
                    for (let i = 0; i < res.length; i++)
                        depArray.push(res[i].department);

                    return depArray;
                }
            }
        ]).then(function (answer) {
            connection.query("SELECT id FROM department WHERE department = ?", answer.department, function (err, res) {
                if (err) throw err;

                connection.query("INSERT INTO role SET ?",
                    {
                        title: answer.title,
                        salary: answer.salary,
                        department_id: res[0].id
                    },
                    function (err) {
                        if (err) throw err;

                        console.log(`${answer.title} added to the list of roles.`)
                        start();
                    }
                );
            });
        });
    });


    // Reference code on where to begin for this
    // connection.query("SELECT id FROM department WHERE department = 'Sales'", function (err, res) {
    //     console.log(res[0].id);
    //     start();
    // })
}

function addEmployee() {
    connection.query("SELECT * FROM role", function (err, roleRes) {
        if (err) throw err;
        connection.query("SELECT concat(first_name, ' ', last_name) AS full_name FROM employee", function (err, empRes) {
            inquirer.prompt([
                {
                    name: "firstName",
                    type: "input",
                    message: "Enter first name. "
                },
                {
                    name: "lastName",
                    type: "input",
                    message: "Enter last name. "
                },
                {
                    name: "role",
                    type: "list",
                    message: "What is the employee's role?",
                    choices: function () {
                        let roleArray = []
                        for (let i = 0; i < roleRes.length; i++)
                            roleArray.push(roleRes[i].title)
                        return roleArray;
                    }
                },
                {
                    name: "manager",
                    type: "list",
                    message: "Who is the employee's manager?",
                    choices: function () {
                        let manArray = ['None'];
                        for (let i = 0; i < empRes.length; i++)
                            manArray.push(empRes[i].full_name)
                        return manArray;
                    }
                }
            ]).then(function (answer) {
                connection.query("SELECT id FROM role WHERE title = ?", answer.role, function (err, roleIdRes) {
                    connection.query("SELECT id FROM employee WHERE concat(first_name, ' ', last_name) = ?", answer.manager, function (err, manIdRes) {
                        let managerId;
                        if (answer.manager === "None")
                            managerId = null;
                        else
                            managerId = manIdRes[0].id;

                        connection.query("INSERT INTO employee SET ?",
                            {
                                first_name: answer.firstName,
                                last_name: answer.lastName,
                                role_id: roleIdRes[0].id,
                                manager_id: managerId
                            },
                            function (err) {
                                if (err) throw err;

                                console.log(`${answer.firstName} ${answer.lastName} has been added to the list of employees.`)

                                start();
                            }
                        );
                    });
                });
            });
        });
    });
}

function updateEmployeeRole() {

}
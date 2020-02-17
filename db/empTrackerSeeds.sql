USE employee_tracker_db;

INSERT INTO 
    department (department) 
VALUES 
    ("Sales"), 
    ("Engineering"), 
    ("Finance"), 
    ("Legal");

INSERT INTO 
    role (title, salary, department_id) 
VALUES 
    ("Sales Lead", 100000, 1), 
    ("Salesperson", 80000, 1), 
    ("Lead Engineer", 150000, 2),
    ("Software Engineer", 120000, 2),
    ("Accountant", 125000, 3),
    ("Account Manager", 140000, 3),
    ("Legal Team Lead", 190000, 4),
    ("Lawyer", 150000, 4);

INSERT INTO 
    employee (first_name, last_name, role_id, manager_id)
VALUES
    ("John", "Doe", 1, null),
    ("Jane", "Smith", 2, 1),
    ("Tom", "Riddle", 3, null),
    ("Jim", "John", 5, null);

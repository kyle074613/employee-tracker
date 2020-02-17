# employee-tracker

This app is a command line app where the user can choose what to do with multiple tables of business data. The user can choose to view the list of departments, roles, and employees from the corresponding tables, choose to add a department, role, or employee to the corresponding tables, or update the role of an existing employee. All this is done using SQL queries in the javascript file to communicate with an SQL database.

## Usage

The user must first user run the empTrackerSchema.sql file (located in the db folder) in mySQL Workbench to create the database and tables. After that, the user must run the empTrackerSeeds.sql file (also located in the db folder) in mySQL Workbench to populate the tables. Once the databse and tables have been created and populated, the user must then enter their SQL username and password in the user and password fields at the begining of the javascript file. The user can then run the application in the command line (node empTracker.js).


## Built With

* [Inquirer](https://www.npmjs.com/package/inquirer) - Used to create prompts in Node.
* [mySQL npm package](https://www.npmjs.com/package/mysql) - Used to connect to mySQL database.
* [console.table](https://www.npmjs.com/package/console.table) - Used to format data tables in the command console.
* [mySQL Workbench](https://www.mysql.com/products/workbench/) - Used to manage databases.

## License

MIT License

Copyright (c) 2019 Kyle Jones

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
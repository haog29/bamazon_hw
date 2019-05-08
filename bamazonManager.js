var { createConnection } = require('mysql2');
var inquirer = require('inquirer');

// Sets up connection to SQL server

var db = createConnection({

    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon'

});

//part2 challenge:
//this will be done soon..
//work in pogress.
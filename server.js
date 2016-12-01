const express = require('express');
const mysql = require('mysql');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelizeConnection = require('./db');
const connection = mysql.createConnection({
	debug: false,
	host: db_config.host,
	user: db_config.user,
	password: db_config.pass,
	database: db_config.db,
	socketPath: '/var/run/mysqld/mysqld.sock'

})

//body-parser middleware adds .body property to req (if we make a POST AJAX request with some data attached, that data will be accessible as req.body)
app.use(bodyParser.urlencoded({ extended: true }));

//listen on port 8888
app.listen('9999', () => console.log('Listening on port 9999'));


//////////
// YOUR CODE HERE:
//////////

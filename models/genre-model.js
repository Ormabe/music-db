const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');

//models
const Song = require('./song-model');

//////////
// YOUR CODE HERE:
//////////

const Genre = sequelizeConnection.define('genre', {
	title: {
		type: Sequelize.STRING,
		validate: {
			max: 100,
			notEmpty: true
		}
	}
});


module.exports = Genre;

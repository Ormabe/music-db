const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');

//////////
// YOUR CODE HERE:
//////////

var Artist = sequelizeConnection.define('artist', {
	name: {
		type: Sequelize.STRING,
		validate: {
			max: 100,
			notNull: true,
			notEmpty: true
		}
	}
});

module.exports = Artist;

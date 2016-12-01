const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');

//////////
// YOUR CODE HERE:
//////////
var Playlist = sequelizeConnection.define('playlist', {
	title: {
		type: Sequelize.STRING,
		validate: {
			max: 100,
			notNull: true,
			notEmpty: true
		}
	}
});


module.exports = Playlist;

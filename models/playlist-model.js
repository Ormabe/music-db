const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');

//models:
const Song = require('song-model');

//////////
// YOUR CODE HERE:
//////////
var Playlist = sequelizeConnection.define('playlist', {
	title: {
		type: Sequelize.STRING,
		validate: {
			max: 100,
			notEmpty: true
		}
	}
});



module.exports = Playlist;

const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');

//models
const Artist = require('./artist-model');

//////////
// YOUR CODE HERE:
//////////

const Song = sequelizeConnection.define('song', {
	title: {
		type: Sequelize.STRING,
		validate: {
			max: 250,
			notNull: true,
			notEmpty: true
		}
	},
	youtube_url: {
		type: Sequelize.STRING,
		validate: {
			max: 50,
			notNull: true,
			notEmpty: true,
			isUrl: true 
		}
	},
})

Song.belongsTo(Artist);

module.exports = Song;

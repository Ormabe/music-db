const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');

// Models:
const Artist = require('./artist-model');

//////////
// YOUR CODE HERE:
//////////

const Song = sequelizeConnection.define('song', {
	title: {
		type: Sequelize.STRING,
		validate: {
			max: 250,
			notEmpty: true
		}
	},
	youtube_url: {
		type: Sequelize.STRING,
		validate: {
			max: 50,
			notEmpty: true,
			isUrl: true 
		}
	}
})

Song.belongsTo(Artist);
Song.belongsToMany(Genre, {through: 'song_genre'});
Genre.belongsToMany(Song, {through: 'song_genre'});

module.exports = Song;

const express = require('express');
const mysql = require('mysql');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelizeConnection = require('./db');

const Artist = require('./models/artist-model');

//body-parser middleware adds .body property to req (if we make a POST AJAX request with some data attached, that data will be accessible as req.body)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//listen on port 9999
app.listen('9999', () => console.log('Listening on port 9999'));



//////////
// YOUR CODE HERE:
//////////

//GET all artists, ordered a-z
app.get('/api/artists', (req, res) => {
	Artist.findAll({
		order: [ ['name', 'ASC'] ]
	})
	.then( (artists) => {
		res.send(artists);
	})
	.catch( (err) => {
		console.log(err);
	})
});

//GET a specific artist by id
app.get('/api/artists/:id', (req, res) => {
	Artist.findById(req.params.id)
	.then( (artist) => {
		res.send(artist);
	})
	.catch( (err) => {
		console.log(err);
	})
});

//POST a new artist
app.post('/api/artists', (req, res) => {
	Artist.create({
		name: req.body.name
	})
	.then( (newArtist) => {
		res.send(newArtist);
	})
	.catch( (err) => {
		console.log("Error with POSTing new artist", err);
	})
});


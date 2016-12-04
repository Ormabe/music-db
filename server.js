const express = require('express');
// ROUTES FOR OUR API:
// This is an instance of the express router
const router = express.Router();
const mysql = require('mysql');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelizeConnection = require('./db');

// REQUIRE IN ALL MODELS:
const Artist = require('./models/artist-model');
const Genre = require('./models/genre-model');
const Playlist = require('./models/playlist-model');
const Song = require('./models/song-model');

// BODY PARSER MIDDLEWARE ADDS '.body' PROPERTY TO 'req'
// USED TO ACCESS DATA IN POST REQUESTS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ================================================
// MIDDLEWARE TO USE FOR ALL REQUESTS:
var myLogger = (req, res, next) => {
	console.log('Something very exciting is happening');
	next();
};

// TEST THE ROUTE TO ENSURE IT IS WORKING:
router.get('/', function (req, res) {
	res.json({message: 'WOOHOO! We got a router y\'all!'});
})

// ================================================
// ON ROUTES THAT END IN '/artists', AS BELOW:

router.route('/artists')

	// GET ALL ARTISTS, ORDERED BY A-Z:
	.get((req, res) => {
		Artist.findAll({
			order: [['name', 'ASC']]
		})
		.then((artists) => {
			res.send(artists)
		})
		.catch((err) => {
			console.log(err)
		})
	})

	// POST A NEW ARTIST:
	.post((req, res) => {
		Artist.create({
			name: req.body.name
		})
		.then((artist) => {
			res.json(artist)
		})
		.catch((err) => {
			console.log(err)
		})
	});

// ================================================
// ON ROUTES THAT END IN '/artists/:id', AS BELOW:

router.route('/artists/:id')

	// DELETE ONE (1) ARTIST BY ID:
	.get((req, res) => {
		Artist.findById(req.params.id)
		.then( (artist) => {
			res.send(artist);
		})
		.catch( (err) => {
			console.log(err);
		})
	})

	// DELETE ONE (1) ARTIST BY ID:
	.delete((req, res) => {
		Artist.findById(req.params.id) 
		.then(function(artist) {
			artist.destroy()
		})
		.then((data) => {
			console.log('Deleted!')
			res.send(data)
		})
		.catch((err) => {
			res.send(err)
		})
	})

// ================================================
// ON ROUTES THAT END IN '/artists/:id:newName', AS BELOW:

router.route('/artists/:id/:newName')
	.put((req, res) => {
		Artist.findById(req.params.id)
		.then((artist) => {
			// BELOW VERSION IS RECOMMENDED BY EXPRESS, BUT DOES NOT WORK:
			// artist.update({name: req.params}) 

			// BELOW VERSION SUCCESSFULLY UPDATES ARTIST RECORD BASED ON URL:
			artist.update({name: req.param('newName')})
		})
		.then((data) => {
			console.log('Updated Artist\'s Name!')
			res.send(data)
		})
		.catch((err) => {
			res.send(err)
		})
	})

// ================================================
// ON ROUTES THAT END IN '/songs', AS BELOW:

router.route('/songs')
	.get((req, res) => {
		Song.findAll({
			order: [['title', 'ASC']],
			include: [Artist],
			include: [Genre.l]
		})
		.then((songs) => {
			console.log('Listing all the songs')
			res.send(songs)
		})
		.catch((err) => {
			console.log(err)
		})

	})
// ================================================
// STARTING THE SERVER:

app.listen(9999, () => console.log('Listening on Port 9999'));

// ================================================
// REGISTER OUR ROUTES:
// (All the routes are prefixed with /api)

app.use(myLogger)
app.use('/api', router);
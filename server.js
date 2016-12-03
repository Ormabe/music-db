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

// body-parser middleware adds .body property to req (if we make a POST AJAX request with some data attached, that data will be accessible as req.body)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




// app.listen('9999', () => console.log('Listening on port 9999'));


// ============================================
// MIDDLEWARE TO USE FOR ALL REQUESTS:
var myLogger = (req, res, next) => {
	console.log('Something very exciting is happening');
	next();
};

// Testing the route to make sure that everything is working:
router.get('/', function (req, res) {
	res.json({message: 'WOOHOO! We got a router y\'all!'});
})

// ============================================
// ON ROUTES THAT END IN '/artists', as follows:

router.route('/artists')

	// GET all artists, ordered a-z
	.get((req, res) => {
		Artist.findAll({
			order: [['name', 'ASC']]
		})
		.then((artists) => {
			res.send(artists);
		})
		.catch((err) => {
			console.log(err);
		})
	})

	// POST a new artist
	.post((req, res) => {
		Artist.create({
			name: req.body.name
		})
		.then((artist) => {
			res.json(artist);
		})
		.catch((err) => {
			console.log(err);
		})
	})

// ============================================
// ON ROUTES THAT END IN '/artists/:id', as follows:

router.route('/api/artists/:id')

	// GET a specific artist by id
	.get((req, res) => {
		Artist.findById(req.params.id)
		.then( (artist) => {
			res.send(artist);
		})
		.catch( (err) => {
			console.log(err);
		})
	});

// ===================================
// STARTING THE SERVER:

app.listen(9999, () => console.log('Listening on Port 9999'));

// ===================================
// REGISTER OUR ROUTES:
// (All the routes are prefixed with /api)
app.use(myLogger)
app.use('/api', router);
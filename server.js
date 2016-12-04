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
// STARTING THE SERVER:

app.listen(9999, () => console.log('Listening on Port 9999'));

// ================================================
// ACCESS THE OBJECT ON 'index.js':

const models = require('./index').models;
const routes = require('./index').routes;

// ================================================
// REGISTER OUR ROUTES:
// (All the routes are prefixed with /api)

app.use(myLogger)
app.use('/api', router);
app.use('/api/album', router.albums);
app.use('/api/artists', router.artists);
app.use('/api/genres', router.genres);
app.use('/api/playlists', router.playlists);
app.use('/api/songs', router.songs);
app.use('/api/users', router.users);

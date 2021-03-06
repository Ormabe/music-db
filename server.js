const express = require('express');
// ROUTES FOR OUR API:
// This is an instance of the express router
const router = express.Router();
// const mysql = require('mysql');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelizeConnection = require('./db');

// REQUIRE IN ALL MODELS:
const Album = require('./models/album-model')
const Artist = require('./models/artist-model');
const Genre = require('./models/genre-model');
const Playlist = require('./models/playlist-model');
const Song = require('./models/song-model');
const User = require('./models/user-model');

// REQUIRE IN ROUTE FOLDER:
const routes = require('./routes/index').routes;

// // REQUIRE IN THE ROUTES:
// const albums = routes.albums;
// const artists = routes.artists;
// const genres = routes.genres;
// const songs = routes.songs;
// const playlists = routes.playlists;
// const users = routes.users;

// ================================================
// SETTING THE SERVER:
app.set('port', 9999)

// THIS SERVES UP THE BUNDLE FILE TO BE ACCESSED BY THE FRONT END:
app.use(express.static(path.join(__dirname, '/front/bundle')));

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
app.get('/', function (req, res, next) {
	res.send({message: "WOOHOO! We got a router you all!"});
	next();
})

// return router;

// ================================================
// STARTING THE SERVER:

app.listen(app.get('port'), () => console.log('Listening on Port 9999'));

// ================================================
// REGISTER OUR ROUTES:
// (All the routes are prefixed with /api)

// app.get("/api/artists", (req, res) => {
// 	res.send("your route is correct")
// })

app.use(myLogger)
// app.use('/api/albums', routes.albums);
app.use('/api/artists', routes.artists);
// app.use('/api/genres', routes.genres);
// app.use('/api/playlists', routes.playlists);
// app.use('/api/songs', routes.songs);
// app.use('/api/users', routes.users);
// app.use('/', routes);

// IF WHAT WE TYPE ISN'T IN THE API ROUTE - WE WANT TO SEND BACK OUR REACT APP:
console.log(__dirname)
app.use('/*', (req, res) => {
	res.sendFile(__dirname +'/front/index.html')
});
// NOTES:
// http://kerryritter.com/getting-started-with-sequelize-postgres-and-express/

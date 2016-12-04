// REQUIRE IN EXPRESS:
const express = require('express');

// CREATE INSTANCE OF EXPRESS ROUTER:
const router = express.Router();

// REQUIRE IN MODELS:
const Song = require('../models/song-model');

// ================================================
// ON ROUTES THAT END IN '/songs', AS BELOW:

router.route('/songs')
	.get((req, res) => {
		Song.findAll({
			order: [['title', 'ASC']],
			include: [Artist],
			include: [Genre]
		})
		.then((songs) => {
			console.log('Listing all the songs')
			res.send(songs)
		})
		.catch((err) => {
			console.log(err)
		})

	})

	module.exports = router;
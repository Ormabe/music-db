// REQUIRE IN EXPRESS:
const express = require('express');

// CREATE INSTANCE OF EXPRESS ROUTER:
const router = express.Router();

// REQUIRE IN MODELS:
const Artist = require('../models/artist-model');
const Song = require('../models/song-model');

// ================================================
// ON ROUTES THAT END IN '/artists', AS BELOW:

router.route('/')

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

router.route('/:id')

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

router.route('/:id/:newName')
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

module.exports = router;
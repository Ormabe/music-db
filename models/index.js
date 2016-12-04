// REQUIRE IN MODELS:
const Album = require('./models/album-model');
const Artist = require('./models/artist-model');
const Genre = require('./models/genre-model');
const Playlist = require('./models/playlist-model');
const Song = require('./models/song-model');
const User = require('./models/user-model');

// REQUIRE IN ROUTES:
const album = require('./routes/album-router');
const artist = require('./routes/artist-router');
const genre = require('./routes/genre-router');
const playlist = require('./routes/playlist-router');
const song = require('./routes/song/song-router');
const user = require('./routes/user-router');

// EXPORT AS AN OBJECT:
module.exports = {
  models: {
    Album: Album,
    Artist: Artist,
    Genre: Genre,
    Playlist: Playlist,
    Song: Song,
    User: User
  },
  routes: {
    album: album,
    artist: artist,
    genre: genre,
    playlist: playlist,
    song: song,
    user: user
  }
}


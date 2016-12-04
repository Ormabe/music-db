// REQUIRE IN MODELS:
const Album = require('./models/album-model');
const Artist = require('./models/artist-model');
const Genre = require('./models/genre-model');
const Playlist = require('./models/playlist-model');
const Song = require('./models/song-model');
const User = require('./models/user-model');

// REQUIRE IN ROUTES:
const albums = require('./routes/album-router');
const artists = require('./routes/artist-router');
const genres = require('./routes/genre-router');
const playlists = require('./routes/playlist-router');
const songs = require('./routes/song-router');
const users = require('./routes/user-router');

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
    albums: albums,
    artists: artists,
    genres: genres,
    playlists: playlists,
    songs: songs,
    users: users
  }
}


require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const SpotifyWebApi = require('spotify-web-api-node');

const Chart = require('./models/chart');


const app = express();
app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(morgan('tiny'));

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
});


const spotifyRetrieveEntryData = (songList, length) => {
  const filteredList = songList.filter(entry => entry.position <= length);
  let spotifyList = [];
  let promises = []
    
    return(spotifyApi.clientCredentialsGrant()
      .then((data) => {
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);
      })
      .then(() => {
        for (let i = 0; i < filteredList.length; i++) {
          const position = filteredList[i].position
          const song = filteredList[i].song.substring(0, 10).replace(/[&'"+!?]/gi, '').toLowerCase();
          const artist = filteredList[i].artist.substring(0, 10).replace(/[&'"+!?]/gi, '').toLowerCase();
          const promise = spotifyApi.searchTracks(`track:${song} artist:${artist}`, { limit: 1, market: 'US' })
            .then((data) => {
              
              // the song can't be found on Spotify for some reason => set everything null except current info
              if (data.body.tracks.total === 0) {
                const entry = {
                  position: position,
                  song: filteredList[i].song,
                  artist: filteredList[i].artist,
                  spotifyUri: null,
                  songUrl: null,
                  artistUrl: null,
                  trackImg: null,
                  previewUrl: null
                }
                spotifyList.push(entry)
              }
              else {
                const entry = {
                  position: position,
                  song: data.body.tracks.items[0].name,
                  artist: data.body.tracks.items[0].artists[0].name,
                  spotifyUri: data.body.tracks.items[0].uri,
                  songUrl: data.body.tracks.items[0].external_urls,
                  artistUrl: data.body.tracks.items[0].artists[0].external_urls,
                  trackImg: data.body.tracks.items[0].album.images[1],
                  previewUrl: data.body.tracks.items[0].preview_url
                }
                spotifyList.push(entry)
              }
        
            })
            .catch((error) => {
              console.log('error in Spotify search tracks', error)
              
            })
            promises.push(promise)
        }
        return(promises)
      })
      .then(async (promises) => {
        await Promise.all(promises)
        spotifyList.sort((a, b) => (a.position > b.position) ? 1 : -1)
        return(spotifyList)
      })
      .catch((error) => {
        console.log('Error in search', error)
      })
    )
      
}


app.get('/api/charts', (request, response, next) => {
    Chart.find({ date: request.query.chart_date })
      .then((chart) => {
        const spotifyListData = spotifyRetrieveEntryData(chart[0].entries, request.query.length);
        spotifyListData.then((result) => {
          response.json(result)
        })
      })
      .catch((error) => next(error));
});


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
  };
  
  app.use(unknownEndpoint);
  
  const errorHandler = (error, request, response, next) => {
    console.error(error.message);
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' });
    }
    if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message });
    }
  
    next(error);
  };
  
  app.use(errorHandler);
  
  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
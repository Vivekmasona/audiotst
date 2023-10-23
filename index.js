const express = require('express');
const ytpl = require('ytpl');
const app = express();
const port = 3000;

let currentVideoIndex = 0;

app.get('/', (req, res) => {
  const playlistUrlParam = req.query.playlist; // Get the 'playlist' query parameter

  // Check if the 'playlist' query parameter is provided
  if (!playlistUrlParam) {
    return res.status(400).send('Please provide a playlist URL using the "playlist" query parameter.');
  }

  // Fetch the playlist information using ytpl
  ytpl(playlistUrlParam, { limit: 10 })
    .then(playlistInfo => {
      const videoUrls = playlistInfo.items.map(item => item.shortUrl);
      const totalVideos = videoUrls.length;

      // Get the current video URL
      const videoUrl = videoUrls[currentVideoIndex];

      // Create an HTML page with an audio player
      res.send(`
        <html>
          <body>
            <h1>Playlist Audio Player</h1>
            <p>Now playing: ${videoUrl}</p>
            <audio controls autoplay>
              <source src="${videoUrl}" type="audio/mpeg">
            </audio>
          </body>
        </html>
      `);

      // Move to the next video when the current one ends
      currentVideoIndex = (currentVideoIndex + 1) % totalVideos;
    })
    .catch(error => {
      console.error('Error fetching playlist:', error);
      res.status(500).send('Error fetching playlist: ' + error.message);
    });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


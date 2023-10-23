const express = require('express');
const ytpl = require('ytpl');
const app = express();
const port = 3000;

const playlistUrl = 'https://youtube.com/playlist?list=PLNhIv1Ws_Em7mYb98lZnY942a9y3Fnrz-&si=eBurDa4xpSQn99g4';

let currentVideoIndex = 0;

// Fetch the playlist information using ytpl
ytpl(playlistUrl, { limit: 10 })
  .then(playlistInfo => {
    const videoUrls = playlistInfo.items.map(item => item.shortUrl);
    const totalVideos = videoUrls.length;

    app.get('/', (req, res) => {
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
    });

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch(error => {
    console.error('Error fetching playlist:', error);
  });

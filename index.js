const express = require('express');
const ytpl = require('ytpl');
const app = express();
const port = 3000;
let videoUrls = [];
let currentVideoIndex = 0;

app.get('/', async (req, res) => {
  try {
    if (videoUrls.length === 0) {
      const playlistId = 'PLNhIv1Ws_Em7mYb98lZnY942a9y3Fnrz-'; // Replace with your playlist ID
      const playlistInfo = await ytpl(playlistId, { limit: Infinity });
      videoUrls = playlistInfo.items.map(item => item.shortUrl);
    }

    if (currentVideoIndex < videoUrls.length) {
      const videoUrl = videoUrls[currentVideoIndex];
      currentVideoIndex++;

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
    } else {
      res.send('Playlist completed.');
    }
  } catch (error) {
    res.status(500).send('Error: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


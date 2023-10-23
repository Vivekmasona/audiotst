const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const port = 3000;

const playlist = [
  'youtube_video_url_1',
  'youtube_video_url_2',
  'youtube_video_url_3',
  'youtube_video_url_4',
  'youtube_video_url_5',
  'youtube_video_url_6',
  'youtube_video_url_7',
  'youtube_video_url_8',
  'youtube_video_url_9',
  'youtube_video_url_10',
  // Add more video URLs to your playlist
];

let currentVideoIndex = 0;

app.get('/', (req, res) => {
  // Get the current video URL
  const videoUrl = playlist[currentVideoIndex];

  // Get the audio stream URL using ytdl-core
  const stream = ytdl(videoUrl, { filter: 'audioonly' });

  // Create an HTML page with an audio player
  res.send(`
    <html>
      <body>
        <h1>Playlist Audio Player</h1>
        <p>Now playing: ${videoUrl}</p>
        <audio controls autoplay>
          <source src="${stream}" type="audio/mp4">
        </audio>
      </body>
    </html>
  `);

  // Move to the next video when the current one ends
  currentVideoIndex = (currentVideoIndex + 1) % playlist.length;
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

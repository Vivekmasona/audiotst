const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const port = 3000;

app.get('/play', (req, res) => {
  const videoURL = 'LIVE_VIDEO_URL_HERE'; // Live video ka URL yahan par replace kare

  // YouTube video ko audio me fetch kare
  const audioStream = ytdl(videoURL, { filter: 'audioonly' });

  // Set the appropriate content type for audio
  res.header('Content-Type', 'audio/mpeg');

  // Pipe audio stream to response
  audioStream.pipe(res);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


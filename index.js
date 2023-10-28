const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const port = 3000;

app.get('/stream', (req, res) => {
  const videoURL = req.query.url; // YouTube video ka URL
  res.header('Content-Type', 'audio/mpeg');

  ytdl(videoURL, { filter: 'audioonly' }).pipe(res);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

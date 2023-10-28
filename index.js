const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const app = express();
const port = 3000;

app.get('/stream', (req, res) => {
  const videoURL = req.query.url; // YouTube live video ka URL

  // Set response content type to audio/mpeg
  res.header('Content-Type', 'audio/mpeg');

  // Create an FFmpeg instance to process the live video stream
  const command = ffmpeg(videoURL)
    .audioCodec('libmp3lame')
    .audioBitrate(128)
    .format('mp3');

  // Stream the audio to the response
  command.pipe(res, { end: true });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


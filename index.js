const express = require('express');
const ytdl = require('ytdl-core');
const fluentFfmpeg = require('fluent-ffmpeg');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/download', async (req, res) => {
  const { videoUrl } = req.body;
  const outputFileName = 'output.mp4';

  // Download the YouTube video using ytdl-core
  const videoReadableStream = ytdl(videoUrl, { filter: 'audioandvideo' });

  // Convert the video using fluent-ffmpeg
  fluentFfmpeg(videoReadableStream)
    .audioCodec('aac')
    .videoCodec('libx264')
    .format('mp4')
    .on('end', () => {
      // Respond with the video file to the client
      res.download(outputFileName, () => {
        // Clean up the temporary file after download
        fs.unlink(outputFileName, (err) => {
          if (err) {
            console.error('Error deleting temporary file:', err);
          }
        });
      });
    })
    .save(outputFileName);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


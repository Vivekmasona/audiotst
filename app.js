const express = require('express');
const ytdl = require('ytdl-core');

const app = express();
const port = 3000; // You can change this port number as needed

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/play', async (req, res) => {
  try {
    const videoURL = req.query.url;
    
    if (!ytdl.validateURL(videoURL)) {
      throw new Error('Invalid YouTube URL');
    }

    const info = await ytdl.getInfo(videoURL);
    const audioStream = ytdl(videoURL, { filter: 'audioonly' });

    res.header('Content-Disposition', `attachment; filename="${info.title}.mp3"`);
    audioStream.pipe(res);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


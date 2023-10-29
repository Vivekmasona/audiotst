const express = require('express');
const ytdl = require('ytdl-core');
const fs = require('fs');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/download', async (req, res) => {
  try {
    const videoUrl = req.query.videoUrl;
    const posterUrl = req.query.posterUrl;

    // Fetch the poster image
    const response = await axios.get(posterUrl, { responseType: 'arraybuffer' });
    const posterData = response.data;

    const info = await ytdl.getInfo(videoUrl);
    const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
    
    if (audioFormats.length === 0) {
      return res.send('No audio formats found for this video.');
    }
    
    const audioFormat = audioFormats[0];
    const audioStream = ytdl(videoUrl, { quality: audioFormat.itag });
    const filename = `${info.videoDetails.title}.mp3`;

    audioStream.pipe(fs.createWriteStream(filename));
    
    // Combine the audio file and poster here
    // You can use 'posterData' and 'filename' to customize the combination
    
    return res.send('Audio downloaded successfully with poster.');
  } catch (error) {
    return res.send('Error: ' + error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


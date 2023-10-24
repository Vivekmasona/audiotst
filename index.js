const express = require('express');
const axios = require('axios');
const fs = require('fs');
const app = express();
const port = 3000;

app.get('/img', async (req, res) => {
  const ytLink = req.query.url; // Get the URL parameter 'url'

  try {
    // Fetch the image from the provided URL (e.g., a YouTube thumbnail)
    const response = await axios.get(ytLink, { responseType: 'stream' });

    // Set the response headers
    res.setHeader('Content-Type', response.headers['content-type']);
    res.setHeader('Content-Disposition', 'attachment; filename=image.jpg'); // You can adjust the filename if needed

    // Pipe the image to the response
    response.data.pipe(res);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


const express = require('express');
const app = express();
const port = 3000;

// Define a route that accepts a "link" parameter
app.get('/play', (req, res) => {
  // Get the value of the "link" parameter from the request's query object
  const link = req.query.link;

  if (!link) {
    res.send('Please provide a valid link parameter.');
  } else {
    res.send(`You provided the link parameter: ${link}`);
    // You can use the "link" value for further processing, such as playing audio or fetching content.
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


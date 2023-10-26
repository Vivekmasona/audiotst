// Import the Axios library
const axios = require('axios');

// Define the request options
const options = {
  method: 'GET', // HTTP GET method
  url: 'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent', // API endpoint
  headers: {
    'X-RapidAPI-Key': '650590bd0fmshcf4139ece6a3f8ep145d16jsn955dc4e5fc9a', // RapidAPI Key
    'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com' // RapidAPI Host
  }
};

// Use a try-catch block to handle any potential errors
try {
  // Make the HTTP request using Axios and the provided options
  const response = await axios.request(options);

  // Log the response data to the console
  console.log(response.data);
} catch (error) {
  // If there's an error, log it to the console
  console.error(error);
}


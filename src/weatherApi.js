// Import the axios library, which allows us to make HTTP requests.
import axios from 'axios';

// Define an asynchronous function that fetches METAR data for a given ICAO code and API key.
export async function getMETAR(icao, apiKey) {
  // Make a GET request to the CheckWX API, passing the ICAO code and API key in the headers.
  const response = await axios.get(`https://api.checkwx.com/metar/${icao}/decoded`, {
    headers: { 'X-API-Key': apiKey }
  });

  // Extract the first data object from the response.
  const result = response.data.data[0];
  // Return the extracted data object.
  return result;
}
import axios from 'axios';

export async function getMETAR(icao, apiKey) {
  const response = await axios.get(`https://api.checkwx.com/metar/${icao}/decoded`, {
    headers: { 'X-API-Key': apiKey }
  });

  const result = response.data.data[0];
  return result;
}

import React, { useEffect, useState } from 'react';
import { getMETAR } from './weatherApi';
import { parseISO, format } from 'date-fns';
import './App.css';
const runwayRegex = /^(0[1-9]|1\d|2\d|3[0-6])$/;

function App() {
  const [metar, setMetar] = useState(null);
  const [icao, setICAO] = useState('CYYZ');
  const [runway, setRunway] = useState(23);
  const [runwayError, setRunwayError] = useState('');

  useEffect(() => {
    getMETAR(icao, import.meta.env.VITE_CHECKWX_API_KEY)
      .then((result) => {
        setMetar(result);
        console.log(result);
      })
      .catch((error) => {
        console.error('Error fetching METAR:', error);
      });
  }, [icao]);

  const handleRunwayChange = (e) => {
    const value = e.target.value;
    setRunway(value);

    // Validate the runway value
    if (value.length === 0) {
      setRunwayError(' Runway number is required for x-wind calculation');
    } else if (!runwayRegex.test(value)) {
      setRunwayError(' Invalid runway number');
    } else {
      setRunwayError('');
    }
  };

  const getHeadwind = (windDirection, runwayDirection, windSpeed, gustingSpeed) => {
    const angle = (windDirection - runwayDirection)*Math.PI/180.0;
    const headwind = Math.round(Math.cos(angle) * windSpeed);
    
    if (gustingSpeed) {
      if (headwind < 0) {
        return `Tailwind: ${Math.abs(headwind)} kts (gusting to ${Math.abs(Math.round(Math.cos(angle) * gustingSpeed))} kts)`;
      } else if (headwind > 0) {
        return `Headwind: ${headwind} kts (gusting to ${Math.round(Math.cos(angle) * gustingSpeed)} kts)`;
      } else {
        return `No headwind component`;
      }
    } else {
      if (headwind < 0) {
        return `Tailwind: ${Math.abs(headwind)} kts`;
      } else if (headwind > 0) {
        return `Headwind: ${headwind} kts`;
      } else {
        return `No headwind component`;
      }
    }
  }

  const getCrosswind = (windDirection, runwayDirection, windSpeed, gustingSpeed) => {
    const angle = (windDirection - runwayDirection)*Math.PI/180.0;
    const crosswind = Math.abs(Math.round(Math.sin(angle) * windSpeed));

    if (gustingSpeed) {
      if (angle < 0) {
        return `Left Crosswind: ${crosswind} kts (gusting to ${Math.abs(Math.round(Math.sin(angle) * gustingSpeed))} kts)`;
      } else if (angle > 0) {
        return `Right Crosswind: ${crosswind} kts (gusting to ${Math.abs(Math.round(Math.sin(angle) * gustingSpeed))} kts)`;
      } else {
        return `No crosswind component`;
      }
    } else {
      if (angle < 0) {
        return `Left Crosswind: ${crosswind} kts`;
      } else if (angle > 0) {
        return `Right Crosswind: ${crosswind} kts`;
      } else {
        return `No crosswind component`;
      }
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">METAR App</h1>

      <form>
        <label htmlFor="icao" className="input-label">ICAO Code: </label>
        <input
          type="text"
          id="icao"
          value={icao}
          onChange={(e) => setICAO(e.target.value)}
          className="text-input"
        />

        <br /><br />

        <label htmlFor="runway" className="input-label">Active Runway: </label>
        <input
          type="text"
          id="runway"
          value={runway}
          onChange={handleRunwayChange}
          className="text-input"
        />
        {runwayError && <span className="error-message">{runwayError}</span>}
      </form>

      {metar ? (
        <div className="metar-container">
          <h2 className="metar-heading">ICAO: {metar.icao}</h2>
          <div className="metar-detail">
            <p className="metar-detail-title">Raw METAR:</p>
            <p>{metar.raw_text}</p>
          </div>
          <div className="metar-detail">
            <p className="metar-detail-title">Flight Category:</p>
            {metar.flight_category === "VFR" ?
              <p style={{"color": "green"}}>VFR</p> :
              <p style={{"color": "red"}}>{metar.flight_category}</p>
            }
            <img src="imgs/flight-category.png" alt="Flight Category" />
          </div>
          <div className="metar-detail">
            <p className="metar-detail-title">Station Info:</p>
            <p>Location: {metar.station.location}</p>
            <p>Name: {metar.station.name}</p>
            <p>Type: {metar.station.type}</p>
            <p>Station Elevation: {metar.elevation.feet} feet ASL</p>
            <img src="./imgs/station-info-symbol.png" alt="Station Info" />
          </div>
          <div className="metar-detail">
            <p className="metar-detail-title">Time of Observation: </p>
            <p>{format(parseISO(metar.observed), "EEE MMM d yyyy HH:mm")}Z</p>
            <img src="./imgs/clock.png" alt="Time of Observation" />
          </div>
          <div className="metar-detail">
            <p className="metar-detail-title">Winds:</p>
            {metar.wind ?
              (<>
                <p>Degrees (True): {metar.wind.degrees}°</p>
                <p>Speed: {metar.wind.speed_kts} kts</p>
                <p>Gusting: {metar.wind.gust_kts ?
                  (metar.wind.gust_kts).toString()+" kts" :
                  "N/A"}</p>
                {runway ? (
                  <>
                    <p>{getHeadwind(metar.wind.degrees, runway*10, metar.wind.speed_kts, metar.wind.gust_kts)}</p>
                    <p>{getCrosswind(metar.wind.degrees, runway*10, metar.wind.speed_kts, metar.wind.gust_kts)}</p>
                  </>
                ) : null}
              </>) :
              <p>Winds are light and variable.</p>
            }
            <img src="imgs/winds.png" alt="Winds" />
          </div>
          <div className="metar-detail">
            <p className="metar-detail-title">Visibility:</p>
            <p>{metar.visibility.miles} Statute Miles</p>
            <img src="imgs/visibility-symbol.png" alt="Visibility" />
          </div>
          <div className="metar-detail">
            <p className="metar-detail-title">Cloud Layers:</p>
            {metar.clouds ?
              metar.clouds.map((item) => <p>{item.feet ? `${item.code}: ${item.text} (${item.feet} ft AGL)` : `${item.code}: ${item.text}`}</p>) :
              <p>No cloud layers found.</p>
            }
            {/* Placeholder symbol image */}
            <img src="imgs/cloud-layers-symbol.jpg" alt="Cloud Layers" />
          </div>
          <div className="metar-detail">
            <p className="metar-detail-title">Temperature / Dew Point:</p>
            <p>{metar.temperature.celsius}°C / {metar.dewpoint.celsius}°C</p>
            {/* Placeholder symbol image */}
            <img src="imgs/temp-dew-symbol.png" alt="Temperature / Dew Point" />
          </div>
          <div className="metar-detail">
            <p className="metar-detail-title">Altimeter Setting:</p>
            <p>{metar.barometer.hg}" Hg</p>
            {/* Placeholder symbol image */}
            <img src="imgs/altimeter-symbol.png" alt="Altimeter Setting" />
          </div>
          <div className="metar-detail">
            <p className="metar-detail-title">Conditions:</p>
            {metar.conditions ?
              metar.conditions.map((item) => <p>{item.code} ({item.text})</p>) :
              <p>No special conditions.</p>
            }
            <img src="imgs/conditions.png" alt="Conditions" />
          </div>
          <div className="metar-detail">
            <p className="metar-detail-title">Sea Level Pressure:</p>
            <p>{metar.barometer.mb} mb</p>
            {/* Placeholder symbol image */}
            <img src="imgs/sea-level-pressure-symbol.png" alt="Sea Level Pressure" />
          </div>
        </div>
      ) : (
        <p className="no-metar-message">No METAR Found for ICAO Code '{icao}'</p>
      )}
    </div>
  );
}

export default App;

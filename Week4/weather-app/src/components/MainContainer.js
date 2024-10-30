import React, { useState, useEffect } from "react";
import "../styles/MainContainer.css";

function MainContainer({ selectedCity }) {
  const [weather, setWeather] = useState(null);
  const [aqi, setAQI] = useState(null);
  const apiKey = "7f7e36587716d651a317bb656b1ec2e6"; // replace with your own API key

  function formatDate(daysFromNow = 0) {
    let output = "";
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    output += date.toLocaleString("en-US", { weekday: "long" }).toUpperCase();
    output += " " + date.getDate();
    return output;
  }

  useEffect(() => {
    if (selectedCity) {
      getWeather(selectedCity.lat, selectedCity.lon);
      getAQI(selectedCity.lat, selectedCity.lon);
    }
  }, [selectedCity]);

  const getWeather = (lat, lon) => {
    const apiCall = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    fetch(apiCall)
      .then(response => response.json())
      .then(data => setWeather(data))
      .catch(error => console.error(error));
  };

  const getAQI = (lat, lon) => {
    const apiCall = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    fetch(apiCall)
      .then(response => response.json())
      .then(data => setAQI(data))
      .catch(error => console.error(error));
  };

  return (
    <div id="main-container">
      <div id="weather-container">
        {weather && aqi ? (
          <>
            {/* New div container for current day location and weather */}
            <div id="current-weather-container">
              <div id="current-day-location">
                <h3 id="date">{formatDate()}</h3>
                <h2 id="location">Weather for {selectedCity.fullName}</h2>
              </div>
              <div id="current-weather">
                <div id="weather-info">
                  <p id="description">{weather.list[0].weather[0].description}</p>
                  <span id="temperature">{Math.round(weather.list[0].main.temp)}°</span>
                  <p id="aqi" style={{ color: getAQIColor(aqi.list[0].main.aqi) }}>
                    AQI: {aqi.list[0].main.aqi}
                  </p>
                </div>
                <div id="icon-container">
                  <img
                    id="weather-icon"
                    src={require(`../icons/${weather.list[0].weather[0].icon}.svg`)}
                    alt="Weather Icon"
                  />
                </div>
              </div>
            </div>
            <div id="forecast-container">
              {Array.from({ length: 5 }).map((_, i) => {
                const dayWeather = weather.list[i * 8];
                const minTemp = Math.min(...weather.list.slice(i * 8, i * 8 + 8).map(w => w.main.temp_min));
                const maxTemp = Math.max(...weather.list.slice(i * 8, i * 8 + 8).map(w => w.main.temp_max));

                return (
                  <div className="forecast-day" key={i}>
                    <p>{formatDate(i)}</p>
                    <img src={require(`../icons/${dayWeather.weather[0].icon}.svg`)} alt="Weather Icon"/>
                    <p>{Math.round(minTemp)}° to {Math.round(maxTemp)}°</p>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );

  function getAQIColor(aqi) {
    switch (aqi) {
      case 1: return "green";
      case 2: return "yellow";
      case 3: return "orange";
      case 4: return "red";
      case 5: return "purple";
      default: return "gray";
    }
  }
}

export default MainContainer;

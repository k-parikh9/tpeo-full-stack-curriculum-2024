// SideContainer.js
import React, { useState } from "react";
import "../styles/SideContainer.css";

function SideContainer({ setSelectedCity, apiKey }) {
  const [searchResults, setSearchResults] = useState([]);

  function search() {
    const searchInput = document.querySelector("#search-input").value;
    if (searchInput) {
      const apiCall = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput},,US&limit=5&appid=${apiKey}`;
      fetch(apiCall)
        .then((response) => response.json())
        .then((data) => {
          renderSearchResults(data);
        });
    }
  }

  function renderSearchResults(searchResults) {
    const ul = document.querySelector("#search-results-list");
    ul.classList.remove("hidden");
    ul.innerHTML = "";

    searchResults.forEach((searchResult, index) => {
      const li = document.createElement("li");
      li.setAttribute("class", "search-result");
      const fullName = searchResult.name + ", " + searchResult.state;
      li.innerHTML = fullName;
      li.addEventListener("click", () =>
        selectCity(
          fullName,
          searchResult.name,
          searchResult.state,
          searchResult.lat,
          searchResult.lon
        )
      );
      ul.appendChild(li);
    });
  }

  function selectCity(fullName, name, state, lat, lon) {
    document.querySelector("#search-results-list").classList.add("hidden");
    document.querySelector("#search-input").value = "";
    
    const city = {
      fullName,
      name,
      state,
      lat,
      lon,
    };
    
    // Lift state up to App component
    setSelectedCity(city);
  }

  return (
    <div id="side-container">
      <div>
        <input id="search-input" placeholder="search for a city"></input>
        <button id="search-button" onClick={search}>
          search
        </button>
      </div>
      <ul id="search-results-list"></ul>
    </div>
  );
}

export default SideContainer;

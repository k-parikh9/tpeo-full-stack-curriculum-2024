// App.js
import React, { useState } from 'react';
import '../styles/App.css';

import MainContainer from './MainContainer';
import SideContainer from './SideContainer';

const apiKey = '6dc87f0d902ad7e89bffc74e3ba537ef';

function App() {
  // STEP 1: Use state to manage city data.
  const [selectedCity, setSelectedCity] = useState(null);

  // STEP 2: Create a function to update the city data in the state.
  const updateSelectedCity = (cityData) => {
    setSelectedCity(cityData);
  };

  return (
    <div className="app-container">
      {/* STEP 3: Connect Components through Props. */}
      
      {/* Pass selectedCity to MainContainer to display the weather data */}
      <MainContainer apiKey={apiKey} selectedCity={selectedCity} />

      {/* Pass updateSelectedCity function to SideContainer to update the selected city */}
      <SideContainer apiKey={apiKey} setSelectedCity={updateSelectedCity} />
    </div>
  );
}

export default App;

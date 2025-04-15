import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  return (
    <div className="min-h-screen bg-[#101010] text-white font-sans flex flex-col items-center p-6">
      <h1 className="text-white text-[18px] font-medium mb-6 text-center">Weather Dashboard</h1>
      <SearchBar setWeatherData={setWeatherData} setError={setError} />
      <WeatherDisplay data={weatherData} error={error} />
    </div>
  );
};

export default App;

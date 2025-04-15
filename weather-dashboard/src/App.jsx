import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import './index.css'; // Assuming you have a CSS file for styles
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      try {
        const apiKey = 'f8d23b5ef241a6d0f815bf7e05775e2b';
        const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`);
        const geoData = await geoRes.json();

        if (geoData.length === 0) {
          setWeatherData(null);
          return;
        }

        const { lat, lon } = geoData[0];

        const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        const weatherData = await weatherRes.json();

        setWeatherData({ city: city, ...weatherData });
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setWeatherData(null);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div className="bg-[#101010] min-h-screen text-white font-sans p-6">
      <h1 className="text-center text-white text-xl font-medium mb-4">Weather Dashboard</h1>
      <ErrorBoundary>
        <SearchBar setCity={setCity} />
        {weatherData && <WeatherDisplay data={weatherData} />}
      </ErrorBoundary>
    </div>
  );
};

export default App;

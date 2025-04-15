import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [recentSearches, setRecentSearches] = useState(
    JSON.parse(localStorage.getItem("recentSearches")) || []
  );
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState('metric');
  const apiKey = 'f8d23b5ef241a6d0f815bf7e05775e2b';

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      setLoading(true);
      try {
        const geoRes = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`
        );
        const geoData = await geoRes.json();

        if (geoData.length === 0) {
          setWeatherData(null);
          return;
        }

        const { lat, lon } = geoData[0];
        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`
        );
        const weatherData = await weatherRes.json();

        setWeatherData({ city: city, ...weatherData });
        
        const updated = [city, ...recentSearches.filter(item => item !== city)].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem("recentSearches", JSON.stringify(updated));
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, unit]);

  const getBackgroundClass = () => {
    if (!weatherData) return "bg-gray-900";
    const weather = weatherData.weather[0].main.toLowerCase();
    switch (weather) {
      case "rain": return "bg-gradient-to-br from-gray-800 to-blue-900";
      case "clear": return "bg-gradient-to-br from-blue-400 to-yellow-200";
      case "clouds": return "bg-gradient-to-br from-gray-400 to-gray-700";
      default: return "bg-gray-900";
    }
  };

return (
  <div className={`${getBackgroundClass()} min-h-screen transition-colors duration-500 text-white p-6`}>
    <h1 className="text-2xl font-bold text-center mb-6">Weather Dashboard</h1>
    
    {/* Move ErrorBoundary inside the main container */}
    <ErrorBoundary>
      <>
        <div className="flex justify-center gap-4 mb-6">
          {/* Unit toggle buttons */}
        </div>
        
        <SearchBar setCity={setCity} />
        
        {loading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-400"></div>
          </div>
        )}

        {weatherData ? (
          <WeatherDisplay data={weatherData} unit={unit} />
        ) : (
          !loading && (
            <div className="text-center text-gray-400">
              Search for a city to see weather data
            </div>
          )
        )}
        
        {recentSearches.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-300 mb-2">Recent searches:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {recentSearches.map((search) => (
                <button
                  key={search}
                  onClick={() => setCity(search)}
                  className="px-3 py-1 bg-gray-700 rounded-full text-sm hover:bg-gray-600 transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}
      </>
    </ErrorBoundary>
  </div>
  );
};

export default App;
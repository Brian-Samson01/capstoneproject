import React from 'react';

const WeatherDisplay = ({ data }) => {
  // Check if the data is available
  if (!data) {
    return <p className="text-center text-gray-400">Loading weather data...</p>;
  }

  // Check if the main data exists to prevent undefined errors
  if (!data.main) {
    return <p className="text-center text-red-500">Error: No weather data available.</p>;
  }

  return (
    <div className="bg-[#1E1E1E] p-6 rounded-md shadow-lg">
      <h2 className="text-center text-white text-2xl">{data.city}</h2>
      <div className="flex items-center justify-center mt-4">
        <div className="text-center text-white">
          <h3 className="text-4xl font-bold">{data.main.temp}°C</h3>
          <p className="text-lg">{data.weather[0].description}</p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
          alt="Weather icon"
          className="w-16 h-16 ml-4"
        />
      </div>
      <div className="mt-4 text-white">
        <p>Humidity: {data.main.humidity}%</p>
        <p>Wind Speed: {data.wind.speed} m/s</p>
      </div>
    </div>
  );
};

export default WeatherDisplay;

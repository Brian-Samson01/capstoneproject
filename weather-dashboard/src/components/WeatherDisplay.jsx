import React from 'react';

const WeatherDisplay = ({ data, error }) => {
  if (error) {
    return <p className="text-red-400">{error}</p>;
  }

  if (!data) {
    return <p className="text-gray-400">Search for a city to view weather information.</p>;
  }

  const { name, main, weather, wind } = data;

  return (
    <div className="bg-[#1E1E1E] rounded-[8px] shadow-md p-6 w-full max-w-md text-white flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-[20px] font-semibold">{name}</h2>
        <p className="text-[#DDDDDD]">{weather[0].main}</p>
      </div>
      <div className="flex items-center gap-4">
        <img
          src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
          alt="Weather icon"
          className="w-16 h-16"
        />
        <span className="text-[48px] font-bold">{Math.round(main.temp)}°C</span>
      </div>
      <div className="text-[#DDDDDD] text-[16px]">
        <p>Humidity: {main.humidity}%</p>
        <p>Wind Speed: {wind.speed} m/s</p>
      </div>
    </div>
  );
};

export default WeatherDisplay;

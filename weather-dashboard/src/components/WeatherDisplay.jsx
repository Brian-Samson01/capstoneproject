import React from 'react';

const WeatherDisplay = ({ data, unit }) => {
  if (!data) return null;

  const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const windUnit = unit === 'metric' ? 'm/s' : 'mph';
  const tempUnit = unit === 'metric' ? '°C' : '°F';

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto shadow-xl border border-gray-700">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">{data.city}</h2>
        <p className="text-gray-300">
          {new Date(data.dt * 1000).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-5xl font-bold">
            {Math.round(data.main.temp)}{tempUnit}
          </p>
          <p className="text-lg capitalize text-gray-300">
            {data.weather[0].description}
          </p>
        </div>
        <img 
          src={weatherIcon} 
          alt="Weather icon" 
          className="w-20 h-20" 
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-700/50 p-3 rounded-lg">
          <p>Feels like: {Math.round(data.main.feels_like)}{tempUnit}</p>
          <p>Humidity: {data.main.humidity}%</p>
        </div>
        <div className="bg-gray-700/50 p-3 rounded-lg">
          <p>Wind: {data.wind.speed} {windUnit}</p>
          <p>Pressure: {data.main.pressure} hPa</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
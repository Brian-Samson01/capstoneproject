import React, { useState } from 'react';

const SearchBar = ({ setWeatherData, setError }) => {
  const [city, setCity] = useState("");

  const handleSearch = async () => {
    if (!city) return;

    const API_KEY = "YOUR_API_KEY"; // I will Replace with my OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setWeatherData(null);
      setError(err.message);
    }
  };

  return (
    <div className="flex gap-3 mb-6">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search city"
        className="bg-[#1E1E1E] text-white placeholder-[#666] border border-[#2a2a2a] px-4 py-2 rounded-[5px] w-64"
      />
      <button
        onClick={handleSearch}
        className="bg-[#64f587] text-black font-semibold px-4 py-2 rounded-[5px] hover:bg-[#78f89a] transition"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;

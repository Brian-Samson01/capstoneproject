import React, { useState } from 'react';

const SearchBar = ({ setCity }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const apiKey = 'f8d23b5ef241a6d0f815bf7e05775e2b';

  const fetchSuggestions = async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
      );
      const data = await res.json();
      setSuggestions(data.map((item) => `${item.name}, ${item.country}`));
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSearch = () => {
    if (input.trim()) {
      setCity(input.split(",")[0].trim());
      setSuggestions([]);
    }
  };

  return (
    <div className="relative max-w-md mx-auto mb-8">
      <div className="flex shadow-lg">
        <input
          type="text"
          className="w-full px-4 py-2 rounded-l-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Enter city name..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            fetchSuggestions(e.target.value);
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          className="px-4 py-2 bg-green-400 text-black rounded-r-lg hover:bg-green-300 transition-colors"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-gray-800 rounded-lg shadow-lg max-h-60 overflow-auto">
          {suggestions.map((item, i) => (
            <li
              key={i}
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer border-b border-gray-700 last:border-b-0"
              onClick={() => {
                setInput(item);
                setCity(item.split(",")[0].trim());
                setSuggestions([]);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
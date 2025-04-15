import React, { useState } from 'react';

const SearchBar = ({ setCity }) => {
  const [input, setInput] = useState('');

  const handleSearch = () => {
    setCity(input);
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        className="bg-[#1E1E1E] text-white p-2 rounded-lg border border-[#2a2a2a] w-64"
        placeholder="Search city"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="bg-[#64f587] text-black p-2 ml-2 rounded-lg"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;

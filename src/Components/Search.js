import React, { useState } from 'react';

function Search({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Pokémon"
        value={query}
        onChange={handleChange}
        style={{
          padding: '10px',
          borderRadius: '5px',
          marginLeft: '10px',
        }}
      />
    </div>
  );
}

export default Search;

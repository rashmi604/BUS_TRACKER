import React, { useState } from 'react';
import '../styles/search.css';

const BusSearch = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('bus-number');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ query: searchQuery, type: searchType });
  };

  return (
    <div className='search-container'>
      <form onSubmit={handleSearch}>
        <input
          type='text'
          placeholder='Search bus or route...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value='bus-number'>Bus Number</option>
          <option value='route'>Route</option>
          <option value='driver'>Driver Name</option>
        </select>
        <button type='submit'>Search</button>
      </form>
    </div>
  );
};

export default BusSearch;

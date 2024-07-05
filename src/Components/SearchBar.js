import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const updateQuery = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  const executeSearch = () => {
    navigate(`/?search=${query}`);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="What company are you looking for?"
        className="search-input"
        value={query}
        onChange={updateQuery}
      />
      <button onClick={executeSearch} className="search-button">Search</button>
    </div>
  );
};

export default SearchBar;
import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [currencyCode, setCurrencyCode] = useState('');
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setCurrencyCode(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/currency/${currencyCode}`
      );

      setCountries(response.data);
      setError('');
    } catch (err) {
      setCountries([]);
      setError('Error fetching data. Please check your input.');
    }
  };

  const getFlagCode = (countryName) => {
    const flagCodeMap = {
      'United States': 'us',
      'United Kingdom': 'gb',
    };

    return flagCodeMap[countryName] || 'unknown';
  };

  return (
    <div>
      <h1>Country Search</h1>
      <div>
        <label htmlFor="currencyInput">Enter Currency Code: </label>
        <input
          type="text"
          id="currencyInput"
          value={currencyCode}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {countries.length > 0 && (
        <div>
          <h2>Results:</h2>
          <ul>
            {countries.map((country) => (
              <li key={country.name.common}>
                {country.name.common}
                <img
                  src={`https://flagsapi.com/${getFlagCode(country.name.common)}/flat/64.png`}
                  alt={`${country.name.common} Flag`}
                  style={{ marginLeft: '10px' }}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;

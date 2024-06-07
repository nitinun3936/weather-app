import React, { useState } from 'react';
import WeatherCard from './WeatherCard';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = 'c76f0987e8174372980131735240706';

  const fetchWeatherData = async () => {
    setLoading(true);
    setError('');
    setWeatherData(null);
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      alert('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeatherData();
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <div className="search-bar">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <p>Loading data…</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <div className="weather-cards">
          <WeatherCard title="Temperature" value={`${weatherData.current.temp_c} °C`} />
          <WeatherCard title="Humidity" value={`${weatherData.current.humidity} %`} />
          <WeatherCard title="Condition" value={weatherData.current.condition.text} />
          <WeatherCard title="Wind Speed" value={`${weatherData.current.wind_kph} kph`} />
        </div>
      )}
    </div>
  );
};

export default WeatherApp;

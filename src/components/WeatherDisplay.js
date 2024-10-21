import React, { useEffect } from 'react';
import axios from 'axios';

function WeatherDisplay({ setWeather }) {
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Remplacez YOUR_API_KEY par votre clé API OpenWeatherMap
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=YOUR_API_KEY&units=metric`);
        setWeather(response.data.weather[0].main);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setWeather('Unknown');
      }
    };

    fetchWeather();
  }, [setWeather]);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Current Weather</h2>
      <p className="text-center text-lg text-gray-600">Loading weather data...</p>
    </div>
  );
}

export default WeatherDisplay;
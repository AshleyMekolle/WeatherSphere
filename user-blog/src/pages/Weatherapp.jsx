import React, { useState } from "react";
import { motion } from 'framer-motion';
import { Cloud, Search, Thermometer, Droplets, Wind } from 'lucide-react';
import '../styles/Weatherapp.css';
import { Loading } from "./loading-page";

const api = {
  key: "593f2f4607d1a3b9a66c6fa865d8be27",
  base: "https://api.openweathermap.org/data/2.5/",
};

export const Weatherapp = () => {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false)

  const searchPressed = () => {
    setIsLoading(true);
    fetch(`${api.base}weather?q=${search}&units=metric&&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setIsLoading(false);
      });
  };

  return (
    <>
    {isLoading && <Loading />}
    <motion.div 
      className="weather-app"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="weather-header">
        <motion.div 
          className="cloud-icon"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Cloud size={64} />
        </motion.div>
        <h1>WeatherSphere</h1>
      </header>

      <motion.div 
        className="search-container"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <input
          type="text"
          placeholder="Enter your town or city"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <motion.button 
          onClick={searchPressed}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Search />
        </motion.button>
      </motion.div>

      {typeof weather.main !== "undefined" && (
        <motion.div 
          className="weather-info"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2>{weather.name}, {weather.sys.country}</h2>
          
          <motion.div 
            className="temperature"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Thermometer />
            <p>{Math.round(weather.main.temp)}°C</p>
          </motion.div>
          
          <p className="feels-like">Feels like: {Math.round(weather.main.feels_like)}°C</p>
          
          <div className="weather-details">
            <div className="humidity">
              <Droplets />
              <p>Humidity: {weather.main.humidity}%</p>
            </div>
            <div className="wind">
              <Wind />
              <p>Wind: {weather.wind.speed} m/s</p>
            </div>
          </div>
          
          <div className="condition">
            <h3>Condition: {weather.weather[0].main}</h3>
            <p>({weather.weather[0].description})</p>
          </div>
        </motion.div>
        
      )}
    </motion.div>
    </>
  );
};
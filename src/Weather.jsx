// import { useState} from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import location from '@iconify-icons/bi/geo-alt-fill';
import therm from '@iconify-icons/fa/thermometer';
import wind from '@iconify-icons/bi/wind';
import water from '@iconify-icons/bi/droplet-fill';
import press from '@iconify-icons/bi/speedometer';
import searchIcn from '@iconify-icons/bi/search';

import React, { useState } from 'react';
import axios from 'axios';
import { div } from "framer-motion/client";

function WeatherApp() {
  const [city, setCity] = useState('london');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const getWeather = async () => {
    try {
      const response = await axios.get(`https://node-server2.vercel.app/weather?city=${city}`, {
        params: { city }
      });
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('city not found,please enter correct city name.');
      setWeather(null);
    }
  };

  return (
    <div className="bg-[url(/imgs/bg.jpg)] bg-cover min-h-screen">
      <div className="flex gap-2 w-fit m-auto pt-20">
      <input
        className="border-2 border-blue-500 p-1 rounded outline-none"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="enter city name"
      />
      <button onClick={getWeather}
      className="bg-blue-500 text-white rounded px-2"
      ><Icon icon={searchIcn}/></button>
      </div>

      {error && <p className="text-center text-xl my-10">{error}</p>}

      {weather && (
        <div className="sm:w-1/2 w-[300px] m-auto border-2 border-blue-400 rounded bg-[#04285787] text-white mt-10">
          <div className="flex justify-between items-center text-xl p-4 border-b-2 mx-2"><Icon icon={location}/><div className="flex gap-2">{weather.name}, {weather.sys.country} <img src={`https://openweathermap.org/images/flags/${weather.sys.country.toLowerCase()}.png`} alt="" className="w-10"/></div></div>
          <div className="flex justify-between items-center text-xl p-2 border-b-2"><img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} /><div className="flex gap-2">{weather.weather[0].description}</div></div>
          <div className="flex justify-between items-center text-xl p-4 border-b-2"><Icon className="text-2xl text-red-500" icon={therm}/><div className="flex gap-2">{weather.main.temp.toFixed()}°C</div></div>
          <div className="flex justify-between items-center text-xl p-4 border-b-2"><Icon className="text-xl text-blue-200" icon={water}/><div className="flex gap-2">{weather.main.humidity}%</div></div>
          <div className="flex justify-between items-center text-xl p-4 border-b-2"><Icon className="text-2xl" icon={wind}/><div className="flex gap-2">{weather.wind.speed} m/s</div></div>
          <div className="flex justify-between items-center text-xl p-4"><Icon className="text-2xl" icon={press}/><div className="flex gap-2">{weather.main.temp} hPa</div></div>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;

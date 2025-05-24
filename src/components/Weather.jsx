import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {
  const [weatherdata, setWeatherdata] = useState(false);

  const inputRef = useRef();
  const allicons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    if (city.trim() === "") {
      alert(`Enter a valid city name`);
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        document.getElementById("#input").value = "";
        return;
      }
      const icon = allicons[data.weather[0].icon] || clear_icon;
      setWeatherdata({
        Humidity: data.main.humidity,
        WindSpeed: data.wind.speed,
        location: data.name,
        Temperature: Math.floor(data.main.temp),
        icon: icon,
      });
    } catch (error) {
      setWeatherdata(false);
      console.error("Error in fetching the data");
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className="Weather">
      <div className="search-bar">
        <input id="input" ref={inputRef} type="text" placeholder="Search City" />
        <img
          src={search_icon}
          alt="search-img"
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {weatherdata ? (
        <>
          <img
            src={weatherdata.icon}
            alt="clear-img"
            className="weather-icon"
          />
          <p className="temperature">{weatherdata.Temperature}°c</p>
          <p className="location">{weatherdata.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="humidity-icon" />
              <div>
                <p>{weatherdata.Humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="wind-icon" />
              <div>
                <p>{weatherdata.WindSpeed} kmph</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;

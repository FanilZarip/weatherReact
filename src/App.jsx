import React, { useEffect, useState } from 'react'
import Weather from './Weather-main'
import SearchCity from './SearchCityInput'
import { format, fromUnixTime } from 'date-fns'
import { storage } from './js/storage';

import { checkError404 } from './js/error'

import './styles/App.css'

const URL_DATA = {
  WeatherNow: 'https://api.openweathermap.org/data/2.5/weather',
  Forecast: 'https://api.openweathermap.org/data/2.5/forecast',
  IMG_URL: 'https://openweathermap.org/img/wn/',
  forecastCount: 'cnt=3',
  METRIC: 'units=metric',
  API_KEY: 'f660a2fb1e4bad108d6160b7f58c555f',
}

const lastSelectedCity = localStorage.getItem('lastSelectedCity');

function App() {
  
  const [cityName, setCityName] = useState("Kazan'");
  const [favoriteCity, setFavoriteCity] = useState(lastSelectedCity);
  const [weatherData, setWeatherData] = useState("");
  const [weatherDetailsData, setWeatherDetailsData] = useState("");
  const [weatherForecastData, setWeatherForecastData] = useState([{time: "?"}]);

  function handleInputChange(event) {
    setCityName(event.target.value);
  }

  async function getWeatherDetails(cityName) {

    const url = `${URL_DATA.WeatherNow}?q=${cityName}&appid=${URL_DATA.API_KEY}&${URL_DATA.METRIC}`;
    const timeHourMinute = 'HH:mm';

    try {
        const weatherJSON = await fetch(url);
        checkError404(weatherJSON); 
        const weatherResultJson = await weatherJSON.json();

        const WEATHER_NOW_DATA = {
            temperature: Math.round(weatherResultJson.main.temp),
            cityName: weatherResultJson.name,
            imgIcon: URL_DATA.IMG_URL + weatherResultJson.weather[0].icon + '@2x.png',
        }

        const WEATHER_DETAILS_DATA = {
            time: 'time',
            sunriseTime: format(fromUnixTime(weatherResultJson.sys.sunrise), timeHourMinute),
            sunsetTime: format(fromUnixTime(weatherResultJson.sys.sunset), timeHourMinute),
            temperature: Math.round(weatherResultJson.main.temp),
            feelsLikeTemperature: Math.round(weatherResultJson.main.feels_like),
            weatherStatus: weatherResultJson.weather[0].main,
            cityName: weatherResultJson.name,
        }

        setWeatherData(WEATHER_NOW_DATA);
        setWeatherDetailsData(WEATHER_DETAILS_DATA);

    } catch (err) {
        console.log('I have await Error', err.stack);
    }
}

  async function getForecastDetails(cityName) {

    const timeHourMinute = 'HH:mm';
    const dateWithMonth = 'dd LLL'
    const url = `${URL_DATA.Forecast}?q=${cityName}&appid=${URL_DATA.API_KEY}&${URL_DATA.METRIC}&${URL_DATA.forecastCount}`;
    
    try {
        const forecastJSON = await fetch(url);
        checkError404(forecastJSON);
        const forecastData = await forecastJSON.json();
        const forecastArray = forecastData.list;
        const FORECAST_DATA = [];

        forecastArray.forEach(elem => {
            FORECAST_DATA.push({
                day: format(fromUnixTime(elem.dt), dateWithMonth),
                // day: fromUnixTime(elem.dt),
                
                time: format(fromUnixTime(elem.dt), timeHourMinute),
                currentTemperature: Math.round(elem.main.temp),
                feelsLikeTemperature: Math.round(elem.main.feels_like),
                currentWeatherStatus: elem.weather[0].main,
                icon: `https://openweathermap.org/img/wn/${elem.weather[0].icon}.png`,
                cityName: forecastData.city.name,
            })
            // console.log(elem);
            console.log(FORECAST_DATA);
        });

        setWeatherForecastData([...FORECAST_DATA]);

    } catch (error) {
        alert(error.stack)
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    getWeatherDetails(cityName);
    getForecastDetails(cityName);
    storage.addLastSelectedCityToLocalStorage('');
    setFavoriteCity("");
    setCityName("");
  }

  function handleClickGetWeatherData(event) {
    const favoriteCityName = event.target.innerText;
    getWeatherDetails(favoriteCityName);
    getForecastDetails(favoriteCityName);
    storage.addLastSelectedCityToLocalStorage(favoriteCityName);
    setFavoriteCity(favoriteCityName);
    setCityName("");
  }

  useEffect(() => {
    console.log(lastSelectedCity);
    if (favoriteCity) {
      getForecastDetails(favoriteCity);
      getWeatherDetails(favoriteCity);
      setCityName("");
    }
  }, []);

  return (
    <section className='container'>
      <div className='weather__wrapper'>
        <SearchCity
          handleSubmit = {handleSubmit}
          handleInputChange = {handleInputChange}
          defaultValue = {cityName}
        />
        <Weather
          weather = {weatherData}
          weatherDetails = {weatherDetailsData}
          forecastArray = {weatherForecastData}
          isEmptyCityName = {cityName}
          cityName = {weatherData.cityName}
          handleClickGetWeatherData = {handleClickGetWeatherData}
          lastSelectedCity = {favoriteCity}
        />
      </div>
    </section>
  )
}

export default App

import { React, useState } from "react";
import search from "./img/search.svg";
import {
  saveCityName,
  saveCurrentCityName,
  addForecastData,
  addWeatherNowData,
  addWeatherDetailsData,
  saveLastSelectedCityName,
  saveCityToSet,
  saveCityCount,
} from "./js/actions";
import { useSelector, useDispatch } from "react-redux";
import { getWeatherDetails, getForecastDetails } from "./js/service";

function SearchCity() {
  const city = (state) => state.city;
  const dispatch = useDispatch();
  const cityName = useSelector(city);

  function handleInputChange(event) {
    const inputValue = event.target.value;
    const trimedInputValue = inputValue.trim();

    dispatch(saveCityName(trimedInputValue));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (cityName) {
      const weatherData = await getWeatherDetails(cityName);
      const forecastArray = await getForecastDetails(cityName);
      const { WEATHER_NOW_DATA: now, WEATHER_DETAILS_DATA: details } =
        weatherData;

      dispatch(saveCityName(""));
      dispatch(saveLastSelectedCityName(""));
      dispatch(saveCurrentCityName(now.cityName));
      dispatch(addWeatherNowData(now));
      dispatch(addWeatherDetailsData(details));
      dispatch(addForecastData(forecastArray));
      dispatch(saveCityToSet(now.cityName));
      dispatch(saveCityCount(cityName));
    }
  }

  return (
    <div className="search">
      <form
        className="d-flex weather__form"
        value={cityName}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="inputCity"
          placeholder="Enter city"
          onChange={handleInputChange}
        />
        <button type="submit" className="button search__button">
          <img src={search} alt="search" />
        </button>
      </form>
    </div>
  );
}

export default SearchCity;

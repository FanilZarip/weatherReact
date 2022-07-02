export const SAVE_CITY_NAME = "SAVE_CITY_NAME";
export const SAVE_CURRENT_CITY_NAME = "SAVE_CURRENT_CITY_NAME";
export const SAVE_LAST_SELECTED_CITY_NAME = "SAVE_LAST_SELECTED_CITY_NAME";
export const ADD_FAVORITE_CITY = "ADD_FAVORITE_CITY";
export const ADD_FORECAST_DATA = "ADD_FORECAST_DATA";
export const ADD_WEATHER_NOW_DATA = "ADD_WEATHER_NOW_DATA";
export const ADD_WEATHER_DETAILS_DATA = "ADD_WEATHER_DETAILS_DATA";
export const SAVE_CITY_TO_SET = "SAVE_CITY_TO_SET";
export const SAVE_CITY_COUNT = "SAVE_CITY_COUNT";

export function saveCityName(cityName) {
  return {
    type: SAVE_CITY_NAME,
    cityName,
  };
}

export function saveCurrentCityName(currentCityName) {
  return {
    type: SAVE_CURRENT_CITY_NAME,
    currentCityName,
  };
}

export function saveLastSelectedCityName(lastSelectedCityName) {
  return {
    type: SAVE_LAST_SELECTED_CITY_NAME,
    lastSelectedCityName,
  };
}

export function saveCityToSet(cityName) {
  return {
    type: SAVE_CITY_TO_SET,
    cityName,
  };
}

export function saveCityCount(countingCity) {
  return {
    type: SAVE_CITY_COUNT,
    countingCity,
  };
}

export function addFavoriteCity(favoriteCityList) {
  return {
    type: ADD_FAVORITE_CITY,
    favoriteCityList,
  };
}

export function addForecastData(forecastArray) {
  return {
    type: ADD_FORECAST_DATA,
    forecastArray,
  };
}

export function addWeatherNowData(weatherNow) {
  return {
    type: ADD_WEATHER_NOW_DATA,
    weatherNow,
  };
}

export function addWeatherDetailsData(weatherDetails) {
  return {
    type: ADD_WEATHER_DETAILS_DATA,
    weatherDetails,
  };
}

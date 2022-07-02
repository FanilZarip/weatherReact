import {
  SAVE_CITY_NAME,
  ADD_FORECAST_DATA,
  ADD_WEATHER_NOW_DATA,
  ADD_WEATHER_DETAILS_DATA,
  SAVE_CURRENT_CITY_NAME,
  ADD_FAVORITE_CITY,
  SAVE_LAST_SELECTED_CITY_NAME,
  SAVE_CITY_TO_SET,
  SAVE_CITY_COUNT,
} from "./actions";
import { storage } from "./storage";

const HELP_DATA = {
  restoredFavoriteCityList: storage.getDataFromLocalStorage(),
  restoredSetCities: storage.getCitySet(),
  lastSelectedCity: localStorage.getItem("lastSelectedCity"),

  citiesGetCount: new Map(),
  defaultCount: 1,
};

const initialState = {
  city: "",
  forecast: [],
  weatherNow: "",
  weatherDetails: {},
  currentCityName: "",
  lastSelectedCityName: HELP_DATA.lastSelectedCity ?? "",
  favoriteCityList: HELP_DATA.restoredFavoriteCityList ?? [],
  setCities: HELP_DATA.restoredSetCities ?? [],
  cityGetCount: "",
};

export function weatherAPP(state = initialState, action) {
  switch (action.type) {
    case SAVE_CITY_NAME:
      return { ...state, city: action.cityName };

    case SAVE_CURRENT_CITY_NAME:
      return { ...state, currentCityName: action.currentCityName };

    case SAVE_LAST_SELECTED_CITY_NAME:
      storage.addLastSelectedCityToLocalStorage(action.lastSelectedCityName);
      return { ...state, lastSelectedCityName: action.lastSelectedCityName };

    case SAVE_CITY_TO_SET:
      const sitiesSet = new Set([...state.setCities]);
      sitiesSet.add(action.cityName);
      storage.addCitySetToLocalStorage(sitiesSet);
      return { ...state, setCities: [...sitiesSet] };

    case SAVE_CITY_COUNT:
      if (HELP_DATA.citiesGetCount.has(action.countingCity)) {
        HELP_DATA.defaultCount =
          HELP_DATA.citiesGetCount.get(action.countingCity) + 1;
        HELP_DATA.citiesGetCount.set(
          action.countingCity,
          HELP_DATA.defaultCount,
        );
        return { ...state, cityGetCount: HELP_DATA.citiesGetCount };
      } else {
        HELP_DATA.citiesGetCount.set(action.countingCity, 1);
        return { ...state, cityGetCount: HELP_DATA.citiesGetCount };
      }
    case ADD_FAVORITE_CITY:
      storage.addToLocalStorage(action.favoriteCityList);
      return { ...state, favoriteCityList: action.favoriteCityList };

    case ADD_FORECAST_DATA:
      return { ...state, forecast: action.forecastArray };

    case ADD_WEATHER_NOW_DATA:
      return {
        ...state,
        weatherNow: { ...state.weatherNow, ...action.weatherNow },
      };

    case ADD_WEATHER_DETAILS_DATA:
      return {
        ...state,
        weatherDetails: { ...state.weatherDetails, ...action.weatherDetails },
      };

    default:
      return state;
  }
}

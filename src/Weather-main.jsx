import { React, useState, useEffect } from 'react';
import WeatherInfo from './Weather-info'
import FavoriteLocations from './FavoriteLocations'
import { storage } from './js/storage';

function Weather({weather, weatherDetails, forecastArray, isEmptyCityName, cityName, handleClickGetWeatherData, lastSelectedCity}) {

    const [favoriteCityList, setFavoriteCityList] = useState([]);
    const cityToFavorite = cityName;
    const favoriteLocationSet = new Set(favoriteCityList);

    useEffect(() => {
      const storageFavoriteCityList = storage.getDataFromLocalStorage();
      setFavoriteCityList([...storageFavoriteCityList]);
    }, []);
  
    function handleClickAddToFavorite() {
      favoriteLocationSet.add(cityToFavorite);
      setFavoriteCityList([...favoriteLocationSet]);
      storage.addToLocalStorage(favoriteLocationSet);
    }

    function handleClickRemoveFromFavorite(event) {
      const deleteCityName = event.target.dataset.favoriteCityName;
      
      favoriteLocationSet.delete(deleteCityName);

      const isEmptyFavoriteList = favoriteLocationSet.size;

      setFavoriteCityList([...favoriteLocationSet]);
      storage.addToLocalStorage(favoriteLocationSet);

      console.log(isEmptyFavoriteList);

      if (isEmptyFavoriteList) {
        storage.removeLastSelectedCityStorage();
      }

    }
    
    return (
      <div className='weather__info d-flex'>
        <WeatherInfo 
          weather = {weather}
          weatherDetails = {weatherDetails}
          forecastArray = {forecastArray}
          isEmptyCityName = {isEmptyCityName}
          handleClickAddToFavorite = {handleClickAddToFavorite}
        />
        <FavoriteLocations 
          cityListSet = {favoriteCityList}
          handleClickRemoveFromFavorite = {handleClickRemoveFromFavorite}
          handleClickGetWeatherData = {handleClickGetWeatherData}
          lastSelectedCity = {lastSelectedCity}
        />
      </div>
    )
    
  }

  export default Weather
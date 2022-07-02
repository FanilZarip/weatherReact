import { useEffect, useState } from "react"
import { saveCurrentCityName, saveLastSelectedCityName, addForecastData, addWeatherNowData, addWeatherDetailsData, addFavoriteCity, saveCityCount } from './js/actions'
import { useSelector, useDispatch } from 'react-redux'
import {getWeatherDetails, getForecastDetails} from './js/service'
import { storage } from './js/storage';

function FavoriteLocations() {

    const dispatch = useDispatch();

    const getCurrentCityName = state => state.currentCityName;
    const getLastSelectedCityName = state => state.lastSelectedCityName;
    const getFavorityCityList = state => state.favoriteCityList;

    const currentCityName = useSelector(getCurrentCityName);
    const lastSelectedCityName = useSelector(getLastSelectedCityName);
    const favoriteCityList = useSelector(getFavorityCityList);

    const favoriteLocationSet = new Set(favoriteCityList);
    const isCurrentCityInFavorite = favoriteLocationSet.has(currentCityName);

    const cityListArray = [...favoriteCityList];
    const [checkedCity, setCheckedCity] = useState({name: lastSelectedCityName, checked: true});

    useEffect(() => {
        setCheckedCity(isCurrentCityInFavorite ? {name: currentCityName, checked: true} : {name: lastSelectedCityName, checked: true});
        },[lastSelectedCityName, currentCityName, favoriteCityList]
    )

    useEffect(() => {
        if (lastSelectedCityName) {
            const weatherData = getWeatherDetails(lastSelectedCityName);
            const forecastArray = getForecastDetails(lastSelectedCityName);

            weatherData.then(response => {
                const {WEATHER_NOW_DATA: now, WEATHER_DETAILS_DATA: details} = response;
                dispatch(addWeatherNowData(now));
                dispatch(addWeatherDetailsData(details));
            });
            
            forecastArray.then(forecastArray => {
                dispatch(addForecastData(forecastArray))
            });
        }
            
        },[]
    )

    function handleClick(event) {
        handleClickGetData(event);
        handleClickRemoveFromFavorite(event);
    }

    async function handleClickGetData(event) {
        const isRadioClicked = event.target.type === 'radio';

        if (isRadioClicked) {
            const currentCheckedCity = event.target.id;
            const isChecked = event.target.checked            
            const weatherData = await getWeatherDetails(currentCheckedCity);
            const forecastArray = await getForecastDetails(currentCheckedCity);
            const {WEATHER_NOW_DATA: now, WEATHER_DETAILS_DATA: details} = weatherData;
    
            setCheckedCity({name: currentCheckedCity, checked: isChecked});

            dispatch(addWeatherNowData(now));
            dispatch(addWeatherDetailsData(details));
            dispatch(addForecastData(forecastArray))
    
            dispatch(saveLastSelectedCityName(currentCheckedCity));
            dispatch(saveCurrentCityName(""));
            dispatch(saveCityCount(currentCheckedCity));
        } 
    }

    function handleClickRemoveFromFavorite(event) {

        const isRemoveButtonClicked = event.target.dataset.favoriteCityDeleteButton;

        if (isRemoveButtonClicked) {
            const cityForRemove = event.target.dataset.cityForRemove
            const isEmptyFavoriteList = favoriteLocationSet.size;

            favoriteLocationSet.delete(cityForRemove);
            
            dispatch(addFavoriteCity(favoriteLocationSet));
    
            if (isEmptyFavoriteList) {
                storage.removeLastSelectedCityStorage();
            }
        }
    }

    const cityList = cityListArray.map(elem => 
        <div className = {(checkedCity.checked && elem === checkedCity.name)? "d-flex favoriteCityChecked" : "favoriteCity d-flex"} key={elem}>
            <input type="radio" id={elem} name="favoriteCityRadioName" hidden/>
            <label htmlFor = {elem} className = "labelWidth">
                <p className = "location__name cityAtFavorite">
                    {elem}
                </p>
            </label>
            <span className = "removeCity" data-favorite-city-delete-button data-city-for-remove = {elem}>
                X
            </span>
        </div>
    )

    return (
      <div className = "added__locations">
        <p className = "added_Title">
            Added Locations:
        </p>
        <div className = "locationList favorite__List" onClick={handleClick}>
          {cityList}
        </div>   
      </div>
    )
  }

  export default FavoriteLocations;
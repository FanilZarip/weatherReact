import React, { useState } from 'react'
import Now from './Weather-now'
import Forecast from './Weather-forecast'
import Details from './Weather-details'

function TabButtons(props) {
  
    return (
      <button className = {props.activeButton === props.buttonName ? "tab__Button_active" : "tab__Button"} onClick = {props.handleClick} name = {props.buttonName}>
        {props.buttonName}
      </button>
    )
  
}

function WeatherInfo({weather, handleClickAddToFavorite, forecastArray, weatherDetails, isEmptyCityName}) {

    const [tabButton, setButton] = useState("Now");

    const tabButtonName = {
        Now: "Now",
        Forecast: "Forecast",
        Details: "Details",
    }

    let tabPage = <Now 
        weather = {weather}
    />;

    function handleClick(event) {
        setButton(event.target.textContent);
    }

    if (tabButton === tabButtonName.Now) {
        tabPage = <Now
                    weather = {weather}
                    handleClickAddToFavorite = {handleClickAddToFavorite}
                />
    } else if (tabButton === tabButtonName.Forecast) {
        tabPage = <Forecast 
                    forecastArray = {forecastArray}
                />
    } else if (tabButton === tabButtonName.Details) {
        tabPage = <Details
                    weatherDetails = {weatherDetails}
                />
    }

    if (isEmptyCityName) {
        tabPage = <img src="https://i.etsystatic.com/7434544/r/il/50f372/1637920754/il_1588xN.1637920754_4zhg.jpg" alt="" className='startImage'/>
    }

    return (
        <div className="weather__details">
        <TabButtons 
            activeButton = {tabButton}
            handleClick = {handleClick}
            buttonName = {tabButtonName.Now}
        />
        <TabButtons 
            activeButton = {tabButton}
            handleClick = {handleClick}
            buttonName = {tabButtonName.Details}
        />
        <TabButtons 
            activeButton = {tabButton}
            handleClick = {handleClick}
            buttonName = {tabButtonName.Forecast}
        />
        {tabPage}
        </div>
    )
}

export default WeatherInfo
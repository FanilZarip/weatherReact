import { React, useState, useEffect } from "react";
import WeatherInfo from "./Weather-info";
import FavoriteLocations from "./FavoriteLocations";
import { storage } from "./js/storage";

function Weather() {
  return (
    <div className="weather__info d-flex">
      <WeatherInfo />
      <FavoriteLocations />
    </div>
  );
}

export default Weather;

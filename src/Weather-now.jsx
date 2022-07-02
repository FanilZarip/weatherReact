import shape from "./img/shape.svg";
import weatherPreloderImage from "./img/forecasting-computer-icons-meteorology.png";
import { addFavoriteCity } from "./js/actions";

import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    weatherNow: state.weatherNow,
    currentCityName: state.currentCityName,
    favoriteCityList: state.favoriteCityList,
    sitiesSet: state.setCities,
  };
}

function Now({
  weatherNow,
  currentCityName,
  favoriteCityList,
  sitiesSet,
  dispatch,
}) {
  const favoriteLocationSet = new Set(favoriteCityList);

  function handleClickAddToFavorite() {
    if (currentCityName) {
      favoriteLocationSet.add(currentCityName);
      dispatch(addFavoriteCity(favoriteLocationSet));

      console.log(sitiesSet);
    }
  }

  if (!weatherNow) {
    return (
      <div id="Now" className="weather__now tabs__content">
        <img src={weatherPreloderImage} alt="clouds" className="preloadImage" />
      </div>
    );
  }

  return (
    <div id="Now" className="weather__now tabs__content">
      <div className="temperature">
        <span className="temperature__value">{weatherNow.temperature}</span>
        <span className="degree__symbol">°</span>
      </div>
      <img src={weatherNow.imgIcon} alt="" className="weather_icon" />
      <div className="addToFavority d-flex">
        <p className="cityName current__city">{weatherNow.cityName}</p>
        <button
          className="addToFavorityButton button"
          onClick={handleClickAddToFavorite}
        >
          <img src={shape} alt="" />
        </button>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Now);

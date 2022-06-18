import shape from './img/shape.svg'
import weatherPreloderImage from "./img/forecasting-computer-icons-meteorology.png"


function Now({weather, handleClickAddToFavorite}) {

    if (!weather) {
        return (
            <div id="Now" className="weather__now tabs__content">
                <img src={weatherPreloderImage} alt="clouds" className='preloadImage' />
            </div>
        )
    }

    return (
      <div id="Now" className="weather__now tabs__content">
          <div className="temperature">   
              <span className="temperature__value">
                  {weather.temperature}
              </span>
              <span className="degree__symbol">
                  °
              </span>
          </div>
          <img src = {weather.imgIcon} alt="" className="weather_icon" />
          <div className="addToFavority d-flex">
              <p className="cityName current__city">
                  {weather.cityName}
              </p>
              <button className="addToFavorityButton button" onClick={handleClickAddToFavorite}>
                  <img src = {shape} alt="" />
              </button>
          </div>
      </div>
    )
  }

  export default Now
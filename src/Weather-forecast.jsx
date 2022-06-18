function Forecast(props) {

    const cityName = props.forecastArray[0].cityName;
    const forecastList = props.forecastArray.map(forecast =>
      <li key={forecast.time} className = "forecast__item">
        <div className = "forecast__day d-flex">
          <p className = "day">
            {forecast.day}
          </p>
          <p className = "time">
          {forecast.time}
          </p>
        </div>
        <div className = "forecast__temperature d-flex">
          <div className = "temperature__item">
            <span className = "forecast__temperature_title">
              Temperature: 
            </span>
            <span className = "forecast__temperature_date">
            {forecast.currentTemperature}°
            </span>
          </div>
            <p className = "forecast__temperature__state">
              {forecast.currentWeatherStatus}
            </p>
        </div>
        <div className = "forecast__feels_like d-flex">
          <div className = "temperature__item">
            <span className = "forecast__temperature_title">
              Temperature: 
            </span>
            <span className = "forecast__temperature_date">
            {forecast.feelsLikeTemperature}°
            </span>
          </div>
          <img className = "forecast__temperature__state" src = {forecast.icon} />
        </div>
      </li>
    );
  
    return (
      <div id="Forecast" className="weather__now tabs__content locationList">
          <p className="cityName forecastCityName">
            {cityName}
          </p>
          <ul className="forecast__list">
            {forecastList}
          </ul>
      </div>
    )
  }

  export default Forecast
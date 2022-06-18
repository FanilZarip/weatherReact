function Details(props) {
    return (
      <div id="Details" className="weather__now tabs__content">
            <p className="cityName">
                {props.weatherDetails.cityName}
            </p>
            <div className="locationList">
                <div className="temperature d-flex temperature__Details">
                    <p className="location__name">
                        Temperature: 
                    </p>   
                    <span className="temperature__value">
                      {props.weatherDetails.temperature}
                    </span>
                    <span className="">
                        °
                    </span>
                </div>
                <div className="temperature d-flex temperature__Details">
                    <p className="location__name">
                        Feels Like: 
                    </p>   
                    <span className="feelsLike__value">
                      {props.weatherDetails.feelsLikeTemperature}
                    </span>
                    <span className="">
                        °
                    </span>
                </div>
                <div className="temperature d-flex temperature__Details">
                    <p className="location__name">
                        Weather: 
                    </p>   
                    <span className="weather__status">
                      {props.weatherDetails.weatherStatus}
                    </span>
                </div>
                <div className="temperature d-flex temperature__Details">
                    <p className="location__name">
                        Sunrise: 
                    </p>   
                    <span className="sunrise__time">
                        {props.weatherDetails.sunriseTime}
                    </span>
                </div>
                <div className="temperature d-flex temperature__Details">
                    <p className="location__name">
                        Sunset: 
                    </p>   
                    <span className="sunset__time">
                      {props.weatherDetails.sunsetTime}
                    </span>
                </div>
            </div>   
        </div>
    )
  }

  export default Details
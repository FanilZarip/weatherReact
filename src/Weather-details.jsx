import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    weatherDetails: state.weatherDetails,
  };
}

function Details({ weatherDetails }) {
  return (
    <div id="Details" className="weather__now tabs__content">
      <p className="cityName">{weatherDetails.cityName}</p>
      <div className="locationList">
        <div className="temperature d-flex temperature__Details">
          <p className="location__name">Temperature:</p>
          <span className="temperature__value">
            {weatherDetails.temperature}
          </span>
          <span className="">°</span>
        </div>
        <div className="temperature d-flex temperature__Details">
          <p className="location__name">Feels Like:</p>
          <span className="feelsLike__value">
            {weatherDetails.feelsLikeTemperature}
          </span>
          <span className="">°</span>
        </div>
        <div className="temperature d-flex temperature__Details">
          <p className="location__name">Weather:</p>
          <span className="weather__status">
            {weatherDetails.weatherStatus}
          </span>
        </div>
        <div className="temperature d-flex temperature__Details">
          <p className="location__name">Sunrise:</p>
          <span className="sunrise__time">{weatherDetails.sunriseTime}</span>
        </div>
        <div className="temperature d-flex temperature__Details">
          <p className="location__name">Sunset:</p>
          <span className="sunset__time">{weatherDetails.sunsetTime}</span>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Details);

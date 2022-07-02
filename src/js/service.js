import { checkError404 } from "./error";
import { format, fromUnixTime } from "date-fns";

export const URL_DATA = {
  WeatherNow: "https://api.openweathermap.org/data/2.5/weather",
  Forecast: "https://api.openweathermap.org/data/2.5/forecast",
  IMG_URL: "https://openweathermap.org/img/wn/",
  forecastCount: "cnt=3",
  METRIC: "units=metric",
  API_KEY: "f660a2fb1e4bad108d6160b7f58c555f",
};

export async function getWeatherDetails(city) {
  const url = `${URL_DATA.WeatherNow}?q=${city}&appid=${URL_DATA.API_KEY}&${URL_DATA.METRIC}`;
  const timeHourMinute = "HH:mm";

  try {
    const weatherJSON = await fetch(url);
    checkError404(weatherJSON);
    const weatherResultJson = await weatherJSON.json();

    const WEATHER_NOW_DATA = {
      temperature: Math.round(weatherResultJson.main.temp),
      cityName: weatherResultJson.name,
      imgIcon: URL_DATA.IMG_URL + weatherResultJson.weather[0].icon + "@2x.png",
    };

    const WEATHER_DETAILS_DATA = {
      time: "time",
      sunriseTime: format(
        fromUnixTime(weatherResultJson.sys.sunrise),
        timeHourMinute,
      ),
      sunsetTime: format(
        fromUnixTime(weatherResultJson.sys.sunset),
        timeHourMinute,
      ),
      temperature: Math.round(weatherResultJson.main.temp),
      feelsLikeTemperature: Math.round(weatherResultJson.main.feels_like),
      weatherStatus: weatherResultJson.weather[0].main,
      cityName: weatherResultJson.name,
    };

    return { WEATHER_NOW_DATA, WEATHER_DETAILS_DATA };
  } catch (err) {
    console.log("I have await Error", err.stack);
  }
}

export async function getForecastDetails(city) {
  const timeHourMinute = "HH:mm";
  const dateWithMonth = "dd LLL";
  const url = `${URL_DATA.Forecast}?q=${city}&appid=${URL_DATA.API_KEY}&${URL_DATA.METRIC}&${URL_DATA.forecastCount}`;

  try {
    const forecastJSON = await fetch(url);
    checkError404(forecastJSON);
    const forecastData = await forecastJSON.json();
    const forecastArray = forecastData.list;
    const FORECAST_DATA = [];

    forecastArray.forEach((elem) => {
      FORECAST_DATA.push({
        day: format(fromUnixTime(elem.dt), dateWithMonth),
        // day: fromUnixTime(elem.dt),

        time: format(fromUnixTime(elem.dt), timeHourMinute),
        currentTemperature: Math.round(elem.main.temp),
        feelsLikeTemperature: Math.round(elem.main.feels_like),
        currentWeatherStatus: elem.weather[0].main,
        icon: `https://openweathermap.org/img/wn/${elem.weather[0].icon}.png`,
        cityName: forecastData.city.name,
      });
    });

    return FORECAST_DATA;
  } catch (error) {
    alert(error.stack);
  }
}

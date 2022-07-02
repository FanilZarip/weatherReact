import React, { useState } from "react";
import Now from "./Weather-now";
import Forecast from "./Weather-forecast";
import Details from "./Weather-details";

function TabButtons(props) {
  return (
    <button
      className={
        props.activeButton === props.buttonName
          ? "tab__Button_active"
          : "tab__Button"
      }
      onClick={props.handleClick}
      name={props.buttonName}
    >
      {props.buttonName}
    </button>
  );
}

function WeatherInfo() {
  const [tabButton, setButton] = useState("Now");

  const tabButtonName = {
    Now: "Now",
    Forecast: "Forecast",
    Details: "Details",
  };

  let tabPage = <Now />;

  function handleClick(event) {
    setButton(event.target.textContent);
  }

  if (tabButton === tabButtonName.Now) {
    tabPage = <Now />;
  } else if (tabButton === tabButtonName.Forecast) {
    tabPage = <Forecast />;
  } else if (tabButton === tabButtonName.Details) {
    tabPage = <Details />;
  }

  return (
    <div className="weather__details">
      <TabButtons
        activeButton={tabButton}
        handleClick={handleClick}
        buttonName={tabButtonName.Now}
      />
      <TabButtons
        activeButton={tabButton}
        handleClick={handleClick}
        buttonName={tabButtonName.Details}
      />
      <TabButtons
        activeButton={tabButton}
        handleClick={handleClick}
        buttonName={tabButtonName.Forecast}
      />
      {tabPage}
    </div>
  );
}

export default WeatherInfo;

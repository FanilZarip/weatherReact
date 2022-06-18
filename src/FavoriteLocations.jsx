import { useEffect, useState } from "react"

function FavoriteLocations({cityListSet, handleClickRemoveFromFavorite, handleClickGetWeatherData, lastSelectedCity}) {

    const cityListArray = [...cityListSet];
    const [checkedCity, setCheckedCity] = useState({name: lastSelectedCity, checked: true});
    // const [checkedCityName, setCheckedCityName] = useState("");
    useEffect(() => {
        setCheckedCity({name: lastSelectedCity, checked: true})
    },[lastSelectedCity]
    )
 
    function changeFavoriteBackground(event) {
        setCheckedCity({name: event.target.id, checked: event.target.checked});
        console.log(checkedCity)
    }
 
    const cityList = cityListArray.map(elem => 
        <div className = {(checkedCity.checked && elem === checkedCity.name)? "d-flex favoriteCityChecked" : "favoriteCity d-flex"} key={elem}>
            <input type="radio" id={elem} name="favoriteCityRadioName" hidden onClick={changeFavoriteBackground} />
            <label htmlFor = {elem} className = "labelWidth" onClick={handleClickGetWeatherData}>
                <p className = "location__name cityAtFavorite">
                    {elem}
                </p>
            </label>
            <span className = "removeCity" onClick = {handleClickRemoveFromFavorite} data-favorite-city-name = {elem}>
                x
            </span>
        </div>
    )

    return (
      <div className = "added__locations">
        <p className = "added_Title">
            Added Locations:
        </p>
        <div className = "locationList favorite__List">
          {/* Add city List */}
          {cityList}
        </div>   
      </div>
    )
  }

  export default FavoriteLocations
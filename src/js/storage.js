export const storage = {
  getDataFromLocalStorage() {
    try {
      const favoriteCityListJSON = localStorage.getItem(
        "favoriteCitiesListStorage",
      );
      const favoriteCityListParsed = JSON.parse(favoriteCityListJSON);

      return favoriteCityListParsed;
    } catch (error) {
      alert(error.stack);
    }
  },

  getCitySet() {
    try {
      const sitySetJSON = localStorage.getItem("citiesSet");
      const parsedSetCities = JSON.parse(sitySetJSON);

      return parsedSetCities;
    } catch (error) {
      alert(error.stack);
    }
  },

  addToLocalStorage(set) {
    localStorage.setItem("favoriteCitiesListStorage", JSON.stringify([...set]));
  },

  addCitySetToLocalStorage(set) {
    localStorage.setItem("citiesSet", JSON.stringify([...set]));
  },

  addLastSelectedCityToLocalStorage(city) {
    localStorage.setItem("lastSelectedCity", city);
  },

  removeLastSelectedCityStorage() {
    localStorage.removeItem("lastSelectedCity");
  },
};

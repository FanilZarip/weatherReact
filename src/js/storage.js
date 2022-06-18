export const storage = {
    getDataFromLocalStorage() {
        const favoriteCityListJSON = localStorage.getItem('favoriteCitiesListStorage');
        const favoriteCityListParsed = JSON.parse(favoriteCityListJSON);

        return favoriteCityListParsed;
    },

    addToLocalStorage(set) {
        localStorage.setItem('favoriteCitiesListStorage', JSON.stringify([...set]));
    },

    addLastSelectedCityToLocalStorage(city) {
        localStorage.setItem('lastSelectedCity', city);
    },

    removeLastSelectedCityStorage() {
        localStorage.removeItem('lastSelectedCity');
    }
}
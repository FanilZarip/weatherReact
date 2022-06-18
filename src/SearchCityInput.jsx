import search from './img/search.svg'

function SearchCity({handleSubmit, inputValue, defaultValue, handleInputChange}) {
  
    return (
        <div className = "search">
            <form onSubmit = {handleSubmit} className = "d-flex weather__form" value = {inputValue}>
                <input type = "text" className = "inputCity" placeholder = "Enter city" value = {defaultValue} onChange = {handleInputChange} />
                <button type = "submit" className = "button search__button">
                <img src = {search} alt = "search" />
                </button>
            </form>
        </div>
    )
}

export default SearchCity
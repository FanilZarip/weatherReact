import React from 'react'
import SearchCity from './SearchCityInput'
import { Outlet, Link } from "react-router-dom";


import { createStore } from 'redux'
import { Provider } from 'react-redux';

import { weatherAPP } from './js/reducers'
import './styles/App.css'


const store = createStore(weatherAPP);


function App() {

  return (
    <Provider store={store}>
      <section className='container'>
        <div className='weather__wrapper'>
          <SearchCity/>
          <Outlet />
        </div>
        <nav style={{borderBottom: "solid 1px", paddingBottom: "1rem",}}>
          <Link to="/help">
            Help
          </Link> | {" "}
          <Link to="/stats">
            Stats
          </Link>
        </nav>
      </section>
    </Provider>
  )
}

export default App

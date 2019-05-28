import React, { Component } from 'react'
import './App.css'
import { Provider } from 'react-redux'
import configureStore from '../modules/store'
import Home from './Home'

const store = configureStore(window.REDUX_INITIAL_DATA)

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    )
  }
}

export default App

{/* < div > Icons made by < a href = "https://www.flaticon.com/authors/egor-rumyantsev" title = "Egor Rumyantsev" > Egor Rumyantsev</a > from < a href = "https://www.flaticon.com/" 			    title = "Flaticon" > www.flaticon.com</a > is licensed by < a href = "http://creativecommons.org/licenses/by/3.0/" 			    title = "Creative Commons BY 3.0" target = "_blank" > CC 3.0 BY</a ></div > */ }
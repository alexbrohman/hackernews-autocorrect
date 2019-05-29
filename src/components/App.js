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
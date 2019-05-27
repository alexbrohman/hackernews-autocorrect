import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { Provider } from 'react-redux'
import configureStore from './modules/store'
import Results from './Results'

const store = configureStore(window.REDUX_INITIAL_DATA)

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Results />
      </Provider>
    )
  }
}

export default App
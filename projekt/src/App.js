import React, { Component } from 'react';
import Main from './MainComponent';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './Redux/configureStore';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = ConfigureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
		      <Main />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;

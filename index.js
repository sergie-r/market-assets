import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './src/App';
import configureStore from './src/store/store';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
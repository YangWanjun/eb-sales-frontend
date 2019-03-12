import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { Provider } from 'react-redux'
import Routes from './routes';
import rootReducer from './reducers';

import "./assets/css/material-dashboard-react.css?v=1.5.0";

const store = createStore(
  rootReducer,
  // applyMiddleware関数でredux-loggerを設定
  applyMiddleware(logger)
);
    
ReactDOM.render((
    <Provider store={store}>
      <Routes />
    </Provider>
  ), document.querySelector('#app'));

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { Provider } from 'react-redux'
import Routes from './routes';
import * as reducers from './reducers';

import "./assets/css/material-dashboard-react.css?v=1.5.0";

const store = createStore(
  combineReducers({
    ...reducers,
  }),
  // applyMiddleware関数でredux-loggerを設定
  applyMiddleware(
    logger,
    thunk,
  ),
);

ReactDOM.render((
    <Provider store={store}>
      <Routes />
    </Provider>
  ), document.querySelector('#app')
);

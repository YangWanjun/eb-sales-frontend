import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import { Provider } from 'react-redux'

import App from './app';
import * as reducers from './reducers';

import "./assets/css/material-dashboard-react.css?v=1.5.0";

// バージョンの原因でConnectedRouterでhistoryを設定するには
// 「npm install --save react-router-redux@next」でインストールしてください。
const history = createBrowserHistory();

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  // applyMiddleware関数でredux-loggerを設定
  applyMiddleware(
    logger,
    thunk,
    routerMiddleware(history)
  ),
);

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
  ), document.querySelector('#app')
);

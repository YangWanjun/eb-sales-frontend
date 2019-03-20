import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux'
import createBrowserHistory from 'history/createBrowserHistory';

import * as reducers from '../reducers';

export const history = createBrowserHistory();

export const store = createStore(
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

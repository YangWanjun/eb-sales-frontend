import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'

import App from './app';
import { store, history } from './utils/store';

import "./assets/css/material-dashboard-react.css?v=1.5.0";

// バージョンの原因でConnectedRouterでhistoryを設定するには
// 「npm install --save react-router-redux@next」でインストールしてください。

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
  ), document.querySelector('#app')
);

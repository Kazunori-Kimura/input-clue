import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import MainContainer from './containers/MainContainer';
import reducer from './reducers';

import registerServiceWorker from './registerServiceWorker';
import './index.css';

const store = createStore(reducer, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
    <MainContainer />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import MainContainer from './containers/MainContainer';
import reducer from './reducers';
import saga from './sagas';

import registerServiceWorker from './registerServiceWorker';
import './index.css';

// sagaミドルウェアを作成
const sagaMiddleware = createSagaMiddleware();

// Storeにマウント
const store = createStore(
  reducer,
  applyMiddleware(
    logger,
    sagaMiddleware
  )
);

// sagaを起動
sagaMiddleware.run(saga);

ReactDOM.render(
  <Provider store={store}>
    <MainContainer />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();

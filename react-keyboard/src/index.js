import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import reducer from './reducers';
import saga from './sagas';
import './index.css';
import App from './App';
import i18n from './commons/i18n';
// import * as serviceWorker from './serviceWorker';

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
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Provider>,
  document.getElementById('root')
);

// serviceWorker.unregister();

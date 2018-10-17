import React from 'react';
import {
  BrowserRouter as Router,
  Route, Switch, Redirect,
} from 'react-router-dom';

import AppContainer from './containers/AppContainer';
import NoContent from './NoContent';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => (<Redirect to={{ pathname: '/thai' }} />)} />
      <Route path="/:lang" component={AppContainer} />
      <Route exact path="/nocontent" component={NoContent} />
    </Switch>
  </Router>
);

export default App;

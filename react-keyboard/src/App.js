import React from 'react';
import {
  BrowserRouter as Router,
  Route, Switch, Redirect,
} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import AppContainer from './containers/AppContainer';
import NoContent from './NoContent';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Route exact path="/" render={() => (<Redirect to={{ pathname: '/thai' }} />)} />
        <Route path="/:lang" component={AppContainer} />
        <Route exact path="/nocontent" component={NoContent} />
      </Switch>
    </Router>
  </MuiThemeProvider>
);

export default App;

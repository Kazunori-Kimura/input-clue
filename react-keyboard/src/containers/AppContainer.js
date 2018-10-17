import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import Header from '../components/Header';
import { languages } from '../commons';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    width: '100vw',
    height: '100vh',
    padding: theme.spacing.unit * 3,
    overflow: 'auto',
  }
});

class AppContainer extends Component {
  componentWillMount() {
    const { match: { params: { lang } }, history } = this.props;

    // 未定義の言語がURLに指定されていれば NoContent を表示
    if (typeof languages[lang] === 'undefined') {
      // Not Found
      history.push('/nocontent');
    }
  }

  render() {
    const { match: { params: { lang } }, classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <Header language={lang} />
          <div className={classes.content}>
            <div className={classes.appBarSpacer} />
            <h1>{lang}</h1>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

AppContainer.propTypes = {
  // react-router-dom
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  // material-ui
  classes: PropTypes.shape().isRequired,
};

export default withRouter(withStyles(styles)(AppContainer));

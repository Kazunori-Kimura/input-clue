import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import Header from '../components/Header';
import TextArea from '../components/TextArea';
import { languages } from '../commons';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  container: {
    width: 'auto',
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    overflow: 'auto',
    [theme.breakpoints.up(700 + theme.spacing.unit * 2 * 2)]: {
      width: 700,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});

class AppContainer extends Component {
  state = {
    value: '',
    caret: {
      start: 0,
      end: 0,
      direction: 'none',
    },
  };

  componentWillMount() {
    const { match: { params: { lang } }, history } = this.props;

    // 未定義の言語がURLに指定されていれば NoContent を表示
    if (typeof languages[lang] === 'undefined') {
      // Not Found
      history.push('/nocontent');
    }
  }

  handleChangeValue = (value) => {
    this.setState({
      value,
    });
  };

  handleChangeCaret = (caret) => {
    this.setState({
      caret: { ...caret },
    });
  };

  render() {
    const { match: { params: { lang } }, classes } = this.props;
    const { value, caret } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <Header language={lang} />
          <div className={classes.container}>
            <div className={classes.appBarSpacer} />
            <TextArea
              value={value}
              caret={caret}
              onChangeValue={this.handleChangeValue}
              onChangeCaret={this.handleChangeCaret}
            />
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

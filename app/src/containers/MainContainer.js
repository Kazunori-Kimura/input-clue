import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import CustomTextArea from '../components/CustomTextArea';
import FunctionButton from '../components/FunctionButton';
import WordList from '../components/WordList';
import * as actions from '../actions';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  container: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(700 + theme.spacing.unit * 2 * 2)]: {
      width: 700,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
});


class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleWordSelect = this.handleWordSelect.bind(this);
  }

  componentDidMount() {
    const { actions } = this.props;
    // 辞書の読み込み
    actions.fetchDictionary();
  }

  handleChange(word) {
    const { actions } = this.props;
    actions.onChangeWord(word);
  }

  handleSearch() {
    const { translate: { word }, actions } = this.props;
    actions.onTranslateClick(word);
    // if (/^[ぁ-ん]+$/.test(word)) {
    //   actions.onTranslateClick(word);
    // }
  }

  handleWordSelect(word) {
    const { actions } = this.props;
    actions.onWordClick(word);
  }

  render() {
    const { translate, classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar
          position="absolute"
          color="default"
          className={classes.appBar}
        >
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              Dictionary Search
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.container}>
          <Paper className={classes.paper}>
            <Grid container spacing={24}>
              <Grid item xs={10}>
                <CustomTextArea
                  word={translate.word}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={2}>
                <FunctionButton
                  label="検索"
                  onPress={this.handleSearch}
                />
              </Grid>
            </Grid>
            <WordList
              list={translate.list}
              onSelect={this.handleWordSelect}
            />
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

MainContainer.propTypes = {
  translate: PropTypes.shape().isRequired,
  actions: PropTypes.shape().isRequired,
  classes: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  translate: state.translate,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(MainContainer)
);

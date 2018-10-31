import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  textField: {
    flex: 1,
  },
  button: {
    width: '120px',
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
});

/**
 * 辞書検索バー
 */
class DictionarySearchBar extends Component {
  state = {
    value: '',
  };

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  };

  handleClick = () => {
    // const { value } = this.state;
    // console.log(value);
  };

  render() {
    const { classes, t } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.container}>
        <TextField
          required
          className={classes.textField}
          id="search"
          label="search"
          value={value}
          onChange={this.handleChange}
        />
        <Button
          className={classes.button}
          variant="contained"
          onClick={this.handleChange}
        >
          <SearchIcon className={classes.icon} />
          {t('search')}
        </Button>
      </div>
    );
  }
}

DictionarySearchBar.propTypes = {
  // material-ui
  classes: PropTypes.shape().isRequired,
  // react-i18next
  t: PropTypes.func.isRequired,
};

export default withNamespaces()(withStyles(styles)(DictionarySearchBar));

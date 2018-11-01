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
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: theme.spacing.unit,
  },
  textField: {
    flex: 1,
    marginRight: theme.spacing.unit,
  },
  button: {
    width: '90px',
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
});

/**
 * 辞書検索バー
 */
class DictionarySearchBar extends Component {
  handleChange = (e) => {
    const { onChange } = this.props;
    const value = e.target.value;
    onChange(value);
  };

  handleClick = () => {
    const { onClick } = this.props;
    onClick();
  };

  render() {
    const { classes, t, value } = this.props;

    return (
      <div className={classes.container}>
        <TextField
          className={classes.textField}
          id="search"
          label={t('dictionary.placeholder')}
          value={value}
          onChange={this.handleChange}
        />
        <Button
          className={classes.button}
          variant="contained"
          size="small"
          onClick={this.handleClick}
        >
          <SearchIcon className={classes.icon} />
          {t('dictionary.search')}
        </Button>
      </div>
    );
  }
}

DictionarySearchBar.defaultProps = {
  value: '',
};

DictionarySearchBar.propTypes = {
  // material-ui
  classes: PropTypes.shape().isRequired,
  // react-i18next
  t: PropTypes.func.isRequired,
  // component props
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default withNamespaces()(withStyles(styles)(DictionarySearchBar));

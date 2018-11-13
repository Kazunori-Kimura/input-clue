import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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
  matchType: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  label: {
    fontSize: '0.8rem',
    paddingRight: theme.spacing.unit * 2,
  },
  group: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  radio: {
    paddingRight: theme.spacing.unit * 2,
  },
  search: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

/**
 * 辞書検索バー
 */
class DictionarySearchBar extends Component {
  getMessage() {
    const { t, requesting } = this.props;
    if (requesting) {
      return t('dictionary.requesting');
    }
    return '';
  }

  handleChange = (e) => {
    const { onChange } = this.props;
    const value = e.target.value;
    onChange(value);
  };

  handleChangeMatchType = (e) => {
    const { onMatchTypeChange } = this.props;
    const value = e.target.value;
    onMatchTypeChange(value);
  };

  handleClick = () => {
    const { onClick } = this.props;
    onClick();
  };

  render() {
    const { classes, t, value, matchType, requesting } = this.props;

    return (
      <div className={classes.container}>
        <FormControl
          className={classes.matchType}
          disabled={requesting}
        >
          <FormLabel
            className={classes.label}
          >
            {t('dictionary.match.type')}
          </FormLabel>
          <RadioGroup
            className={classes.group}
            name="matchType"
            value={matchType}
            onChange={this.handleChangeMatchType}
          >
            <FormControlLabel
              className={classes.radio}
              value="forward"
              label={t('dictionary.match.forward')}
              control={<Radio color="primary" />}
            />
            <FormControlLabel
              className={classes.radio}
              value="partial"
              label={t('dictionary.match.partial')}
              control={<Radio color="primary" />}
            />
          </RadioGroup>
        </FormControl>
        <div className={classes.search}>
          <TextField
            className={classes.textField}
            id="search"
            label={t('dictionary.placeholder')}
            autoComplete="off"
            value={value}
            disabled={requesting}
            helperText={this.getMessage()}
            onChange={this.handleChange}
          />
          <Button
            className={classes.button}
            variant="contained"
            size="small"
            disabled={requesting}
            onClick={this.handleClick}
          >
            <SearchIcon className={classes.icon} />
            {t('dictionary.search')}
          </Button>
        </div>
      </div>
    );
  }
}

DictionarySearchBar.defaultProps = {
  value: '',
  requesting: false,
};

DictionarySearchBar.propTypes = {
  // material-ui
  classes: PropTypes.shape().isRequired,
  // react-i18next
  t: PropTypes.func.isRequired,
  // component props
  value: PropTypes.string,
  matchType: PropTypes.string.isRequired,
  requesting: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onMatchTypeChange: PropTypes.func.isRequired,
};

export default withNamespaces()(withStyles(styles)(DictionarySearchBar));

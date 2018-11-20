import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

const BASE_FONTS = '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif';
const ACTIVE_COLOR = '#ff3333';

const styles = () => ({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: '3px',
  },
  key: {
    fontSize: '28px',
    minWidth: '40px',
    padding: '3px',
    textTransform: 'none',
  },
});

class KoreanKey extends Component {
  handleClick = () => {
    const { code, onClick } = this.props;
    onClick(code);
  }

  render() {
    const {
      labelText, buttonText, color, classes, displayLabel,
      fontFamily, active,
    } = this.props;

    return (
      <div className={classes.container}>
        {labelText && displayLabel && (
          <span className={classes.label}>
            {labelText}
          </span>
        )}
        <Button
          className={classes.key}
          variant="outlined"
          style={{
            backgroundColor: active ? ACTIVE_COLOR : color,
            fontFamily: fontFamily ? `"${fontFamily}", ${BASE_FONTS}`: BASE_FONTS,
          }}
          onClick={this.handleClick}
        >
          {buttonText}
        </Button>
      </div>
    );
  }
}

KoreanKey.defaultProps = {
  color: '#cccccc',
  fontFamily: '',
  labelText: null,
  displayLabel: true,
  active: false,
};

KoreanKey.propTypes = {
  // material-ui
  classes: PropTypes.shape().isRequired,
  // component props
  labelText: PropTypes.string,
  displayLabel: PropTypes.bool,
  buttonText: PropTypes.string.isRequired,
  code: PropTypes.shape().isRequired,
  color: PropTypes.string,
  fontFamily: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(KoreanKey);

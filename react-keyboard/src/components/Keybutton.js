import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import { BASE_FONTS } from '../commons';

const styles = () => ({
  // Button
  key: {
    fontSize: '28px',
    minWidth: '40px',
    margin: '3px',
    padding: '3px',
    textTransform: 'none',
  },
});

class Keybutton extends Component {
  handleClick = () => {
    const { code, onClick } = this.props;
    onClick(this.getCharFromCode(code));
  }

  getCharFromCode = (code) => {
    const params = code.filter(c => c !== 0).reverse();
    //return String.fromCharCode(...params);
    return String.fromCodePoint(...params);
  };

  render() {
    const { code, color, classes, fontFamily, direction } = this.props;
    const char = this.getCharFromCode(code);

    return (
      <Button
        className={classes.key}
        variant="outlined"
        value={char}
        style={{
          backgroundColor: color,
          fontFamily: fontFamily ? `"${fontFamily}", ${BASE_FONTS}`: BASE_FONTS,
        }}
        dir={direction}
        onClick={this.handleClick}
      >
        {char}
      </Button>
    );
  }
}

Keybutton.defaultProps = {
  color: '#cccccc',
  fontFamily: '',
  direction: 'ltr',
};

Keybutton.propTypes = {
  // material-ui
  classes: PropTypes.shape().isRequired,
  // component props
  fontFamily: PropTypes.string,
  direction: PropTypes.string,
  code: PropTypes.arrayOf(PropTypes.number).isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(Keybutton);

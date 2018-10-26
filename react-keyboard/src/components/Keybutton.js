import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

const BASE_FONTS = '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif';

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
    return String.fromCharCode(...params);
  };

  render() {
    const { code, color, classes, fontFamily } = this.props;
    // TODO: 韓国語の場合のラベル表示を確認
    const char = this.getCharFromCode(code);

    return (
      <Button
        className={classes.key}
        variant="outlined"
        value={char}
        style={{
          backgroundColor: color,
          fontFamily: fontFamily ? `"${fontFamily}", ${BASE_FONTS}`: BASE_FONTS
        }}
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
};

Keybutton.propTypes = {
  // material-ui
  classes: PropTypes.shape().isRequired,
  // component props
  fontFamily: PropTypes.string,
  code: PropTypes.arrayOf(PropTypes.number).isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(Keybutton);

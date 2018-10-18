import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = () => ({
  // Button
  key: {
    fontSize: '28px',
    minWidth: '40px',
    minHeight: '20px',
    margin: '3px',
    padding: '2px',
  },
});

class Keybutton extends Component {
  handleClick = () => {
    const { code, onClick } = this.props;
    onClick(code);
  }

  render() {
    const { code, color, classes } = this.props;
    // TODO: 韓国語の場合のラベル表示を確認
    const label = String.fromCharCode(code[3]);

    return (
      <Button
        className={classes.key}
        variant="outlined"
        value={code}
        style={{ backgroundColor: color }}
        onClick={this.handleClick}
      >
        {label}
      </Button>
    );
  }
}

Keybutton.defaultProps = {
  color: '#cccccc',
};

Keybutton.propTypes = {
  // material-ui
  classes: PropTypes.shape().isRequired,
  // component props
  code: PropTypes.arrayOf(PropTypes.number).isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(Keybutton);

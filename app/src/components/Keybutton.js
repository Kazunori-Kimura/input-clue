import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import classnames from 'classnames';

const styles = () => ({
  key: {
    fontSize: '28px',
    minWidth: '40px',
    minHeight: '20px',
    margin: '3px',
    padding: '2px',
    backgroundColor: '#cccccc',
  },
  keyWhite: {
    backgroundColor: '#ffffff',
  },
  keyGreen: {
    backgroundColor: '#00ff99',
  },
});

class Keybutton extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { data, onClick } = this.props;
    onClick(data);
  }

  render() {
    const { data: { code, color }, classes } = this.props;
    const label = String.fromCharCode(code[3]);

    return (
      <Button
        className={classnames(
          classes.key,
          {
            [classes.keyWhite]: color === 'white',
            [classes.keyGreen]: color === 'green',
          },
        )}
        variant="outlined"
        size="small"
        value={code}
        onClick={this.handleClick}
      >
        {label}
      </Button>
    );
  }
}

Keybutton.defaultProps = {
  onClick: () => {},
};

Keybutton.propTypes = {
  data: PropTypes.shape().isRequired,
  classes: PropTypes.shape().isRequired,
  onClick: PropTypes.func,
};

export default withStyles(styles)(Keybutton);

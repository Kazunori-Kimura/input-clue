import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Keybutton from './Keybutton';
import keys from '../keycodes/thai';

const styles = theme => ({
  container: {
    width: '100%',
    padding: theme.spacing.unit,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
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

class Keyboard extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(key) {
    console.log(key);
  }

  renderRow(row, index) {
    const { classes } = this.props;
    const buttons = row.map(key => (
      <Keybutton
        key={`code_${key.code.join('')}`}
        data={key}
        onClick={this.handleClick}
      />
    ));
    return (
      <div
        className={classes.row}
        key={`row_${index}`}
      >
        {buttons}
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    const rows = keys.map((row, index) => this.renderRow(row, index));
    return (
      <div className={classes.container}>
        {rows}
      </div>
    );
  }
}

Keyboard.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Keyboard);

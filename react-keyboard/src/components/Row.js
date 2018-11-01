import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { TableRow, TableCell } from '@material-ui/core';

const styles = {
  cell: {
    width: '33%',
  },
};

class Row extends Component {
  handleClick = () => {
    const { onClick, value } = this.props;
    onClick(value.word);
  };

  render() {
    const { classes, value } = this.props;

    return (
      <TableRow
        hover
        onClick={this.handleClick}
      >
        <TableCell className={classes.cell}>
          {value.kana}
        </TableCell>
        <TableCell className={classes.cell}>
          {value.word}
        </TableCell>
        <TableCell className={classes.cell}>
          {value.mean}
        </TableCell>
      </TableRow>
    );
  }
}

Row.propTypes = {
  // material-ui
  classes: PropTypes.shape().isRequired,
  // component props
  value: PropTypes.shape().isRequired,
  onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(Row);

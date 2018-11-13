import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import { TableRow, TableCell } from '@material-ui/core';

const styles = theme => ({
  cell: {
    width: '33%',
    borderRightWidth: 1,
    borderRightColor: theme.palette.divider,
    borderRightStyle: 'solid',
    '&:nth-last-child(1)': {
      borderRight: 'none',
    },
  },
  word: {
    fontSize: 20,
  },
});

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
        <TableCell className={classnames([classes.cell, classes.word])}>
          {value.word}
        </TableCell>
        <TableCell className={classes.cell}>
          {value.mean}
        </TableCell>
        <TableCell className={classes.cell}>
          {value.pro}
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class WordListItem extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { word, onClick } = this.props;
    onClick(word);
  }

  render() {
    const { word } = this.props;
    return (
      <TableRow
        hover
        onClick={this.handleClick}
      >
        <TableCell>{word}</TableCell>
        <TableCell />
        <TableCell />
        <TableCell />
      </TableRow>
    );
  }
}

WordListItem.defaultProps = {
  word: '',
};

WordListItem.propTypes = {
  word: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default WordListItem;

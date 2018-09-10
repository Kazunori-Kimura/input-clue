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
    onClick(word.word);
  }

  render() {
    const { word: { kana, word, mean } } = this.props;
    return (
      <TableRow
        hover
        onClick={this.handleClick}
      >
        <TableCell>{kana}</TableCell>
        <TableCell>{word}</TableCell>
        <TableCell>{mean}</TableCell>
      </TableRow>
    );
  }
}

WordListItem.defaultProps = {
  word: {
    kana: '',
    word: '',
    mean: '',
  },
};

WordListItem.propTypes = {
  word: PropTypes.shape({
    kana: PropTypes.string,
    word: PropTypes.string,
    mean: PropTypes.string,
  }),
  onClick: PropTypes.func.isRequired,
};

export default WordListItem;

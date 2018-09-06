import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      <div>
        <button
          type="button"
          onClick={this.handleClick}
        >
          {word}
        </button>
      </div>
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

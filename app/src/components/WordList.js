import React from 'react';
import PropTypes from 'prop-types';
import WordListItem from './WordListItem';

const WordList = ({ list, onSelect }) => {
  const items = list.map(item => (
    <WordListItem
      key={`key_${item}`}
      word={item}
      onClick={onSelect}
    />
    )
  );
  return (
    <div>
      {items}
    </div>
  );
};

WordList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default WordList;

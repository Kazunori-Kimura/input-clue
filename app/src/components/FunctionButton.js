import React from 'react';
import PropTypes from 'prop-types';

const FunctionButton = (props) => {
  const { label, onPress } = props;
  return (
    <button
      type="button"
      onClick={onPress}
    >
      {label}
    </button>
  );
};

FunctionButton.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default FunctionButton;

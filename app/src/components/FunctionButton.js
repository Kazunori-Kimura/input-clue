import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const FunctionButton = (props) => {
  const { label, onPress } = props;
  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={onPress}
    >
      {label}
    </Button>
  );
};

FunctionButton.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default FunctionButton;

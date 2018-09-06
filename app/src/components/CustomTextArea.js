import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CustomTextArea extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { onChange } = this.props;
    onChange(e.target.value);
  }

  render() {
    const { word } = this.props;
    return (
      <textarea
        value={word}
        onChange={this.handleChange}
      />
    );
  }
}

CustomTextArea.defaultProps = {
  word: '',
};

CustomTextArea.propTypes = {
  word: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default CustomTextArea;

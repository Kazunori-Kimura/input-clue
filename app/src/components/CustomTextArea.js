import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  container: {
    width: '100%',
    marginBottom: theme.spacing.unit * 3,
  },
  textArea: {
    width: '100%',
  },
});

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
    const { word, classes } = this.props;
    return (
      <form
        noValidate
        autoComplete="off"
        className={classes.container}
      >
        <TextField
          className={classes.textArea}
          multiline
          rows="4"
          value={word}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

CustomTextArea.defaultProps = {
  word: '',
};

CustomTextArea.propTypes = {
  word: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(CustomTextArea);

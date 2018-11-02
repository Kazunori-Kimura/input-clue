import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import BackspaceIcon from '@material-ui/icons/Backspace';
import Keybutton from './Keybutton';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  topRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  function: {
    margin: theme.spacing.unit,
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
});

class Keyboard extends Component {
  state = {
    keys: [],
  };

  componentWillMount() {
    // keycode読み込み
    const { keycode } = this.props;
    this.fetchKeycode(keycode);
  }

  componentWillReceiveProps(nextProps) {
    const { keycode: current } = this.props;
    const { keycode: next } = nextProps;

    if (current !== next) {
      this.fetchKeycode(next);
    }
  }

  fetchKeycode = (keycode) => {
    if (keycode) {
      // JSONをfetchしてstateに保持
      fetch(`./keycode/${keycode}`)
        .then(res => res.json())
        .then(data => this.setState({ keys: data }));
        // .catch(err => console.error(err));
    }
  }

  handleSpaceKeyClick = () => {
    const { onClick } = this.props;
    onClick(' ');
  };

  renderRow = (row, index) => {
    const { classes } = this.props;
    return (
      <div
        key={`row_${index}`}
        className={classes.row}
      >
        {row.map(this.renderKey)}
      </div>
    );
  };

  renderKey = ({ code, color = '#cccccc', type = 'button', value = '' }, index) => {
    const { onClick, fontFamily } = this.props;

    if (type === 'hr') {
      return (
        <hr
          key={`hr_${index}`}
          style={{ width: '100%' }}
        />
      );
    }
    if (type === 'label') {
      return (
        <span key={`label_${index}`}>
          {value}
        </span>
      );
    }

    return (
      <Keybutton
        key={`button_${code.join('')}_${index}`}
        fontFamily={fontFamily}
        code={code}
        color={color}
        onClick={onClick}
      />
    );
  };

  render() {
    const { classes, onBackspaceClick } = this.props;
    const { keys } = this.state;

    return (
      <div className={classes.container}>
        <div className={classes.topRow}>
          {/* Space */}
          <Button
            className={classes.function}
            style={{ flex: 3 }}
            color="default"
            variant="outlined"
            onClick={this.handleSpaceKeyClick}
          >
            Space
          </Button>
          {/* Backspace */}
          <Button
            className={classes.function}
            style={{ flex: 1 }}
            color="default"
            variant="outlined"
            onClick={onBackspaceClick}
          >
            <BackspaceIcon
              fontSize="small"
              className={classes.icon}
            />
            Backspace
          </Button>
        </div>
        {keys.map(this.renderRow)}
      </div>
    );
  }
}

Keyboard.defaultProps = {
  fontFamily: '',
};

Keyboard.propTypes = {
  // material-ui
  classes: PropTypes.shape().isRequired,
  // component props
  keycode: PropTypes.string.isRequired,
  fontFamily: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onBackspaceClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(Keyboard);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import BackspaceIcon from '@material-ui/icons/Backspace';
// import Keybutton from './Keybutton';
import KoreanKey from './KoreanKey';

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
  submit: {
    width: 140,
    height: 60,
    fontSize: 26,
    fontWeight: 'bold',
    marginRight: theme.spacing.unit / 2,
  },
  reset: {
    width: 60,
    height: 60,
    fontSize: 12,
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
});

class KoreanKeyboard extends Component {
  state = {
    keys: [],
    start: -1,  // 初声
    middle: -1, // 中声
    end: 0,    // 終声
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

  /**
   * 初声、中声、終声のコードから文字を取得する
   */
  getKoreanChar() {
    const { start, middle, end } = this.state;
    if (start < 0 || middle < 0) {
      return '';
    }
    const codePoint = 44032 + (start * 28 * 21) + (middle * 28) + end;
    return String.fromCharCode(codePoint);
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

  handleKoreanKeyClick = (code) => {
    this.setState(code);
  };

  handleSubmit = () => {
    const { onClick } = this.props;
    const char = this.getKoreanChar();
    onClick(char);
    this.handleReset();
  };

  handleReset = () => {
    this.setState({
      start: -1,
      middle: -1,
      end: 0,
    });
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

  renderKey = ({
    code,
    label,
    button,
    color = '#cccccc',
    type = 'button',
    value = ''
  }, index) => {
    const { fontFamily } = this.props;

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

    // そのボタンが選択状態かどうかを判定
    const active = Object.keys(code).some((key) => {
      const { [key]: stateCode } = this.state;
      return code[key] === stateCode;
    });

    return (
      <KoreanKey
        key={`button_${button}_${index}`}
        fontFamily={fontFamily}
        code={code}
        color={color}
        labelText={label}
        buttonText={button}
        active={active}
        onClick={this.handleKoreanKeyClick}
      />
    );
  };

  render() {
    const { classes, onBackspaceClick } = this.props;
    const { keys } = this.state;

    const char = this.getKoreanChar();

    return (
      <div className={classes.container}>
        <div className={classes.topRow}>
          {/* Space */}
          <Button
            className={classes.function}
            style={{ flex: 2 }}
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
        <div className={classes.topRow}>
          {/* 韓国語文字決定 */}
          <Button
            className={classes.submit}
            color="default"
            variant="contained"
            onClick={this.handleSubmit}
          >
            {char}
          </Button>
          <Button
            className={classes.reset}
            color="default"
            variant="outlined"
            onClick={this.handleReset}
          >
            Reset
          </Button>
        </div>
        {keys.map(this.renderRow)}
      </div>
    );
  }
}

KoreanKeyboard.defaultProps = {
  fontFamily: '',
};

KoreanKeyboard.propTypes = {
  // material-ui
  classes: PropTypes.shape().isRequired,
  // component props
  keycode: PropTypes.string.isRequired,
  fontFamily: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onBackspaceClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(KoreanKeyboard);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { withNamespaces } from 'react-i18next';
import { Button, Switch, FormControlLabel } from '@material-ui/core';
import BackspaceIcon from '@material-ui/icons/Backspace';
import KoreanKey from './KoreanKey';
import KoreanParticle from './KoreanParticle';

// localStorageのキー
const KEY_KOREAN_LABEL = 'korean_keyboard_label';

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
  spacer: {
    flex: 1,
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
    displayLabel: true,
    start: -1,  // 初声
    middle: -1, // 中声
    end: 0,    // 終声
  };

  componentWillMount() {
    // keycode読み込み
    const { keycode } = this.props;
    this.fetchKeycode(keycode);

    // ラベル表示
    const value = localStorage.getItem(KEY_KOREAN_LABEL);
    if (value) {
      this.setState({ displayLabel: value === '1' });
    }
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

  handleKoreanParticleKeyClick = (value) => {
    const { onClick } = this.props;
    onClick(value);
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

  handleLabelSwitch = () => {
    // switchをトグルする
    const { displayLabel } = this.state;
    this.setState({ displayLabel: !displayLabel });

    localStorage.setItem(KEY_KOREAN_LABEL, (!displayLabel) ? '1' : '0');
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
    const { displayLabel } = this.state;

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
        displayLabel={displayLabel}
        buttonText={button}
        active={active}
        onClick={this.handleKoreanKeyClick}
      />
    );
  };

  render() {
    const { classes, onBackspaceClick, t } = this.props;
    const { keys, displayLabel } = this.state;

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
          <div className={classes.spacer} />
          {/* 韓国語文字決定 */}
          <Button
            className={classes.submit}
            color="default"
            variant="contained"
            onClick={this.handleSubmit}
          >
            {char}
          </Button>
          <div className={classes.spacer}>
            <Button
              className={classes.reset}
              color="default"
              variant="outlined"
              onClick={this.handleReset}
            >
              Reset
            </Button>
            <div className={classes.spacer} />
            <FormControlLabel
              control={(
                <Switch
                  color="primary"
                  checked={displayLabel}
                  onChange={this.handleLabelSwitch}
                />
              )}
              label={t('functions.show_label')}
              labelPlacement="bottom"
            />
          </div>
        </div>
        {keys.map(this.renderRow)}
        {/* 主要助詞 */}
        <KoreanParticle
          onClick={this.handleKoreanParticleKeyClick}
        />
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
  // i18next
  t: PropTypes.func.isRequired,
  // component props
  keycode: PropTypes.string.isRequired,
  fontFamily: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onBackspaceClick: PropTypes.func.isRequired,
};

export default withNamespaces()(withStyles(styles)(KoreanKeyboard));

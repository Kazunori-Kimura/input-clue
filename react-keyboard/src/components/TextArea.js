import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import CopyIcon from '@material-ui/icons/FileCopy';
import withStyles from '@material-ui/core/styles/withStyles';
import { withNamespaces } from 'react-i18next';

const styles = theme => ({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    paddingTop: theme.spacing.unit,
  },
  content: {
    flex: 1,
    margin: theme.spacing.unit,
  },
  textArea: {
    fontSize: 20,
    lineHeight: 1.4,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

class TextArea extends Component {
  state = {
    input: null,
    message: '',
    prevCaret: null,
  };

  componentWillReceiveProps(nextProps) {
    const { caret } = nextProps;
    const { prevCaret } = this.state;

    if (prevCaret && !this.compareCaret(prevCaret, caret)) {
      this.setCaret(caret);
    }
  }

  /**
   * 2つのカーソルを比較
   */
  compareCaret = (prevCaret, nextCaret) => {
    const {
      start: prevStart,
      end: prevEnd,
      direction: prevDirection,
    } = prevCaret;
    const {
      start: nextStart,
      end: nextEnd,
      direction: nextDirection,
    } = nextCaret;

    return prevStart === nextStart &&
      prevEnd === nextEnd &&
      prevDirection === nextDirection;
  };

  /**
   * カーソル位置を取得する
   */
  getCaret = () => {
    const { input, prevCaret } = this.state;
    const { onChangeCaret } = this.props;
    if (input) {
      const position = {
        start: input.selectionStart,
        end: input.selectionEnd,
        direction: input.selectionDirection,
      };
      
      // 前に取得したcaretとの比較
      if (prevCaret === null || !this.compareCaret(prevCaret, position)) {
        // 変化があれば親に通知
        onChangeCaret(position);
        this.setState({
          prevCaret: { ...position },
        });
      }

      input.focus();
      return position;
    }
    return null;
  };

  /**
   * カーソル位置を変更する
   */
  setCaret = (options = { start: 0, end: 0, direction: 'none' }) => {
    const { start, end, direction } = options;
    const { input } = this.state;
    if (input) {
      setTimeout(() => {
        input.setSelectionRange(start, end, direction);
        input.focus();
      }, 50);
    }
  };

  /**
   * input要素を保持し、イベントを設定する
   */
  setInputRef = (input) => {
    this.setState({
      input,
    });
    ['select', 'focus', 'change', 'click', 'keyup'].forEach(
      type => input.addEventListener(type, this.getCaret),
    );
  };

  /**
   * テキストのコピー
   */
  handleCopy = () => {
    const { input } = this.state;
    const { t } = this.props;
    if (input) {
      // 現在のカーソル位置
      const caret = this.getCaret();
      // 全体を選択してコピー
      input.select();
      document.execCommand('copy');
      // 選択状態を復元
      input.setSelectionRange(caret.start, caret.end, caret.direction);
      input.focus();

      this.setState({
        message: t('message.copy'),
      });
      // 3秒後にメッセージ消去
      setTimeout(this.clearMessage, 5000);
    }
  };

  clearMessage = () => {
    this.setState({
      message: '',
    });
  };

  handleClear = () => {
    const { input } = this.state;
    const { onChangeValue, onChangeCaret } = this.props;
    if (input) {
      onChangeValue('');
      onChangeCaret({ start: 0, end: 0, direction: 'none' });
      this.setCaret();
    }
  };

  handleChange = (e) => {
    const { onChangeValue } = this.props;
    const value = e.target.value;
    onChangeValue(value);
  };

  render() {
    const { classes, value } = this.props;
    const { message } = this.state;

    return (
      <div className={classes.container}>
        <FormControl className={classes.content}>
          <Input
            classes={{
              input: classes.textArea,
            }}
            value={value}
            autoFocus
            fullWidth
            rows={3}
            multiline
            inputRef={this.setInputRef}
            onChange={this.handleChange}
          />
          <FormHelperText>
            {message}
          </FormHelperText>
        </FormControl>
        <div className={classes.buttons}>
          <IconButton
            color="secondary"
            aria-label="Clear"
            onClick={this.handleClear}
          >
            <ClearIcon fontSize="small" />
          </IconButton>
          <IconButton
            aria-label="Copy"
            onClick={this.handleCopy}
          >
            <CopyIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
    );
  }
}

TextArea.defaultProps = {
  value: '',
  caret: {
    start: 0,
    end: 0,
    direction: 'none',
  },
};

TextArea.propTypes = {
  value: PropTypes.string,
  caret: PropTypes.shape(),
  onChangeValue: PropTypes.func.isRequired,
  onChangeCaret: PropTypes.func.isRequired,
  // material-ui
  classes: PropTypes.shape().isRequired,
  // react-i18next
  t: PropTypes.func.isRequired,
};

export default withNamespaces()(withStyles(styles)(TextArea));

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  container: {
    width: '100%',
    marginBottom: theme.spacing.unit * 3,
  },
  textArea: {
    width: '100%',
  },
  functions: {
    margin: theme.spacing.unit,
    width: '100px',
  },
});

class CustomTextArea extends Component {
  constructor(props) {
    super(props);

    this.inputRef = null;

    this.insert = this.insert.bind(this);
    this.backspace = this.backspace.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBackspace = this.handleBackspace.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
    this.handleSpace = this.handleSpace.bind(this);
    this.setCaret = this.setCaret.bind(this);
  }

  /**
   * 選択範囲/カーソル位置の取得
   */
  getSelection() {
    if (this.inputRef) {
      return {
        start: this.inputRef.selectionStart,
        end: this.inputRef.selectionEnd,
        direction: this.inputRef.selectionDirection,
      };
    }
    return {
      start: 0,
      end: 0,
      direction: 'none',
    };
  }

  /**
   * カーソル位置をセット
   * @param {number} position 
   */
  setCaret(position) {
    if (this.inputRef) {
      setTimeout(() => {
        this.inputRef.setSelectionRange(position, position, 'none');
        this.inputRef.focus();
      }, 50);
    }
  }

  insert(char = '') {
    if (this.inputRef) {
      const { onChange } = this.props;
      const selection = this.getSelection();
      const value = this.inputRef.value;
      // selection.startより前部分
      const prefix = value.slice(0, selection.start);
      // selection.endより後ろ部分
      const suffix = value.slice(selection.end);
      // がっちゃんこ
      const newValue = `${prefix}${char}${suffix}`;
      // 値を更新
      onChange(newValue);

      // カーソル位置を戻す
      this.setCaret(selection.start + 1);
    }
  }

  backspace() {
    if (this.inputRef) {
      const { onChange } = this.props;
      const selection = this.getSelection();
      const value = this.inputRef.value;
      // selection.startより前部分
      const prefix = value.slice(0, selection.start - 1);
      // selection.endより後ろ部分
      const suffix = value.slice(selection.end);
      // がっちゃんこ
      const newValue = `${prefix}${suffix}`;
      // 値を更新
      onChange(newValue);

      // カーソル位置を戻す
      this.setCaret(selection.start - 1);
    }
  }

  handleChange(e) {
    const { onChange } = this.props;
    onChange(e.target.value);
  }

  handleCopy() {
    // textareaの内容をclipboardにコピー
    if (this.inputRef) {
      // 現在のカーソル位置をバックアップ
      const selection = this.getSelection();
      this.inputRef.select();
      document.execCommand('copy');
      // 選択状態を復元する
      this.inputRef.setSelectionRange(selection.start, selection.end, selection.direction);
      this.inputRef.focus();
    }
  }

  handleClear() {
    const { onChange } = this.props;
    onChange('');
    this.inputRef.focus();
  }

  handleSpace() {
    // 現在のカーソル位置にspaceを挿入
    this.insert(' ');
  }

  handleBackspace() {
    // 現在のカーソル位置の前の文字を削除
    this.backspace();
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
          inputRef={input => this.inputRef = input}
          onChange={this.handleChange}
        />
        <div>
          <Button
            className={classes.functions}
            variant="outlined"
            size="small"
            onClick={this.handleCopy}
          >
            Copy
          </Button>
          <Button
            className={classes.functions}
            variant="outlined"
            size="small"
            onClick={this.handleClear}
          >
            Clear
          </Button>
          <Button
            className={classes.functions}
            variant="outlined"
            size="small"
            onClick={this.handleSpace}
          >
            Space
          </Button>
          <Button
            className={classes.functions}
            variant="outlined"
            size="small"
            onClick={this.handleBackspace}
          >
            Backspace
          </Button>
        </div>
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

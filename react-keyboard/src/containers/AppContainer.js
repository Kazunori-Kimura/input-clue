import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import Header from '../components/Header';
import TextArea from '../components/TextArea';
import Keyboard from '../components/Keyboard';
import FunctionKeys from '../components/FunctionKeys';
import { languages } from '../commons';
import * as actions from '../actions';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  container: {
    width: 'auto',
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    overflow: 'auto',
    [theme.breakpoints.up(700 + theme.spacing.unit * 2 * 2)]: {
      width: 700,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});

class AppContainer extends Component {
  state = {
    value: '',
    caret: {
      start: 0,
      end: 0,
      direction: 'none',
    },
    lang: '',
    keycode: '',
    fontFamily: '',
    dictionary: '',
  };

  componentWillMount() {
    const { match: { params: { lang } }, history } = this.props;

    // キーボードの設定
    this.handleKeyboardLanguage(lang, history);
  }

  componentDidMount() {
    // 辞書ファイルの読み込み
    this.loadDictionary();
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params: { lang } }, history } = this.props;
    const { match: { params: { lang: nextLang } } } = nextProps;

    if (lang !== nextLang) {
      // キーボードの設定
      this.handleKeyboardLanguage(nextLang, history);
      // 辞書ファイルの読み込み
      this.loadDictionary();
    }
  }

  /**
   * キーボード言語の設定
   * @param {String} lang
   * @param {*} history
   */
  handleKeyboardLanguage = (lang, history) => {
    // 未定義の言語がURLに指定されていれば NoContent を表示
    if (typeof languages[lang] === 'undefined') {
      // Not Found
      history.push('./nocontent');
      return;
    }

    // 選択した言語の設定で上書きする
    const newState = Object.assign(
      {
        lang,
        keycode: '',
        fontFamily: '',
        dictionary: '',
      },
      languages[lang],
    );

    this.setState(newState);
  };

  loadDictionary = () => {
    const { lang, dictionary } = this.state;
    console.log(lang, dictionary);
    
    if (lang && dictionary) {
      // 辞書の読み込み
      const { actions } = this.props;
      actions.loadDictionary({ lang, dictionary });
    }
  };

  handleChangeValue = (value) => {
    this.setState({
      value,
    });
  };

  handleChangeCaret = (caret) => {
    this.setState({
      caret: { ...caret },
    });
  };

  insert = (char) => {
    const { value, caret } = this.state;
    const newCaret = {};

    if (value === '') {
      this.setState({
        value: char,
        caret: {
          start: char.length,
          end: char.length,
          direction: 'none',
        },
      });
      return;
    }

    const before = value.slice(0, caret.start);
    const after = value.slice(caret.end);
    newCaret.start = caret.start + char.length;
    newCaret.end = caret.start + char.length;
    newCaret.direction = 'none';

    this.setState({
      value: `${before}${char}${after}`,
      caret: newCaret,
    });
  };

  handleKeyboardClick = (char) => {
    this.insert(char);
  };

  handleKeyboardBackspaceClick = () => {
    const { value, caret } = this.state;
    if (value === '') {
      // 値が空なら何もしない
      return;
    }

    if (caret.start === 0 && caret.end === 0) {
      // 先頭なら何もしない
      return;
    }

    let before = '';
    let after = '';
    const newCaret = {};
    if (caret.start === caret.end) {
      // 未選択の場合はcaretの前1文字を削除
      before = value.slice(0, caret.start - 1);
      after = value.slice(caret.end);
      newCaret.start = caret.start - 1;
      newCaret.end = caret.start - 1;
      newCaret.direction = 'none';
    } else {
      // 選択範囲を削除
      before = value.slice(0, caret.start);
      after = value.slice(caret.end);
      newCaret.start = caret.start;
      newCaret.end = caret.start;
      newCaret.direction = 'none';
    }

    // stateの更新
    this.setState({
      value: `${before}${after}`,
      caret: newCaret,
    });
  };

  render() {
    const { match: { params: { lang } }, classes } = this.props;
    const { value, caret, keycode, fontFamily } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <Header language={lang} />
          <div className={classes.container}>
            <div className={classes.appBarSpacer} />
            <TextArea
              value={value}
              caret={caret}
              onChangeValue={this.handleChangeValue}
              onChangeCaret={this.handleChangeCaret}
            />
            <FunctionKeys value={value} />
            <Keyboard
              keycode={keycode}
              fontFamily={fontFamily}
              onClick={this.handleKeyboardClick}
              onBackspaceClick={this.handleKeyboardBackspaceClick}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

AppContainer.propTypes = {
  // react-router-dom
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  // material-ui
  classes: PropTypes.shape().isRequired,
  // redux
  actions: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  translate: state.translate,
  dictionary: state.dictionary,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(withStyles(styles)(AppContainer))
);

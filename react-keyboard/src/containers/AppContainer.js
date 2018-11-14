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
import KoreanKeyboard from '../components/KoreanKeyboard';
import FunctionKeys from '../components/FunctionKeys';
import LoadingIndicator from '../components/Loading';
import SearchBar from '../components/DictionarySearchBar';
import SearchPanel from '../components/DictionarySearchPanel';
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
    searchWord: '',
    matchType: 'forward',
    caret: {
      start: 0,
      end: 0,
      direction: 'none',
    },
    lang: '',
    keycode: '',
    fontFamily: '',
  };

  componentWillMount() {
    const { match: { params: { lang } }, history } = this.props;

    // キーボードの設定
    this.handleKeyboardLanguage(lang, history);
    // 辞書ファイルの読み込み
    this.loadDictionary(lang);
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params: { lang } }, history } = this.props;
    const { match: { params: { lang: nextLang } } } = nextProps;

    if (lang !== nextLang) {
      // キーボードの設定
      this.handleKeyboardLanguage(nextLang, history);
      // 辞書ファイルの読み込み
      this.loadDictionary(nextLang);
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

  /**
   * 辞書ファイルの読み込み
   * @param {String} lang
   */
  loadDictionary = (lang) => {
    // 未定義の言語なら無視する
    if (typeof languages[lang] === 'undefined') {
      return;
    }

    // 辞書ファイル名の取得
    const { dictionary } = languages[lang];
    const { actions } = this.props;
    if (dictionary) {
      // 辞書の読み込み
      actions.loadDictionary({ lang, dictionary });
    } else {
      actions.resetDictionaryStatus();
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

  /**
   * 辞書検索ワードの入力
   */
  handleSearchBarChange = (value) => {
    this.setState({
      searchWord: value,
    });
  };

  /**
   * 検索方法の変更
   */
  handleMatchTypeChange = (value) => {
    this.setState({
      matchType: value,
    });
  };

  /**
   * 辞書検索
   */
  handleSearchBarClick = () => {
    const { lang, searchWord, matchType } = this.state;
    const { actions } = this.props;
    actions.translateWord({ lang, word: searchWord, matchType });
  };

  /**
   * 辞書検索結果をクリック
   */
  handleSearchResultClick = (word) => {
    this.insert(word);
    // 検索結果を閉じる
    this.handleSearchResultClose();
  };

  /**
   * 辞書検索結果を閉じる
   */
  handleSearchResultClose = () => {
    const { actions } = this.props;
    actions.clearTranslateList();
    this.setState({
      searchWord: '',
    });
  };

  render() {
    const {
      match: { params: { lang } },
      classes,
      dictionary: {
        requesting,
        succeeded,
      },
      translate: {
        requesting: translating,
        list,
      },
    } = this.props;
    const {
      value, caret, keycode, fontFamily,
      searchWord, matchType,
    } = this.state;

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
            {list.length > 0 && (
              <SearchPanel
                list={list}
                onClick={this.handleSearchResultClick}
                onClose={this.handleSearchResultClose}
              />
            )}
            {succeeded && (
              <SearchBar
                value={searchWord}
                matchType={matchType}
                requesting={translating}
                onChange={this.handleSearchBarChange}
                onClick={this.handleSearchBarClick}
                onMatchTypeChange={this.handleMatchTypeChange}
              />
            )}
            {list.length === 0 && (
              <React.Fragment>
                <FunctionKeys value={value} />
                {lang !== 'korean' && (
                  <Keyboard
                    keycode={keycode}
                    fontFamily={fontFamily}
                    onClick={this.handleKeyboardClick}
                    onBackspaceClick={this.handleKeyboardBackspaceClick}
                  />
                )}
                {lang === 'korean' && (
                  <KoreanKeyboard
                    keycode={keycode}
                    fontFamily={fontFamily}
                    onClick={this.handleKeyboardClick}
                    onBackspaceClick={this.handleKeyboardBackspaceClick}
                  />
                )}
              </React.Fragment>
            )}
          </div>
        </div>
        {requesting && <LoadingIndicator />}
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
  dictionary: PropTypes.shape().isRequired,
  translate: PropTypes.shape().isRequired,
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

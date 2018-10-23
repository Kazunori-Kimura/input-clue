import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    margin: theme.spacing.unit,
  },
});

const WINDOW_TARGET = '_blank';
const WINDOW_OPTIONS = 'menubar=0,width=700,height=600,top=100,left=100';

class FunctionKeys extends Component {
  shouldComponentUpdate() {
    // 描画の更新不要
    return false;
  }

  handleGoogleImageSearch = () => {
    const { value } = this.props;
    const uri = `https://www.google.co.jp/search?q=${value}&hl=ja&source=lnms&tbm=isch&sa=X&ved=0ahUKEwig9rq7l77ZAhXIE7wKHShXC3YQ_AUICigB&biw=919&bih=604`;
    window.open(uri, WINDOW_TARGET, WINDOW_OPTIONS);
  };

  handleGoogleTranslate = () => {
    const { value } = this.props;
    const uri = `https://translate.google.co.jp/?hl=ja#th/ja/${encodeURI(value)}`;
    window.open(uri, WINDOW_TARGET, WINDOW_OPTIONS);
  };

  handleWeblio = () => {
    const { value } = this.props;
    const uri = `https://tjjt.weblio.jp/content_find/contains/0/${encodeURI(value)}`;
    window.open(uri, WINDOW_TARGET, WINDOW_OPTIONS);
  };

  handleTyakusu = () => {
    const { value } = this.props;
    const uri = `https://tyakusu.appspot.com/search?q=${value}&action=translate`;
    window.open(uri, WINDOW_TARGET, WINDOW_OPTIONS);
  };

  handleYouTube = () => {
    const { value } = this.props;
    const uri = `https://www.youtube.com/results?search_query=${encodeURI(value)}`;
    window.open(uri, WINDOW_TARGET, WINDOW_OPTIONS);
  };

  render() {
    const { classes, t } = this.props;
    return (
      <div className={classes.container}>
        {/* 画像検索 */}
        <Button
          className={classes.button}
          onClick={this.handleGoogleImageSearch}
          color="primary"
          variant="contained"
        >
          {t('functions.image')}
        </Button>
        {/* Google翻訳 */}
        <Button
          className={classes.button}
          onClick={this.handleGoogleTranslate}
          color="primary"
          variant="contained"
        >
          {t('functions.trans')}
        </Button>
        {/* Weblio */}
        <Button
          className={classes.button}
          onClick={this.handleWeblio}
          color="primary"
          variant="contained"
        >
          {t('functions.weblio')}
        </Button>
        {/* TYakusu */}
        <Button
          className={classes.button}
          onClick={this.handleTyakusu}
          color="primary"
          variant="contained"
        >
          {t('functions.tyakusu')}
        </Button>
        {/* YouTube */}
        <Button
          className={classes.button}
          onClick={this.handleYouTube}
          color="primary"
          variant="contained"
        >
          {t('functions.youtube')}
        </Button>
      </div>
    );
  }
}

FunctionKeys.propTypes = {
  // material-ui
  classes: PropTypes.shape().isRequired,
  // i18next
  t: PropTypes.func.isRequired,
  // component props
  value: PropTypes.string.isRequired,
};

export default withNamespaces()(withStyles(styles)(FunctionKeys));

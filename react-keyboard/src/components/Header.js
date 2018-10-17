import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { languages, interfaceLanguages } from '../commons';

const styles = {
  title: {
    textDecoration: 'none',
  },
  nav: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  menuItem: {
    textDecoration: 'none',
  }
};

class Header extends Component {
  state = {
    lang: 'ja', // インターフェイスの言語
    anchor: null,
    menu: '', // 表示中のメニュー
  };

  componentWillMount() {
    // インターフェイスの言語を取得する
    const lang = localStorage.getItem('lang');
    if (lang) {
      const { i18n } = this.props;
      i18n.changeLanguage(lang);
      this.setState({ lang });
    }
  }

  /**
   * インターフェイスの言語を切り替える
   */
  handleChangeInterfaceLanguage = (event) => {
    const { i18n } = this.props;
    const target = event.currentTarget;

    // i18nextの言語切替
    const lang = target.getAttribute('name');
    i18n.changeLanguage(lang);
    // localStorageに保持
    localStorage.setItem('lang', lang);
    // stateを更新
    this.setState({ lang });

    // メニューを閉じる
    this.handleCloseMenu();
  };

  /**
   * メニューを開く
   */
  handleOpenMenu = (event) => {
    const target = event.currentTarget;

    this.setState({
      anchor: target,
      menu: target.name,
    });
  };

  /**
   * メニューを閉じる
   */
  handleCloseMenu = () => {
    this.setState({
      anchor: null,
      menu: '',
    });
  };

  /**
   * キーボードの言語選択メニュー
   */
  renderKeyboardLanguageMenu() {
    const { t, classes, language } = this.props;
    const { anchor, menu } = this.state;

    return (
      <div className={classes.nav}>
        <Button
          name="keyboard"
          onClick={this.handleOpenMenu}
          color="inherit"
        >
          {t(`languages.${language}`)}
        </Button>
        {/* メニュー */}
        <Menu
          id="menu-keyboard"
          anchorEl={anchor}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={menu === 'keyboard'}
          onClose={this.handleCloseMenu}
        >
          {
            Object.keys(languages).map(lang => (
              <MenuItem
                key={`keyboard-${lang}`}
                className={classes.menuItem}
                component={Link}
                to={`/${lang}`}
                onClick={this.handleCloseMenu}
              >
                {t(`languages.${lang}`)}
              </MenuItem>
            ))
          }
        </Menu>
      </div>
    );
  }

  /**
   * インターフェイスの言語選択メニュー
   */
  renderInterfaceLanguageMenu() {
    const { t, classes } = this.props;
    const { anchor, menu, lang } = this.state;

    return (
      <div>
        <Button
          name="interface"
          onClick={this.handleOpenMenu}
          color="inherit"
        >
          {`${t('interface.placeholder')}: ${t(`interface.${lang}`)}`}
        </Button>
        {/* メニュー */}
        <Menu
          id="menu-interface"
          anchorEl={anchor}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={menu === 'interface'}
          onClose={this.handleCloseMenu}
        >
          {
            interfaceLanguages.map(lang => (
              <MenuItem
                key={`interface-${lang}`}
                className={classes.menuItem}
                name={lang}
                onClick={this.handleChangeInterfaceLanguage}
              >
                {t(`interface.${lang}`)}
              </MenuItem>
            ))
          }
        </Menu>
      </div>
    );
  }

  render() {
    const { t, classes } = this.props;

    return (
      <AppBar
        position="absolute"
        color="primary"
      >
        <Toolbar>
          <Typography
            variant="title"
            color="inherit"
            className={classes.title}
            component={Link}
            to="/"
          >
            {t('app_name')}
          </Typography>
          {/* キーボード言語選択 */}
          {this.renderKeyboardLanguageMenu()}
          {/* インターフェイス言語選択 */}
          {this.renderInterfaceLanguageMenu()}
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  // react-i18next
  t: PropTypes.func.isRequired,
  i18n: PropTypes.shape().isRequired,
  // material-ui
  classes: PropTypes.shape().isRequired,
  // component props
  language: PropTypes.string.isRequired,
};

export default translate()(withStyles(styles)(Header));

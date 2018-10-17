import React, { Component } from 'react';
import PropTypes from 'proptypes';
import { withRouter } from 'react-router-dom';

import { languages } from '../commons';

class AppContainer extends Component {
  componentWillMount() {
    const { match: { params: { lang } }, history } = this.props;

    // 未定義の言語がURLに指定されていれば NoContent を表示
    if (typeof languages[lang] === 'undefined') {
      // Not Found
      history.push('/nocontent');
    }
  }

  render() {
    const { match: { params: { lang } } } = this.props;
    return (
      <div>
        <h1>{lang}</h1>
      </div>
    );
  }
}

AppContainer.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

export default withRouter(AppContainer);

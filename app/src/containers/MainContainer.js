import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import CustomTextArea from '../components/CustomTextArea';
import FunctionButton from '../components/FunctionButton';
import WordList from '../components/WordList';
import * as actions from '../actions';

class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleWordSelect = this.handleWordSelect.bind(this);
  }

  handleChange(word) {
    const { actions } = this.props;
    actions.onChangeWord(word);
  }

  handleSearch() {
    const { translate: { word }, actions } = this.props;
    actions.onTranslateClick(word);
    // if (/^[ぁ-ん]+$/.test(word)) {
    //   actions.onTranslateClick(word);
    // }
  }

  handleWordSelect(word) {
    const { actions } = this.props;
    actions.onWordClick(word);
  }

  render() {
    const { translate } = this.props;
    return (
      <div>
        <h1>main container</h1>
        <CustomTextArea
          word={translate.word}
          onChange={this.handleChange}
        />
        <FunctionButton
          label="検索"
          onPress={this.handleSearch}
        />
        <WordList
          list={translate.list}
          onSelect={this.handleWordSelect}
        />
      </div>
    );
  }
}

MainContainer.propTypes = {
  translate: PropTypes.shape().isRequired,
  actions: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  translate: state.translate,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

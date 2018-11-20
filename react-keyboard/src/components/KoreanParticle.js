import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Switch, FormControlLabel, Button } from '@material-ui/core';

// localStorageのキー
const KEY_KOREAN_PARTICLE = 'korean_particle';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  bar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyConetnt: 'center',
    alignItems: 'center',
  },
  spacer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyConetnt: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyConetnt: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  group: {
    padding: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'row',
    justifyConetnt: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
  },
  key: {
    fontSize: 20,
    fontWeight: 'bold',
    minWidth: 40,
    padding: theme.spacing.unit / 2,
    margin: theme.spacing.unit / 2,
    textTransform: 'none',
  },
});

class KoreanParticle extends Component {
  state = {
    data: [],
    displayKeys: true,
  };

  componentWillMount() {
    // 主要助詞データをfetchしてstateに保持
    fetch('./keycode/korean_particle.json')
      .then(res => res.json())
      .then(data => this.setState({ data }));

    const value = localStorage.getItem(KEY_KOREAN_PARTICLE);
    if (value) {
      this.setState({ displayKeys: value === '1' });
    }
  }

  handleClick = value => () => {
    const { onClick } = this.props;
    onClick(value);
  };

  handleSwitch = () => {
    const { displayKeys } = this.state;
    this.setState({ displayKeys: !displayKeys });

    localStorage.setItem(KEY_KOREAN_PARTICLE, (!displayKeys) ? '1' : '0');
  };

  renderItem({ type, value, color = '#cccccc' }) {
    const { classes } = this.props;

    if (type === 'button') {
      return (
        <Button
          key={`button_${value}`}
          className={classes.key}
          variant="outlined"
          style={{
            backgroundColor: color,
          }}
          onClick={this.handleClick(value)}
          value={value}
        >
          {value}
        </Button>
      );
    } else if (type === 'label') {
      return (
        <span
          key={`label_${value}`}
          className={classes.label}
        >
          {value}
        </span>
      );
    }
  }

  render() {
    const { classes } = this.props;
    const { data, displayKeys } = this.state;
    return (
      <div className={classes.container}>
        <div className={classes.bar}>
          <div className={classes.spacer} />
          {displayKeys && (<div>主要助詞</div>)}
          <div className={classes.spacer}>
            <div className={classes.spacer} />
            <FormControlLabel
              control={(
                <Switch
                  color="primary"
                  checked={displayKeys}
                  onChange={this.handleSwitch}
                />
              )}
              label="主要助詞表示"
              labelPlacement="bottom"
            />
          </div>
        </div>
        {displayKeys && (data.length > 0) && (
          <div className={classes.content}>
            {data.map(keys => (
              <div
                key={`group_${JSON.stringify(keys)}`}
                className={classes.group}
              >
                {keys.map(key => this.renderItem(key))}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

KoreanParticle.propTypes = {
  classes: PropTypes.shape().isRequired,
  onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(KoreanParticle);

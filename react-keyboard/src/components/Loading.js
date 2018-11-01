import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { withNamespaces } from 'react-i18next';
import { CircularProgress, Typography } from '@material-ui/core';

const styles = theme => ({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    marginRight: theme.spacing.unit * 2,
  },
});

const Loading = ({ t, classes }) => (
  <div className={classes.container}>
    <CircularProgress
      className={classes.indicator}
      size={50}
      thickness={5}
    />
    <Typography
      variant="h3"
      color="textSecondary"
      noWrap
    >
      {t('dictionary.loading')}
    </Typography>
  </div>
);

Loading.propTypes = {
  // react-i18next
  t: PropTypes.func.isRequired,
  // material-ui
  classes: PropTypes.shape().isRequired,
};

export default withNamespaces()(withStyles(styles)(Loading));

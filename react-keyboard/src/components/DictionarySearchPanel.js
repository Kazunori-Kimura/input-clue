import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import withStyles from '@material-ui/core/styles/withStyles';
import {
  Toolbar, Typography, Tooltip, IconButton,
  Table, TableBody, TableHead, TableRow, TableCell,
  Paper,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import Row from './Row';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {

  },
  spacer: {
    flex: 1,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

class DictionarySearchPanel extends Component {
  handleClick = (word) => {
    const { onClick } = this.props;
    onClick(word);
  };

  handleClose = () => {
    const { onClose } = this.props;
    onClose();
  }

  render() {
    const { classes, t, list } = this.props;
    return (
      <Paper className={classes.container}>
        {/* ツールバー */}
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
          >
            {t('dictionary.result')}
            :
            {list.length}
          </Typography>
          <div className={classes.spacer} />
          <div className={classes.actions}>
            <Tooltip
              title="close"
            >
              <IconButton
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
        {/* 一覧 */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                {t('dictionary.header.kana')}
              </TableCell>
              <TableCell>
                {t('dictionary.header.word')}
              </TableCell>
              <TableCell>
                {t('dictionary.header.mean')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map(item => (
              <Row
                key={`${item.kana}`}
                value={item}
                onClick={this.handleClick}
              />
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

DictionarySearchPanel.propTypes = {
  // material-ui
  classes: PropTypes.shape().isRequired,
  // i18next
  t: PropTypes.func.isRequired,
  // component properties
  list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withNamespaces()(withStyles(styles)(DictionarySearchPanel));

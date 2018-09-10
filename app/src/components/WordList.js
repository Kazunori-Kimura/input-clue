import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import WordListItem from './WordListItem';

const styles = theme => ({
  container: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

const WordList = (props) => {
  const { list, onSelect, classes } = props;

  return (
    <div className={classes.container}>
      <ExpansionPanel expanded={list.length > 0}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            {`検索結果: ${list.length} 件`}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>かな</TableCell>
                <TableCell>単語</TableCell>
                <TableCell>意味</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map(item => (
                <WordListItem
                  key={`key_${item.kana}`}
                  word={item}
                  onClick={onSelect}
                />
                )
              )}
            </TableBody>
          </Table>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

WordList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onSelect: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(WordList);

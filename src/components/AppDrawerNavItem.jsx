import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';

const useStyles = makeStyles(
  (theme) => createStyles({
    label: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(2),
    },
  }),
);

const AppDrawerNavItem = ({ children, label }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClick = useCallback(() => {
    setOpen((prevValue) => !prevValue);
  }, []);

  return (
    <>
      <ListItem button className={classes.label} disableGutters onClick={handleClick}>
        <ListItemText primary={label} />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </>
  );
};

AppDrawerNavItem.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
};

export default AppDrawerNavItem;

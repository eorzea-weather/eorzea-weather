import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

export const styles = ({ spacing }) => ({
  label: {
    paddingLeft: spacing(3),
    paddingRight: spacing(2),
  },
});

export default @withStyles(styles)
class AppDrawerNavItem extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.objectOf(PropTypes.any).isRequired,
    label: PropTypes.string.isRequired,
  };

  state = {
    open: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { open } = this.state;

    return open !== nextState.open;
  }

  handleClick = () => {
    this.setState(prevState => ({
      open: !prevState.open,
    }));
  }

  render() {
    const { children, classes, label } = this.props;
    const { open } = this.state;

    return (
      <Fragment>
        <ListItem button className={classes.label} disableGutters onClick={this.handleClick}>
          <ListItemText primary={label} />
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children}
          </List>
        </Collapse>
      </Fragment>
    );
  }
}

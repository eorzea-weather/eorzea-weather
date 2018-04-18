import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import Collapse from 'material-ui/transitions/Collapse';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

export const styles = ({ spacing }) => ({
  label: {
    paddingLeft: spacing.unit * 3,
    paddingRight: spacing.unit * 2,
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
    return this.state.open !== nextState.open;
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

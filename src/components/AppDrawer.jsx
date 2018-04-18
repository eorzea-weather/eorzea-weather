import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import isEqual from 'lodash/isEqual';
import kebabCase from 'lodash/kebabCase';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router-dom';
import * as pkg from '../../package.json';
import createGroupedZones from '../utils/createGroupedZones';
import zoneShape from '../types/zoneShape';
import AppDrawerNavItem from './AppDrawerNavItem';

const messages = defineMessages({
  sourceCode: {
    defaultMessage: 'Source code',
    id: 'header.source_code',
  },
});

const normalizeRepositoryUrl = (repository) => {
  if (repository.url) {
    return repository.url.replace(/\.git$/, '');
  }
  if (typeof repository !== 'string') {
    return null;
  }
  return `https://github.com/${repository}`;
};

export const styles = ({ mixins, spacing }) => ({
  childListItem: {
    paddingLeft: spacing.unit * 4,
  },
  drawerHeader: {
    ...mixins.toolbar,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0 8px',
  },
  drawerPaper: {
    minWidth: '240px',
  },
});

export default @injectIntl
@withStyles(styles)
class AppDrawer extends Component {
  static defaultProps = {
    zones: {},
  };

  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.any).isRequired,
    intl: intlShape.isRequired,
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    zones: PropTypes.objectOf(zoneShape),
  };

  shouldComponentUpdate(nextProps) {
    return (
      this.props.open !== nextProps.open ||
      !isEqual(this.props.zones, nextProps.zones)
    );
  }

  handleClose = (...args) => {
    this.props.onClose(...args);
  }

  render() {
    const {
      classes,
      intl,
      open,
      zones,
    } = this.props;
    const repositoryUrl = normalizeRepositoryUrl(pkg.repository);

    return (
      <Drawer anchor="left" classes={{ paper: classes.drawerPaper }} onClose={this.handleClose} open={open}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {Object.entries(createGroupedZones({ intl })).map(([label, groupedZones]) => (
            <AppDrawerNavItem key={`drawer-item-${label}`} label={label}>
              {groupedZones.filter(zoneId => zones[zoneId]).map(zoneId => (
                <ListItem button component={props => <Link onClick={this.handleClose} to={`/zones/${kebabCase(zoneId)}`} {...props} />} key={`item-${zoneId}`} className={classes.childListItem}>
                  <ListItemText primary={zones[zoneId].name} />
                </ListItem>
              ))}
            </AppDrawerNavItem>
          ))}
        </List>
        <Divider />
        <List onKeyDown={this.handleClose}>
          {repositoryUrl && (
            <Fragment>
              {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
              <ListItem button component={props => <a href={repositoryUrl} rel="noopener" target="_blank" {...props} />} onClick={this.handleClose}>
                <ListItemText primary={intl.formatMessage(messages.sourceCode)} />
              </ListItem>
            </Fragment>
          )}
        </List>
      </Drawer>
    );
  }
}

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import isEqual from 'lodash/isEqual';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import React, { Component, forwardRef } from 'react';
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
    paddingLeft: spacing(4),
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

const AdapterLink = forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

export default @injectIntl
@withStyles(styles)
class AppDrawer extends Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.any).isRequired,
    intl: intlShape.isRequired,
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    zones: PropTypes.objectOf(zoneShape),
  };

  static defaultProps = {
    zones: {},
  };

  shouldComponentUpdate(nextProps) {
    const { open, zones } = this.props;

    return open !== nextProps.open || !isEqual(zones, nextProps.zones);
  }

  handleClose = (...args) => {
    const { onClose } = this.props;

    onClose(...args);
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
                <ListItem
                  button
                  className={classes.childListItem}
                  key={`item-${zoneId}`}
                  component={AdapterLink}
                  onClick={this.handleClose}
                  to={`/zones/${kebabCase(zoneId)}`}
                >
                  <ListItemText primary={zones[zoneId].name} />
                </ListItem>
              ))}
            </AppDrawerNavItem>
          ))}
        </List>
        <Divider />
        <List onKeyDown={this.handleClose}>
          {repositoryUrl && (
            <>
              {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
              <ListItem
                button
                component="a"
                href={repositoryUrl}
                onClick={this.handleClose}
                rel="noopener noreferrer"
                target="_blank"
              >
                <ListItemText primary={intl.formatMessage(messages.sourceCode)} />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    );
  }
}

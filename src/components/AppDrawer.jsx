import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import kebabCase from 'lodash/kebabCase';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import * as pkg from '../../package.json';
import createGroupedZones from '../utils/createGroupedZones';
import getZoneList from '../utils/getZoneList';
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

const useStyles = makeStyles((theme) =>
  createStyles({
    childListItem: {
      paddingLeft: theme.spacing(4),
    },
    drawerHeader: {
      ...theme.mixins.toolbar,
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '0 8px',
    },
    drawerPaper: {
      minWidth: '240px',
    },
  }),
);

const AppDrawer = ({ onClose, open }) => {
  const intl = useIntl();
  const classes = useStyles();

  const handleClose = useCallback(
    (...args) => {
      onClose(...args);
    },
    [onClose],
  );

  const zones = getZoneList({
    locale: intl.locale,
  });
  const repositoryUrl = normalizeRepositoryUrl(pkg.repository);

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawerPaper }}
      onClose={handleClose}
      open={open}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {Object.entries(createGroupedZones({ intl })).map(
          ([label, groupedZones]) => (
            <AppDrawerNavItem key={`drawer-item-${label}`} label={label}>
              {groupedZones
                .filter((zoneId) => zones[zoneId])
                .map((zoneId) => (
                  <Link
                    as={`/${intl.locale}/zones/${kebabCase(zoneId)}`}
                    href="/[locale]/zones/[id]"
                    key={`item-${zoneId}`}
                    passHref
                  >
                    <ListItem
                      button
                      className={classes.childListItem}
                      component="a"
                      onClick={handleClose}
                    >
                      <ListItemText primary={zones[zoneId].name} />
                    </ListItem>
                  </Link>
                ))}
            </AppDrawerNavItem>
          ),
        )}
      </List>
      <Divider />
      <List onKeyDown={handleClose}>
        {repositoryUrl && (
          <>
            {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
            <ListItem
              button
              component="a"
              href={repositoryUrl}
              onClick={handleClose}
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
};

AppDrawer.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default AppDrawer;

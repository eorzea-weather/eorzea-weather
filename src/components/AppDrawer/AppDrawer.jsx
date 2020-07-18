import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { useLocale, useMessageFormatter } from '@react-aria/i18n';
import kebabCase from 'lodash/kebabCase';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import * as pkg from '../../../package.json';
import { useZoneList } from '../../context/zone';
import AppDrawerNavItem from './AppDrawerNavItem';
import messages from './intl';

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
  const { locale } = useLocale();
  const messageFormatter = useMessageFormatter(messages);
  const zoneList = useZoneList();
  const classes = useStyles();

  const handleClose = useCallback((...args) => onClose(...args), [onClose]);

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
        {Object.entries(zoneList).map(([label, zones]) => (
          <AppDrawerNavItem key={`drawer-item-${label}`} label={label}>
            {zones.map((zone) => (
              <Link
                as={`/${locale}/zones/${kebabCase(zone.id)}`}
                href="/[locale]/zones/[id]"
                key={`item-${zone.id}`}
                passHref
                prefetch={false}
              >
                <ListItem
                  button
                  className={classes.childListItem}
                  component="a"
                  onClick={handleClose}
                >
                  <ListItemText primary={zone.name} />
                </ListItem>
              </Link>
            ))}
          </AppDrawerNavItem>
        ))}
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
              <ListItemText primary={messageFormatter('source_code')} />
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

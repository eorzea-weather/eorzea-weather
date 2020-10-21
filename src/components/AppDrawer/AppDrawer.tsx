import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { useMessageFormatter } from '@react-aria/i18n';
import kebabCase from 'lodash/kebabCase';
import Link from 'next/link';
import React, { useCallback } from 'react';
import type { FC } from 'react';
import * as pkg from '@/../package.json';
import { useZoneList } from '@/context/zone';
import AppDrawerNavItem from './AppDrawerNavItem';
import messages from './intl';

const normalizeRepositoryUrl = (repository: { url: string }): string =>
  repository.url.replace(/\.git$/, '');

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

type Props = {
  onClose: () => void;
  open: boolean;
};

const AppDrawer: FC<Props> = ({ onClose, open }) => {
  const messageFormatter = useMessageFormatter(messages);
  const zoneList = useZoneList();
  const classes = useStyles();

  const handleClose = useCallback(() => onClose(), [onClose]);

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
                href={`/zones/${kebabCase(zone.id)}`}
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
        <ListItem
          button
          component="a"
          href={normalizeRepositoryUrl(pkg.repository)}
          onClick={handleClose}
          rel="noopener noreferrer"
          target="_blank"
        >
          <ListItemText primary={messageFormatter('source_code')} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default AppDrawer;

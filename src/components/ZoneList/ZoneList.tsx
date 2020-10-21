import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import kebabCase from 'lodash/kebabCase';
import Link from 'next/link';
import React from 'react';
import type { FC } from 'react';
import { useZoneList } from '@/context/zone';

const ZoneList: FC = () => {
  const zoneList = useZoneList();

  return (
    <Grid container justify="flex-start">
      {Object.entries(zoneList).map(([label, zones]) => (
        <Grid item key={`grid-${label}`} md={3} sm={4} xs={12}>
          <List
            component="nav"
            subheader={
              <ListSubheader component="h2" disableSticky>
                {label}
              </ListSubheader>
            }
          >
            {zones.map((zone) => (
              <Link
                href={`/zones/${kebabCase(zone.id)}`}
                key={`item-${zone.id}`}
                passHref
              >
                <ListItem button component="a">
                  <ListItemText primary={zone.name} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Grid>
      ))}
    </Grid>
  );
};

export default ZoneList;

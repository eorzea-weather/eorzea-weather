import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import kebabCase from 'lodash/kebabCase';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import createGroupedZones from '../utils/createGroupedZones';
import zoneShape from '../types/zoneShape';

const ZoneList = ({ zones }) => {
  const intl = useIntl();

  return (
    <Grid container justify="flex-start">
      {Object.entries(createGroupedZones({ intl })).map(([label, groupedZones]) => (
        <Grid item key={`grid-${label}`} md={3} sm={4} xs={12}>
          <List
            component="nav"
            subheader={(
              <ListSubheader component="h2" disableSticky>
                {label}
              </ListSubheader>
            )}
          >
            {groupedZones.map((zoneId) => zones[zoneId] && (
              <Link
                as={`/${intl.locale}/zones/${kebabCase(zoneId)}`}
                href="/[locale]/zones/[id]"
                key={`item-${zoneId}`}
                passHref
              >
                <ListItem button component="a">
                  <ListItemText primary={zones[zoneId].name} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Grid>
      ))}
    </Grid>
  );
};

ZoneList.propTypes = {
  zones: PropTypes.objectOf(zoneShape).isRequired,
};

export default ZoneList;

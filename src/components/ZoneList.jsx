import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import isEqual from 'lodash/isEqual';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import React, { Component, forwardRef } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router-dom';
import createGroupedZones from '../utils/createGroupedZones';
import zoneShape from '../types/zoneShape';

const AdapterLink = forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

export default @injectIntl
class ZoneList extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    zones: PropTypes.objectOf(zoneShape).isRequired,
  }

  shouldComponentUpdate(nextProps) {
    const { zones } = this.props;

    return !isEqual(zones, nextProps.zones);
  }

  render() {
    const { intl, zones } = this.props;

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
              {groupedZones.map(zoneId => zones[zoneId] && (
                <ListItem
                  button
                  component={AdapterLink}
                  key={`item-${zoneId}`}
                  to={`/zones/${kebabCase(zoneId)}`}
                >
                  <ListItemText primary={zones[zoneId].name} />
                </ListItem>
              ))}
            </List>
          </Grid>
        ))}
      </Grid>
    );
  }
}

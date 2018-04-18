import isEqual from 'lodash/isEqual';
import kebabCase from 'lodash/kebabCase';
import Grid from 'material-ui/Grid';
import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router-dom';
import createGroupedZones from '../utils/createGroupedZones';
import zoneShape from '../types/zoneShape';

export default @injectIntl
class ZoneList extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    zones: PropTypes.objectOf(zoneShape).isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.zones, nextProps.zones);
  }

  render() {
    const { intl, zones } = this.props;

    return (
      <Grid container justify="flex-start" spacing={24}>
        {Object.entries(createGroupedZones({ intl })).map(([label, groupedZones]) => (
          <Grid item key={`grid-${label}`} md={3} sm={4} xs={12}>
            <List component="nav" subheader={<ListSubheader component="h2" disableSticky>{label}</ListSubheader>}>
              {groupedZones.map(zoneId => zones[zoneId] && (
                <ListItem button component={props => <Link to={`/zones/${kebabCase(zoneId)}`} {...props} />} key={`item-${zoneId}`}>
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

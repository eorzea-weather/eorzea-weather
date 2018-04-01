import isEqual from 'lodash/isEqual';
import kebabCase from 'lodash/kebabCase';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router-dom';
import { getAllZones } from '../actions/zones';
import zoneShape from '../types/zoneShape';

@injectIntl
export default class Home extends Component {
  static defaultProps = {
    zones: [],
  };

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    zones: PropTypes.objectOf(zoneShape),
  };

  componentWillMount() {
    const { locale } = this.props.intl;
    this.props.dispatch(getAllZones({ locale }));
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.zones, nextProps.zones);
  }

  render() {
    const { zones } = this.props;

    return (
      <Fragment>
        <Typography variant="headline">
          <FormattedMessage defaultMessage="Home" id="home.title" />
        </Typography>
        <List>
          {Object.values(zones).map(zone => (
            <Fragment key={`item-${zone.id}`}>
              <ListItem button component={Link} to={`/zones/${kebabCase(zone.id)}`}>
                <ListItemText primary={zone.name} />
              </ListItem>
              <Divider light />
            </Fragment>
          ))}
        </List>
      </Fragment>
    );
  }
}

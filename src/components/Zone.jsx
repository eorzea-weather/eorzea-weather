import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import isEqual from 'lodash/isEqual';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import WeatherTable from '../containers/WeatherTable';
import tracker from '../utils/tracker';
import zoneShape from '../types/zoneShape';

const messages = defineMessages({
  title: {
    defaultMessage: '{name} weather',
    id: 'zone.title',
  },
});

export const styles = ({ spacing }) => ({
  headline: {
    margin: `${spacing(1)}px ${spacing(0.75)}px ${spacing(3)}px`,
  },
  root: {
    margin: '16px auto',
    maxWidth: '100%',
    paddingTop: 80,
    width: 1240,
  },
});

export default @injectIntl
@withStyles(styles)
class Zone extends Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.any).isRequired,
    intl: intlShape.isRequired,
    zone: zoneShape,
  };

  static defaultProps = {
    zone: null,
  };

  componentDidMount() {
    this.track(this.props);
  }

  shouldComponentUpdate(nextProps) {
    const { zone } = this.props;

    return !isEqual(zone, nextProps.zone);
  }

  componentDidUpdate(prevProps) {
    const { zone } = this.props;

    if (prevProps.zone.id !== zone.id) {
      this.track(this.props);
    }
  }

  track({ zone }) {
    if (zone.id && zone.name) {
      const { intl } = this.props;
      const path = `/zones/${kebabCase(zone.id)}`;
      const title = intl.formatMessage(messages.title, { name: zone.name });
      tracker.track({ path, title });
    }
  }

  render() {
    const { classes, intl, zone } = this.props;
    const title = intl.formatMessage(messages.title, { name: zone.name });

    return (
      <main className={classes.root}>
        <Helmet>
          <title>
            {title}
          </title>
        </Helmet>
        <Typography className={classes.headline} variant="subtitle1">
          {title}
        </Typography>
        <WeatherTable zoneId={zone.id} />
      </main>
    );
  }
}

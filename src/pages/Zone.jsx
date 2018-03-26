import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import camelCase from 'lodash/camelCase';
import range from 'lodash/range';
import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import WeatherTable from '../components/WeatherTable';
import EorzeaWeather from '../eorzea-weather';
import zones from '../zones.json';

const messages = defineMessages({
  title: {
    defaultMessage: '{name} weather',
    id: 'zone.title',
  },
});

const getStartTime = (date) => {
  const unixtime = Math.floor(date.getTime() / 1000);
  const bell = (unixtime / 175) % 24;
  const startBell = bell - (bell % 24);
  const startUnixtime = unixtime - (175 * (bell - startBell));
  return new Date(startUnixtime * 1000);
};

export const styles = {
  headline: {
    marginBottom: '25px',
  },
};

@injectIntl
@withStyles(styles)
export default class Zone extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    intl: intlShape.isRequired,
    match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  state = {
    weatherTable: this.calculateWeatherTable(),
  };

  getCurrentZoneName() {
    const { locale } = this.props.intl;
    const zoneId = this.getCurrentZoneId();
    const zone = zones[zoneId];
    return zone[locale] || zone.en;
  }

  getCurrentZoneId() {
    const { params } = this.props.match;
    return camelCase(params.id);
  }

  getWeather(msec) {
    const { locale } = this.props.intl;
    const zoneId = this.getCurrentZoneId();
    return EorzeaWeather.getWeather(msec, { zoneId, locale });
  }

  calculateWeatherTable(baseTime = new Date()) {
    const startTime = getStartTime(baseTime).getTime();
    const step = 8 * 175 * 1000; // 8 hours
    return range(startTime, startTime + (step * 30), step).map(time => ({
      startedAt: new Date(time),
      weather: this.getWeather(time),
    }));
  }

  render() {
    const { classes, intl } = this.props;
    const { weatherTable } = this.state;
    const title = intl.formatMessage(messages.title, { name: this.getCurrentZoneName() });

    return (
      <Fragment>
        <Helmet>
          <title>{title} - Eorzea Weather</title>
        </Helmet>
        <Typography className={classes.headline} variant="headline">{title}</Typography>
        <WeatherTable table={weatherTable} />
      </Fragment>
    );
  }
}

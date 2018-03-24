import classNames from 'classnames';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Typography from 'material-ui/Typography';
import camelCase from 'lodash/camelCase';
import chunk from 'lodash/chunk';
import range from 'lodash/range';
import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { FormattedMessage, FormattedTime, injectIntl, intlShape } from 'react-intl';
import EorzeaWeather from '../eorzea-weather';
import zones from '../zones.json';

const getStartTime = (date) => {
  const unixtime = Math.floor(date.getTime() / 1000);
  const bell = (unixtime / 175) % 24;
  const startBell = bell - (bell % 24);
  const startUnixtime = unixtime - (175 * (bell - startBell));
  return new Date(startUnixtime * 1000);
};

export const styles = {
  activeTableCell: {
    backgroundColor: 'rgba(0, 0, 0, .05)',
  },
  weatherTable: {
    margin: '25px 5px 30px',
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
    const { classes } = this.props;
    const { weatherTable } = this.state;
    const now = Date.now();

    return (
      <Fragment>
        <Typography variant="headline">
          <FormattedMessage defaultMessage="{name} weather" id="zone.title" values={{ name: this.getCurrentZoneName() }} />
        </Typography>
        <Paper className={classes.weatherTable}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>00:00 - 07:59</TableCell>
                <TableCell>08:00 - 15:59</TableCell>
                <TableCell>16:00 - 23:59</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {chunk(weatherTable, 3).map(weatherTableForDay => (
                <TableRow key={`row-${weatherTableForDay[0].startedAt.getTime()}`}>
                  {weatherTableForDay.map(({ startedAt, weather }) => {
                    const time = startedAt.getTime();
                    const className = classNames({
                      [classes.activeTableCell]: time <= now && now < time + (8 * 175 * 1000),
                    });
                    return (
                      <TableCell className={className} key={`cell-${time}`}>{weather} (<FormattedTime value={new Date(time)} />)</TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Fragment>
    );
  }
}

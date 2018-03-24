import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Typography from 'material-ui/Typography';
import camelCase from 'lodash/camelCase';
import range from 'lodash/range';
import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { FormattedMessage, FormattedTime, intlShape } from 'react-intl';
import EorzeaWeather from '../eorzea-weather';
import zones from '../zones.json';

const getStartTime = (date) => {
  const unixtime = Math.floor(date.getTime() / 1000);
  const bell = (unixtime / 175) % 24;
  const startBell = bell - (bell % 24);
  const startUnixtime = unixtime - (175 * (bell - startBell));
  return new Date(startUnixtime * 1000);
};

export default class Zone extends PureComponent {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    match: PropTypes.object.isRequired,
  };

  getCurrentZoneName() {
    const { intl } = this.context;
    const zoneId = this.getCurrentZoneId();
    const zone = zones[zoneId];
    return zone[intl.locale] || zone.en;
  }

  getCurrentZoneId() {
    const { params } = this.props.match;
    return camelCase(params.id);
  }

  getWeather(msec) {
    const { locale } = this.context.intl;
    const zoneId = this.getCurrentZoneId();
    return EorzeaWeather.getWeather(msec, { zoneId, locale });
  }

  render() {
    const zoneName = this.getCurrentZoneName();
    const startTime = getStartTime(new Date()).getTime();
    const step = 8 * 175 * 1000; // 8 hours

    return (
      <Fragment>
        <Typography variant="headline">
          <FormattedMessage defaultMessage="{name} weather" id="zone.title" values={{ name: zoneName }} />
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>00:00 - 07:59</TableCell>
                  <TableCell>08:00 - 15:59</TableCell>
                  <TableCell>16:00 - 23:59</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {range(startTime, startTime + (step * 30), step * 3).map(dayStartTime => (
                  <TableRow key={`row-${dayStartTime}`}>
                    {range(dayStartTime, dayStartTime + (step * 3), step).map((time) => {
                      const weather = this.getWeather(time);
                      return (
                        <TableCell key={`cell-${time}`}>{weather} (<FormattedTime value={new Date(time)} />)</TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Typography>
      </Fragment>
    );
  }
}

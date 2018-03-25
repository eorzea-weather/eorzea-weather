import classNames from 'classnames';
import { FormControlLabel, FormGroup, FormLabel } from 'material-ui/Form';
import Paper from 'material-ui/Paper';
import { LinearProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import Switch from 'material-ui/Switch';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import chunk from 'lodash/chunk';
import uniq from 'lodash/uniq';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { FormattedMessage, FormattedTime } from 'react-intl';

const EIGHT_HOURS = 8 * 175 * 1000;

export const styles = ({ palette }) => ({
  cell: {
    position: 'relative',
  },
  highlight: {
    backgroundColor: palette.primary.light,
    color: palette.primary.contrastText,
  },
  progress: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  table: {
    margin: '0 5px 30px',
  },
});

@withStyles(styles)
export default class WeatherTable extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    table: PropTypes.arrayOf(PropTypes.shape({
      startedAt: PropTypes.objectOf(Date).isRequired,
      weather: PropTypes.string.isRequired,
    })).isRequired,
  };

  state = {
    highlightedWeathers: {},
  };

  componentDidMount() {
    this.requestId = requestAnimationFrame(this.loop);
  }

  componentWillUnmount() {
    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
    }
  }

  handleFilterChange = ({ target }) => {
    const { value: weather } = target;
    this.setState(({ highlightedWeathers }) => ({
      highlightedWeathers: {
        ...highlightedWeathers,
        [weather]: !highlightedWeathers[weather],
      },
    }));
  }

  loop = () => {
    this.forceUpdate();
    this.requestId = requestAnimationFrame(this.loop);
  }

  render() {
    const { classes, table: weatherTable } = this.props;
    const { highlightedWeathers } = this.state;
    const now = Date.now();

    return (
      <Fragment>
        <Paper className={classes.table}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ET 00:00 - 07:59</TableCell>
                <TableCell>ET 08:00 - 15:59</TableCell>
                <TableCell>ET 16:00 - 23:59</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {chunk(weatherTable, 3).map(weatherTableForDay => (
                <TableRow key={`row-${weatherTableForDay[0].startedAt.getTime()}`}>
                  {weatherTableForDay.map(({ startedAt, weather }) => {
                    const time = startedAt.getTime();
                    const className = classNames(classes.cell, {
                      [classes.highlight]: highlightedWeathers[weather],
                    });
                    return (
                      <TableCell className={className} key={`cell-${time}`}>
                        {weather} (<FormattedTime value={startedAt} />)
                        {time <= now && now < time + EIGHT_HOURS && (
                          <LinearProgress className={classes.progress} value={((now - time) / EIGHT_HOURS) * 100} variant="determinate" />
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <FormLabel>
          <FormattedMessage defaultMessage="Highlight" id="zone.highlight" />
        </FormLabel>
        <FormGroup row>
          {uniq(weatherTable.map(({ weather }) => weather)).map(weather => (
            <FormControlLabel control={<Switch color="primary" onChange={this.handleFilterChange} value={weather} />} key={weather} label={weather} />
          ))}
        </FormGroup>
      </Fragment>
    );
  }
}

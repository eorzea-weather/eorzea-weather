import { FormControlLabel, FormGroup, FormLabel } from 'material-ui/Form';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Switch from 'material-ui/Switch';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import chunk from 'lodash/chunk';
import isEqual from 'lodash/isEqual';
import uniq from 'lodash/uniq';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import WeatherTableCell from './WeatherTableCell';

export const styles = {
  table: {
    margin: '0 5px 30px',
    tableLayout: 'fixed',
  },
};

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

  shouldComponentUpdate(nextProps) {
    return isEqual(this.props.table, nextProps.table);
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

  render() {
    const { classes, table: weatherTable } = this.props;
    const { highlightedWeathers } = this.state;

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
                  {weatherTableForDay.map(value => (
                    <WeatherTableCell
                      highlight={highlightedWeathers[value.weather]}
                      key={`cell-${value.startedAt.getTime()}`}
                      value={value}
                    />
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <FormLabel>
          <FormattedMessage defaultMessage="Highlight" id="zone.highlight" />
        </FormLabel>
        <FormGroup row>
          {uniq(weatherTable.map(({ weather }) => weather)).map((weather) => {
            const control = (
              <Switch color="primary" onChange={this.handleFilterChange} value={weather} />
            );
            return (
              <FormControlLabel control={control} key={weather} label={weather} />
            );
          })}
        </FormGroup>
      </Fragment>
    );
  }
}

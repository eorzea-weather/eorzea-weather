import chunk from 'lodash/chunk';
import isEqual from 'lodash/isEqual';
import uniq from 'lodash/uniq';
import { FormControlLabel, FormGroup, FormLabel } from 'material-ui/Form';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Switch from 'material-ui/Switch';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { fetchWeathers } from '../actions/weathers';
import weatherShape from '../types/weatherShape';
import WeatherTableCell from './WeatherTableCell';

export const styles = {
  table: {
    margin: '0 5px 30px',
    tableLayout: 'fixed',
  },
};

@injectIntl
@withStyles(styles)
export default class WeatherTable extends Component {
  static defaultProps = {
    data: [],
  };

  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.any).isRequired,
    data: PropTypes.arrayOf(weatherShape),
    dispatch: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    zoneId: PropTypes.string.isRequired,
  };

  state = {
    highlightedWeathers: {},
  };

  componentDidMount() {
    const { intl, zoneId } = this.props;
    this.props.dispatch(fetchWeathers(zoneId, { locale: intl.locale }));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !isEqual(this.state.highlightedWeathers, nextState.highlightedWeathers) ||
      !isEqual(this.props.data, nextProps.data)
    );
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
    const { classes, data: weatherTable } = this.props;
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
                  {weatherTableForDay.map(weather => (
                    <WeatherTableCell
                      highlight={highlightedWeathers[weather.name]}
                      key={`cell-${weather.startedAt.getTime()}`}
                      value={weather}
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
          {uniq(weatherTable.map(({ name }) => name)).map((name) => {
            const control = (
              <Switch color="primary" onChange={this.handleFilterChange} value={name} />
            );
            return (
              <FormControlLabel control={control} key={name} label={name} />
            );
          })}
        </FormGroup>
      </Fragment>
    );
  }
}

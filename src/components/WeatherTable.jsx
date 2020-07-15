import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Skeleton from '@material-ui/lab/Skeleton';
import camelCase from 'lodash/camelCase';
import chunk from 'lodash/chunk';
import range from 'lodash/range';
import uniq from 'lodash/uniq';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import useSWR from 'swr';
import WeatherTableCell from './WeatherTableCell';

const useStyles = makeStyles((theme) =>
  createStyles({
    formGroup: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    formLabel: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    paper: {
      marginBottom: theme.spacing(4),
      marginTop: 0,
      [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
    },
    table: {
      tableLayout: 'fixed',
    },
    tableCell: {
      '&:last-child': {
        paddingRight: theme.spacing(7),
      },
    },
  }),
);

const WeatherTable = ({ zoneID }) => {
  const [highlightedWeathers, setHighlightedWeathers] = useState({});
  const intl = useIntl();
  const { data: weatherTable } = useSWR(
    `/api/zones/${camelCase(zoneID)}/forecast?locale=${intl.locale}`,
    async (key) => {
      const res = await fetch(key);

      return res.json();
    },
  );
  const classes = useStyles();

  const handleFilterChange = useCallback(({ target }) => {
    const { value: weather } = target;

    setHighlightedWeathers((beforeHighlightWeathers) => ({
      ...beforeHighlightWeathers,
      [weather]: !beforeHighlightWeathers[weather],
    }));
  }, []);

  return (
    <>
      <TableContainer className={classes.paper} component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell}>
                ET 00:00 - 07:59
              </TableCell>
              <TableCell className={classes.tableCell}>
                ET 08:00 - 15:59
              </TableCell>
              <TableCell className={classes.tableCell}>
                ET 16:00 - 23:59
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {weatherTable
              ? chunk(weatherTable, 3).map((weatherTableForDay) => (
                  <TableRow key={`row-${weatherTableForDay[0].startedAt}`}>
                    {weatherTableForDay.map((weather) => (
                      <WeatherTableCell
                        highlight={highlightedWeathers[weather.name]}
                        key={`cell-${weather.startedAt}`}
                        value={weather}
                      />
                    ))}
                  </TableRow>
                ))
              : chunk(range(30), 3).map((values) => (
                  <TableRow key={`row-${values.join(':')}`}>
                    {values.map((value) => (
                      <WeatherTableCell key={`cell-${value}`} />
                    ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <FormLabel className={classes.formLabel}>
        <FormattedMessage defaultMessage="Highlight" id="zone.highlight" />
      </FormLabel>

      {weatherTable ? (
        <FormGroup className={classes.formGroup} row>
          {uniq(weatherTable.map(({ name }) => name)).map((name) => {
            const control = (
              <Switch
                color="primary"
                onChange={handleFilterChange}
                value={name}
              />
            );
            return (
              <FormControlLabel control={control} key={name} label={name} />
            );
          })}
        </FormGroup>
      ) : (
        <FormGroup className={classes.formGroup} row>
          {range(3).map((value) => {
            const control = <Switch color="primary" disabled value={value} />;
            return (
              <FormControlLabel
                control={control}
                key={`label-${value}`}
                label={<Skeleton width="3rem" />}
              />
            );
          })}
        </FormGroup>
      )}
    </>
  );
};

WeatherTable.propTypes = {
  zoneID: PropTypes.string.isRequired,
};

export default WeatherTable;

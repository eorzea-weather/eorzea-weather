import LinearProgress from '@material-ui/core/LinearProgress';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FormattedTime, useIntl } from 'react-intl';
import weatherShape from '../types/weatherShape';

const EIGHT_HOURS = 8 * 175 * 1000;

const useStyles = makeStyles(
  (theme) => createStyles({
    highlight: {
      backgroundColor: theme.palette.grey[100],
    },
    past: {
      color: theme.palette.text.disabled,
    },
    progress: {
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
    },
    root: {
      paddingBottom: '15px',
      paddingTop: '15px',
      position: 'relative',
      '&:last-child': {
        paddingRight: theme.spacing(7),
      },
    },
  }),
);

const WeatherTableCell = ({ highlight, value }) => {
  const [now, setNow] = useState(Date.now());
  const intl = useIntl();
  const classes = useStyles();

  const startedAt = new Date(value.startedAt);
  const time = startedAt.getTime();
  const className = classNames(classes.root, {
    [classes.highlight]: highlight,
    [classes.past]: time + EIGHT_HOURS < now,
  });
  const title = intl.formatDate(startedAt, {
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    month: 'short',
    second: 'numeric',
    year: 'numeric',
  });

  useEffect(() => {
    let requestID;

    const loop = () => {
      setNow(Date.now());

      requestID = requestAnimationFrame(loop);
    };

    requestID = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(requestID);
    };
  }, []);

  return (
    <TableCell className={className} key={`cell-${time}`}>
      <Typography color="inherit">
        {value.name}
        {' '}
        (
        <time dateTime={startedAt.toISOString()} title={title}>
          <FormattedTime value={startedAt} />
        </time>
        )
      </Typography>
      {time <= now && now < time + EIGHT_HOURS && (
        <LinearProgress className={classes.progress} value={((now - time) / EIGHT_HOURS) * 100} variant="determinate" />
      )}
    </TableCell>
  );
};

WeatherTableCell.propTypes = {
  highlight: PropTypes.bool,
  value: weatherShape.isRequired,
};

WeatherTableCell.defaultProps = {
  highlight: false,
};

export default WeatherTableCell;

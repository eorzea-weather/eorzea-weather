import LinearProgress from '@material-ui/core/LinearProgress';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { useDateFormatter } from '@react-aria/i18n';
import clsx from 'clsx';
import React, { FC, useEffect, useState } from 'react';
import Weather from '../../types/Weather';

const EIGHT_HOURS = 8 * 175 * 1000;

const useStyles = makeStyles((theme) =>
  createStyles({
    highlight: {
      backgroundColor: theme.palette.action.selected,
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

type Props = {
  highlight?: boolean;
  value?: Weather;
};

const WeatherTableCell: FC<Props> = ({ highlight = false, value }) => {
  const [now, setNow] = useState(() => Date.now());
  const dateFormatter = useDateFormatter({
    hour: 'numeric',
    minute: 'numeric',
  });
  const fullDateFormatter = useDateFormatter({
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    month: 'short',
    second: 'numeric',
    year: 'numeric',
  });
  const classes = useStyles();

  const startedAt = value ? new Date(value.startedAt) : new Date(0);
  const time = startedAt.getTime();

  useEffect(() => {
    let requestID: number;

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
    <TableCell
      className={clsx(classes.root, {
        [classes.highlight]: highlight,
        [classes.past]: time + EIGHT_HOURS < now,
      })}
    >
      <Typography color="inherit">
        {value ? (
          <>
            {value.name} (
            <time
              dateTime={startedAt.toISOString()}
              title={fullDateFormatter.format(startedAt)}
            >
              {dateFormatter.format(startedAt)}
            </time>
            )
          </>
        ) : (
          <Skeleton width="5rem" />
        )}
      </Typography>
      {time <= now && now < time + EIGHT_HOURS && (
        <LinearProgress
          className={classes.progress}
          value={((now - time) / EIGHT_HOURS) * 100}
          variant="determinate"
        />
      )}
    </TableCell>
  );
};

export default WeatherTableCell;

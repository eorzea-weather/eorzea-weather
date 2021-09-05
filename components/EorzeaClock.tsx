import Typography from '@material-ui/core/Typography';
import EorzeaTime from 'eorzea-time';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useSettings } from '../context/settings';

const EORZEAN_MINUTE_TO_SECONDS: number = 60 / (1440 / 70);

const EorzeaClock: FC = () => {
  const settings = useSettings();

  const [date, setDate] = useState<EorzeaTime>();
  const [isTimerRunning, setTimerRunning] = useState<boolean>();

  const displayDate = (date: EorzeaTime): string => {
    if (settings.state.displaySeconds) {
      return date.toString();
    }

    return [
      `0${date.getHours()}`.slice(-2),
      `0${date.getMinutes()}`.slice(-2),
    ].join(':');
  };

  useEffect(() => {
    let requestID: number;

    if (!settings.state.displaySeconds) {
      if (!date) {
        setDate(new EorzeaTime());
      }

      if (!isTimerRunning) {
        setTimerRunning(true);
        setTimeout(() => {
          setTimerRunning(false);
          setDate(new EorzeaTime());
        }, 1000 * EORZEAN_MINUTE_TO_SECONDS);
      }
    } else {
      const loop = () => {
        setDate(new EorzeaTime());

        requestID = requestAnimationFrame(loop);
      };

      requestID = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(requestID);
    };
  }, [date, setDate, isTimerRunning, setTimerRunning, settings]);

  const switchMode = useCallback(() => {
    settings.dispatch({
      type: 'setdisplayseconds',
      displaySeconds: !settings.state.displaySeconds,
    });
  }, [settings]);

  return (
    <Typography
      color="inherit"
      variant="body2"
      style={{ cursor: 'pointer' }}
      onClick={switchMode}
    >
      ET {date ? displayDate(date) : '--:--:--'}
    </Typography>
  );
};

export default EorzeaClock;

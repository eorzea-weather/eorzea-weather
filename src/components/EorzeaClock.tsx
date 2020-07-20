import Typography from '@material-ui/core/Typography';
import EorzeaTime from 'eorzea-time';
import React, { FC, useEffect, useState } from 'react';

const EorzeaClock: FC = () => {
  const [date, setDate] = useState<EorzeaTime>();

  useEffect(() => {
    let requestID: number;

    const loop = () => {
      setDate(new EorzeaTime());

      requestID = requestAnimationFrame(loop);
    };

    requestID = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(requestID);
    };
  }, []);

  return (
    <Typography color="inherit" variant="body2">
      ET {date ? date.toString() : '--:--:--'}
    </Typography>
  );
};

export default EorzeaClock;

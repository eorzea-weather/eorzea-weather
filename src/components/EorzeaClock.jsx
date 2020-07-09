import Typography from '@material-ui/core/Typography';
import EorzeaTime from 'eorzea-time';
import React, { useEffect, useState } from 'react';

const EorzeaClock = () => {
  const [date, setDate] = useState(null);

  useEffect(() => {
    let requestID;

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
      ET
      {' '}
      {date ? date.toString() : '--:--:--'}
    </Typography>
  );
};

export default EorzeaClock;

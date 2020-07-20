import Typography from '@material-ui/core/Typography';
import { NextPage } from 'next';
import React from 'react';
import { Helmet } from 'react-helmet';

const NotFound: NextPage = () => (
  <>
    <Helmet>
      <title>404 Not Found</title>
    </Helmet>
    <Typography variant="subtitle1">404 Not Found</Typography>
  </>
);

export default NotFound;

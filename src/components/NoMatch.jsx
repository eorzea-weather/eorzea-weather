import Typography from '@material-ui/core/Typography';
import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

export default () => (
  <Fragment>
    <Helmet>
      <title>
        404 Not Found
      </title>
    </Helmet>
    <Typography variant="subtitle1">
      404 Not Found
    </Typography>
  </Fragment>
);

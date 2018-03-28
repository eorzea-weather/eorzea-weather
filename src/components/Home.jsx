import Typography from 'material-ui/Typography';
import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

export default () => (
  <Fragment>
    <Typography variant="headline">
      <FormattedMessage defaultMessage="Home" id="home.title" />
    </Typography>
    <Typography paragraph><Link to="/zones/eureka-anemos"><FormattedMessage defaultMessage="See the weather in Eureka Anemos" id="home.eureka_anemos_link" /></Link>.</Typography>
  </Fragment>
);

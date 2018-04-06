import isEqual from 'lodash/isEqual';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { fetchZone } from '../actions/zones';
import WeatherTable from '../containers/WeatherTable';
import zoneShape from '../types/zoneShape';

const messages = defineMessages({
  title: {
    defaultMessage: '{name} weather',
    id: 'zone.title',
  },
});

export const styles = {
  headline: {
    marginBottom: '25px',
  },
  root: {
    margin: '16px auto',
    maxWidth: 'calc(100% - 20px)',
    width: '1240px',
  },
};

@injectIntl
@withStyles(styles)
export default class Zone extends Component {
  static defaultProps = {
    zone: null,
  };

  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.any).isRequired,
    dispatch: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    zone: zoneShape,
  };

  componentDidMount() {
    const { zone } = this.props;
    if (!zone.name) {
      const { locale } = this.props.intl;
      this.props.dispatch(fetchZone(zone.id, { locale }));
    }
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.zone, nextProps.zone);
  }

  render() {
    const { classes, intl, zone } = this.props;
    const title = intl.formatMessage(messages.title, { name: zone.name });

    return (
      <main className={classes.root}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Typography className={classes.headline} variant="headline">{title}</Typography>
        <WeatherTable zoneId={zone.id} />
      </main>
    );
  }
}

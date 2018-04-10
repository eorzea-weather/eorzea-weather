import isEqual from 'lodash/isEqual';
import kebabCase from 'lodash/kebabCase';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { fetchZone } from '../actions/zones';
import WeatherTable from '../containers/WeatherTable';
import tracker from '../utils/tracker';
import zoneShape from '../types/zoneShape';

const messages = defineMessages({
  title: {
    defaultMessage: '{name} weather',
    id: 'zone.title',
  },
});

export const styles = ({ spacing }) => ({
  headline: {
    margin: `${spacing.unit * 1}px ${spacing.unit * 0.75}px ${spacing.unit * 3}px`,
  },
  root: {
    margin: '16px auto',
    maxWidth: '100%',
    paddingTop: 80,
    width: 1240,
  },
});

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
    } else {
      this.track(this.props);
    }
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.zone, nextProps.zone);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.zone.id !== this.props.zone.id) {
      this.track(this.props);
    }
  }

  track({ zone }) {
    const { intl } = this.props;
    const path = `/zones/${kebabCase(zone.id)}`;
    const title = intl.formatMessage(messages.title, { name: zone.name });
    tracker.track({ path, title });
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

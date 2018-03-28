import camelCase from 'lodash/camelCase';
import isEqual from 'lodash/isEqual';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import React, { Fragment, Component } from 'react';
import { Helmet } from 'react-helmet';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { fetchWeathers } from '../actions/weathers';
import { fetchZone } from '../actions/zones';
import WeatherTable from '../components/WeatherTable';
import weatherShape from '../types/weatherShape';
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
};

@injectIntl
@withStyles(styles)
export default class Zone extends Component {
  static defaultProps = {
    weathers: [],
    zone: { name: '' },
  };

  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.any).isRequired,
    dispatch: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    match: PropTypes.shape({
      params: PropTypes.objectOf(PropTypes.string),
    }).isRequired,
    weathers: PropTypes.arrayOf(weatherShape),
    zone: zoneShape,
  };

  componentWillMount() {
    const {
      intl: { locale },
      match: { params },
    } = this.props;
    const zoneId = camelCase(params.zoneId);
    this.props.dispatch(fetchZone(zoneId, { locale }));
    this.props.dispatch(fetchWeathers(zoneId, { locale }));
  }

  shouldComponentUpdate(nextProps) {
    return (
      !isEqual(this.props.zone, nextProps.zone) ||
      !isEqual(this.props.weathers, nextProps.weathers)
    );
  }

  render() {
    const {
      classes,
      intl,
      weathers,
      zone,
    } = this.props;
    const title = intl.formatMessage(messages.title, { name: zone.name });

    return (
      <Fragment>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Typography className={classes.headline} variant="headline">{title}</Typography>
        <WeatherTable data={weathers} />
      </Fragment>
    );
  }
}

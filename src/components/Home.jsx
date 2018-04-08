import isEqual from 'lodash/isEqual';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router-dom';
import { fetchZone } from '../actions/zones';
import zoneShape from '../types/zoneShape';
import * as zoneList from '../zones';
import ZoneList from './ZoneList';

export const styles = ({ palette, spacing }) => ({
  button: {
    marginTop: spacing.unit * 3,
  },
  container: {
    padding: spacing.unit * 1.5,
  },
  hero: {
    alignItems: 'center',
    backgroundColor: palette.primary.main,
    color: palette.primary.contrastText,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '40vh',
  },
});

@injectIntl
@withStyles(styles)
export default class Home extends Component {
  static defaultProps = {
    zones: [],
  };

  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.any).isRequired,
    dispatch: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    zones: PropTypes.objectOf(zoneShape),
  };

  componentDidMount() {
    const {
      intl: { locale },
      zones,
    } = this.props;
    Object.values(zoneList).filter(zoneId => !zones[zoneId]).forEach((zoneId) => {
      this.props.dispatch(fetchZone(zoneId, { locale }));
    });
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.zones, nextProps.zones);
  }

  render() {
    const { classes, zones } = this.props;

    return (
      <Fragment>
        <div className={classes.hero}>
          <Typography color="inherit" component="h1" gutterBottom variant="display2">Eorzea Weather</Typography>
          <Button className={classes.button} component={props => <Link to="/zones/eureka-anemos" {...props} />} variant="raised">Eureka!</Button>
        </div>
        <main className={classes.container}>
          {Object.keys(zones).length > 0 && <ZoneList zones={zones} />}
        </main>
      </Fragment>
    );
  }
}

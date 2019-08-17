import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import React, { Component, forwardRef } from 'react';
import Helmet from 'react-helmet';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import zoneShape from '../types/zoneShape';
import tracker from '../utils/tracker';
import ZoneList from './ZoneList';

export const styles = ({ palette, spacing }) => ({
  button: {
    marginTop: spacing(3),
  },
  container: {
    padding: spacing(1.5),
  },
  hero: {
    alignItems: 'center',
    backgroundColor: palette.primary.main,
    color: palette.primary.contrastText,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '55vh',
    paddingBottom: 80,
    paddingTop: 80,
  },
});

const AdapterLink = forwardRef((props, ref) => <Link innerRef={ref} to="/zones/eureka-hydatos" {...props} />);

export default @injectIntl
@withStyles(styles)
class Home extends Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.any).isRequired,
    zones: PropTypes.objectOf(zoneShape),
  };

  static defaultProps = {
    zones: [],
  };

  componentDidMount() {
    tracker.track({ path: '/', title: 'Home' });
  }

  shouldComponentUpdate(nextProps) {
    const { zones } = this.props;

    return !isEqual(zones, nextProps.zones);
  }

  render() {
    const { classes, zones } = this.props;

    return (
      <>
        <div className={classes.hero}>
          <Helmet bodyAttributes={{ class: 'home' }} />

          <Typography color="inherit" component="h1" gutterBottom variant="h3">
            Eorzea Weather
          </Typography>

          <Button className={classes.button} component={AdapterLink} variant="contained">
            Eureka!
          </Button>
        </div>

        <main className={classes.container}>
          {Object.keys(zones).length > 0 && <ZoneList zones={zones} />}
        </main>
      </>
    );
  }
}

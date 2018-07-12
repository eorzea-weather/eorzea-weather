import CssBaseline from 'material-ui/CssBaseline';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { injectIntl, intlShape } from 'react-intl';
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from '../containers/Home';
import Zone from '../containers/Zone';
import * as locales from '../locales';
import AppHeader from './AppHeader';
import NoMatch from './NoMatch';

const compareLocations = (...locations) => {
  const { length: len } = locations;
  for (let i = 1; i < len; i += 1) {
    const locationA = locations[i - 1];
    const locationB = locations[i];
    if (
      locationA.pathname !== locationB.pathname
      || locationA.search !== locationB.search
    ) {
      return false;
    }
  }
  return true;
};

export const styles = {
  loading: {
    alignItems: 'center',
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    width: '100vw',
  },
};

export default @injectIntl
@withRouter
@withStyles(styles)
class App extends Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.any).isRequired,
    intl: intlShape.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string,
    }).isRequired,
  }

  state = {
    loading: true,
  };

  componentDidMount() {
    this.handleMount();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { location } = this.props;
    const { loading } = this.state;

    return (
      loading !== nextState.loading
      || !compareLocations(location, nextProps.location)
    );
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;

    if (!compareLocations(prevProps.location, location)) {
      window.scrollTo(0, 0);
    }
  }

  handleMount() {
    const renderedStyles = document.getElementById('server-rendered-styles');
    if (renderedStyles && renderedStyles.parentNode) {
      renderedStyles.parentNode.removeChild(renderedStyles);
    }
    this.setState({
      loading: false,
    });
  }

  render() {
    const { classes, intl, location } = this.props;
    const { loading } = this.state;

    return (
      <div id="app">
        <Helmet defaultTitle="Eorzea Weather" htmlAttributes={{ lang: intl.locale }} titleTemplate="%s - Eorzea Weather">
          <meta charSet="UTF-8" />
          <meta content="initial-scale=1,width=device-width" name="viewport" />
          <link href="/favicon.ico" rel="icon" />
          <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
          <link href={location.pathname} hrefLang="x-default" rel="alternate" />
          {Object.keys(locales).filter(v => v !== intl.locale).map(v => (
            <link href={`${location.pathname}?locale=${v}`} hrefLang={v} key={`lang-${v}`} rel="alternate" />
          ))}
        </Helmet>
        <CssBaseline />
        <AppHeader />
        {loading ? (
          <div className={classes.loading}>
            <CircularProgress size={150} />
          </div>
        ) : (
          <Switch>
            <Route component={Home} exact path="/" />
            <Route component={Zone} path="/zones/:zoneId" />
            <Route component={NoMatch} />
          </Switch>
        )}
      </div>
    );
  }
}

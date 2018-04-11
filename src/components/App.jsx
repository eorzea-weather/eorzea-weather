import CssBaseline from 'material-ui/CssBaseline';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { injectIntl, intlShape } from 'react-intl';
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from '../containers/Home';
import Zone from '../containers/Zone';
import * as locales from '../locales';
import Header from './Header';
import NoMatch from './NoMatch';

const compareLocations = (...locations) => {
  const { length: len } = locations;
  for (let i = 1; i < len; i += 1) {
    const locationA = locations[i - 1];
    const locationB = locations[i];
    if (
      locationA.pathname !== locationB.pathname ||
      locationA.search !== locationB.search
    ) {
      return false;
    }
  }
  return true;
};

@injectIntl
@withRouter
export default class App extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string,
    }).isRequired,
  }

  componentDidMount() {
    const styles = document.getElementById('server-rendered-styles');
    if (styles && styles.parentNode) {
      styles.parentNode.removeChild(styles);
    }
  }

  shouldComponentUpdate(nextProps) {
    return !compareLocations(this.props.location, nextProps.location);
  }

  componentDidUpdate(prevProps) {
    if (!compareLocations(prevProps.location, this.props.location)) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { intl, location } = this.props;

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
        <Header />
        <Switch>
          <Route component={Home} exact path="/" />
          <Route component={Zone} path="/zones/:zoneId" />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

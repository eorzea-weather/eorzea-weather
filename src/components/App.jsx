import AppBar from 'material-ui/AppBar';
import blueGrey from 'material-ui/colors/blueGrey';
import CssBaseline from 'material-ui/CssBaseline';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import LanguageIcon from 'material-ui-icons/Language';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { injectIntl, intlShape } from 'react-intl';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import Home from '../containers/Home';
import Zone from '../containers/Zone';
import * as locales from '../locales';
import EorzeaClock from './EorzeaClock';
import NoMatch from './NoMatch';

export const styles = {
  appbarTitle: {
    color: 'inherit',
    textDecoration: 'none',
  },
  container: {
    margin: '16px auto',
    maxWidth: 'calc(100% - 20px)',
    width: '1240px',
  },
  flex: {
    flex: 1,
  },
  footer: {
    backgroundColor: blueGrey[100],
    margin: '150px 0 0',
    padding: '40px 10px 30px',
    '& a': {
      color: blueGrey[600],
      textDecoration: 'none',
      '&:hover': {
        color: blueGrey[400],
      },
    },
  },
};

@injectIntl
@withRouter
@withStyles(styles)
export default class App extends Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.any).isRequired,
    intl: intlShape.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string,
    }).isRequired,
  }

  state = {
    anchorEl: null,
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.location.pathname !== prevProps.location.pathname ||
      this.props.location.search !== prevProps.location.search
    ) {
      window.scrollTo(0, 0);
    }
  }

  handleLanguageIconClick = ({ currentTarget }) => {
    this.setState({
      anchorEl: currentTarget,
    });
  }

  handleMenuClose = () => {
    this.setState({
      anchorEl: null,
    });
  }

  render() {
    const { classes, intl, location } = this.props;
    const { anchorEl } = this.state;

    return (
      <Fragment>
        <Helmet defaultTitle="Eorzea Weather" htmlAttributes={{ lang: intl.locale }} titleTemplate="%s - Eorzea Weather">
          <meta charSet="UTF-8" />
          <meta content="initial-scale=1,width=device-width" name="viewport" />
          <link href="/favicon.ico" rel="icon" />
          <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
          {Object.keys(locales).filter(v => v !== intl.locale).map(v => (
            <link href={`${location.pathname}?locale=${v}`} hrefLang={v} key={`lang-${v}`} rel="alternate" />
          ))}
        </Helmet>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.flex} color="inherit" noWrap variant="title">
              <Link className={classes.appbarTitle} to="/">Eorzea Weather</Link>
            </Typography>
            <EorzeaClock />
            <IconButton color="inherit" onClick={this.handleLanguageIconClick}>
              <LanguageIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                horizontal: 'right',
                vertical: 'top',
              }}
              MenuListProps={{
                component: 'div',
              }}
              onClose={this.handleMenuClose}
              open={!!anchorEl}
              transformOrigin={{
                horizontal: 'right',
                vertical: 'top',
              }}
            >
              <MenuItem component="a" href="?locale=en" onClick={this.handleMenuClose}>English</MenuItem>
              <MenuItem component="a" href="?locale=ja" onClick={this.handleMenuClose}>日本語</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <main className={classes.container}>
          <Switch>
            <Route component={Home} exact path="/" />
            <Route component={Zone} path="/zones/:zoneId" />
            <Route component={NoMatch} />
          </Switch>
        </main>
        <footer className={classes.footer}>
          <Typography align="center" variant="body1">Copyright &copy; 2018 <a href="mailto:flowercartelet@gmail.com">Lily Cartelet</a></Typography>
        </footer>
      </Fragment>
    );
  }
}

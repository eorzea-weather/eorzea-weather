import AppBar from 'material-ui/AppBar';
import blueGrey from 'material-ui/colors/blueGrey';
import CssBaseline from 'material-ui/CssBaseline';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import NoMatch from '../pages/NoMatch';
import Zone from '../pages/Zone';

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

@withStyles(styles)
export default class App extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    classes: PropTypes.object.isRequired,
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography color="inherit" noWrap variant="title">
              <Link className={classes.appbarTitle} to="/">Eorzea Weather</Link>
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.container}>
          <Switch>
            <Route component={Home} exact path="/" />
            <Route component={Zone} path="/zones/:id" />
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

import AppBar from 'material-ui/AppBar';
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
};

@withStyles(styles)
export default class App extends Component {
  static defaultProps = {
    classes: {},
  };

  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    classes: PropTypes.object,
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
      </Fragment>
    );
  }
}

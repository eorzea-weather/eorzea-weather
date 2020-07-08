import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LanguageIcon from '@material-ui/icons/Language';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppDrawer from '../containers/AppDrawer';
import EorzeaClock from './EorzeaClock';

const AVAILABLE_LOCALES = {
  en: 'English',
  ja: '日本語',
};

export const styles = ({ breakpoints, spacing }) => ({
  appBar: {
    'body.home &': {
      boxShadow: 'none',
    },
  },
  title: {
    color: 'inherit',
    textDecoration: 'none',
    [breakpoints.up('sm')]: {
      paddingLeft: spacing(2),
    },
    'body.home &': {
      color: 'transparent',
    },
  },
  flex: {
    flex: 1,
  },
});

export default @withRouter
@withStyles(styles)
class AppHeader extends Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.any).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string,
    }).isRequired,
  };

  state = {
    anchorEl: null,
    open: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { location } = this.props;
    const { anchorEl, open } = this.state;

    return (
      open !== nextState.open
      || anchorEl !== nextState.anchorEl
      || location.pathname !== nextProps.location.pathname
      || location.search !== nextProps.location.search
    );
  }

  handleDrawerClose = () => {
    this.setState({
      open: false,
    });
  }

  handleLanguageIconClick = ({ currentTarget }) => {
    this.setState({
      anchorEl: currentTarget,
    });
  }

  handleMenuIconClick = () => {
    this.setState({
      open: true,
    });
  }

  handleMenuClose = () => {
    this.setState({
      anchorEl: null,
    });
  }

  render() {
    const { classes } = this.props;
    const { anchorEl, open } = this.state;
    const origin = {
      horizontal: 'right',
      vertical: 'top',
    };
    const menuProps = {
      anchorEl,
      anchorOrigin: origin,
      MenuListProps: {
        component: 'div',
      },
      transformOrigin: origin,
    };

    return (
      <Fragment>
        <AppBar className={classes.appBar} position="fixed">
          <Toolbar>
            <IconButton color="inherit" onClick={this.handleMenuIconClick}>
              <MenuIcon />
            </IconButton>
            <Typography className={classes.flex} color="inherit" noWrap variant="h6">
              <Link className={classes.title} to="/">
                Eorzea Weather
              </Link>
            </Typography>
            <EorzeaClock />
            <IconButton color="inherit" onClick={this.handleLanguageIconClick}>
              <LanguageIcon />
            </IconButton>
            <Menu onClose={this.handleMenuClose} open={!!anchorEl} {...menuProps}>
              {Object.entries(AVAILABLE_LOCALES).map(([locale, label]) => (
                <MenuItem
                  component="a"
                  href={`?locale=${locale}`}
                  hrefLang={locale}
                  key={`item-${locale}`}
                  onClick={this.handleMenuClose}
                >
                  {label}
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </AppBar>
        <AppDrawer onClose={this.handleDrawerClose} open={open} />
      </Fragment>
    );
  }
}

import LanguageIcon from '@material-ui/icons/Language';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppDrawer from '../containers/AppDrawer';
import EorzeaClock from './EorzeaClock';

const AVAILABLE_LOCALES = {
  en: 'English',
  ja: '日本語',
};

export const styles = {
  appBarHome: {
    boxShadow: 'none',
  },
  title: {
    color: 'inherit',
    textDecoration: 'none',
  },
  flex: {
    flex: 1,
  },
  hideTitle: {
    display: 'none',
  },
};

@withRouter
@withStyles(styles)
export default class Header extends Component {
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
    return (
      this.state.open !== nextState.open ||
      this.state.anchorEl !== nextState.anchorEl ||
      this.props.location.pathname !== nextProps.location.pathname ||
      this.props.location.search !== nextProps.location.search
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

  isHome() {
    const { location } = this.props;
    return location.pathname === '/';
  }

  render() {
    const { classes } = this.props;
    const { anchorEl, open } = this.state;
    const appBarClassName = classNames({
      [classes.appBarHome]: this.isHome(),
    });
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
        <AppBar className={appBarClassName} position="static">
          <Toolbar>
            <IconButton color="inherit" onClick={this.handleMenuIconClick}>
              <MenuIcon />
            </IconButton>
            <Typography className={classes.flex} color="inherit" noWrap variant="title">
              <Link className={classNames(classes.title, { [classes.hideTitle]: this.isHome() })} to="/">Eorzea Weather</Link>
            </Typography>
            <EorzeaClock />
            <IconButton color="inherit" onClick={this.handleLanguageIconClick}>
              <LanguageIcon />
            </IconButton>
            <Menu onClose={this.handleMenuClose} open={!!anchorEl} {...menuProps} >
              {Object.entries(AVAILABLE_LOCALES).map(([locale, label]) => (
                <MenuItem
                  component={props => <a href={`?locale=${locale}`} hrefLang={locale} {...props}>{label}</a>}
                  key={`item-${locale}`}
                  onClick={this.handleMenuClose}
                />
              ))}
            </Menu>
          </Toolbar>
        </AppBar>
        <AppDrawer onClose={this.handleDrawerClose} open={open} />
      </Fragment>
    );
  }
}

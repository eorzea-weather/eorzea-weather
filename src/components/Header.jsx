import classNames from 'classnames';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import LanguageIcon from 'material-ui-icons/Language';
import MenuIcon from 'material-ui-icons/Menu';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { Link, withRouter } from 'react-router-dom';
import * as pkg from '../../package.json';
import EorzeaClock from './EorzeaClock';

const AVAILABLE_LOCALES = {
  en: 'English',
  ja: '日本語',
};

const messages = defineMessages({
  sourceCode: {
    defaultMessage: 'Source code',
    id: 'header.source_code',
  },
});

const normalizeRepositoryUrl = (repository) => {
  if (repository.url) {
    return repository.url.replace(/\.git$/, '');
  }
  if (typeof repository !== 'string') {
    return null;
  }
  return `https://github.com/${repository}`;
};

export const styles = ({ mixins }) => ({
  appBarHome: {
    boxShadow: 'none',
  },
  drawerHeader: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...mixins.toolbar,
  },
  drawerPaper: {
    minWidth: '240px',
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
});

@injectIntl
@withRouter
@withStyles(styles)
export default class Header extends Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.any).isRequired,
    intl: intlShape.isRequired,
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
    const { classes, intl } = this.props;
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
    const repositoryUrl = normalizeRepositoryUrl(pkg.repository);

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
        <Drawer anchor="left" classes={{ paper: classes.drawerPaper }} onClose={this.handleDrawerClose} open={open}>
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List onClick={this.handleDrawerClose} onKeyDown={this.handleDrawerClose}>
            {repositoryUrl && (
              <Fragment>
                {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
                <ListItem buttom component={props => <a href={repositoryUrl} rel="noopener" target="_blank" {...props} />}>
                  <ListItemText primary={intl.formatMessage(messages.sourceCode)} />
                </ListItem>
              </Fragment>
            )}
          </List>
        </Drawer>
      </Fragment>
    );
  }
}

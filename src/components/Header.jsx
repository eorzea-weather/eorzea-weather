import classNames from 'classnames';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import LanguageIcon from 'material-ui-icons/Language';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import EorzeaClock from './EorzeaClock';

const AVAILABLE_LOCALES = {
  en: 'English',
  ja: '日本語',
};

export const styles = {
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
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.anchorEl !== nextState.anchorEl ||
      this.props.location.pathname !== nextProps.location.pathname ||
      this.props.location.search !== nextProps.location.search
    );
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
    const { classes, location } = this.props;
    const { anchorEl } = this.state;
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
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.flex} color="inherit" noWrap variant="title">
            <Link className={classNames(classes.title, { [classes.hideTitle]: location.pathname === '/' })} to="/">Eorzea Weather</Link>
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
    );
  }
}

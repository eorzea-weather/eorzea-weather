import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LanguageIcon from '@material-ui/icons/Language';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { AVAILABLE_LOCALES } from '../../constants';
import AppDrawer from '../AppDrawer';
import EorzeaClock from '../EorzeaClock';

const useStyles = makeStyles((theme) =>
  createStyles({
    menuItem: {
      padding: 0,
    },
    menuLink: {
      color: 'inherit',
      display: 'block',
      padding: [theme.spacing(0.75), theme.spacing(2)]
        .map((v) => `${v}px`)
        .join(' '),
      textDecoration: 'inherit',
    },
    title: {
      color: 'inherit',
      textDecoration: 'none',
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(2),
      },
    },
    flex: {
      flex: 1,
    },
  }),
);

const AppHeader: FC = () => {
  const [isHome, setIsHome] = useState(true);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const classes = useStyles();

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleLanguageIconClick = useCallback(({ currentTarget }) => {
    setAnchorEl(currentTarget);
  }, []);

  const handleMenuIconClick = useCallback(() => {
    setOpen(true);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  useEffect(() => {
    setIsHome(router.pathname === '/');
  }, [router.pathname]);

  return (
    <>
      <AppBar elevation={isHome ? 0 : 4} position="fixed">
        <Toolbar>
          <IconButton color="inherit" onClick={handleMenuIconClick}>
            <MenuIcon />
          </IconButton>
          <Typography
            className={classes.flex}
            color="inherit"
            noWrap
            variant="h6"
          >
            {!isHome && (
              <Link href="/" prefetch={false}>
                <a className={classes.title}>Eorzea Weather</a>
              </Link>
            )}
          </Typography>

          {(router.locales || []).length > 1 && (
            <>
              <IconButton color="inherit" onClick={handleLanguageIconClick}>
                <LanguageIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  horizontal: 'right',
                  vertical: 'top',
                }}
                onClose={handleMenuClose}
                open={!!anchorEl}
                transformOrigin={{
                  horizontal: 'right',
                  vertical: 'top',
                }}
              >
                {(router.locales || []).map((locale) => (
                  <MenuItem
                    className={classes.menuItem}
                    key={`item-${locale}`}
                    onClick={handleMenuClose}
                    selected={locale === router.locale}
                  >
                    <Link href={router.asPath} locale={locale} prefetch={false}>
                      <a
                        className={classes.menuLink}
                        hrefLang={locale}
                        lang={locale}
                      >
                        {AVAILABLE_LOCALES[locale]}
                      </a>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}

          <EorzeaClock />
        </Toolbar>
      </AppBar>

      <Toolbar />

      <AppDrawer onClose={handleDrawerClose} open={open} />
    </>
  );
};

export default AppHeader;

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LanguageIcon from '@material-ui/icons/Language';
import MenuIcon from '@material-ui/icons/Menu';
import { useLocale } from '@react-aria/i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useCallback, useState } from 'react';
import AppDrawer from '@/components/AppDrawer';
import EorzeaClock from '@/components/EorzeaClock';
import { AVAILABLE_LOCALES } from '@/constants';

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
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { locale } = useLocale();
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

  const isHome = router.pathname === '/[locale]';

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
              <Link as={`/${locale}`} href="/[locale]" prefetch={false}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className={classes.title}>Eorzea Weather</a>
              </Link>
            )}
          </Typography>
          {router.asPath.startsWith(`/${locale}`) && (
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
                {Object.entries(AVAILABLE_LOCALES).map(
                  ([availableLocale, label]) => (
                    <MenuItem
                      className={classes.menuItem}
                      key={`item-${availableLocale}`}
                      onClick={handleMenuClose}
                      selected={availableLocale === locale}
                    >
                      <Link
                        as={`/${availableLocale}${router.asPath.replace(
                          /^\/[^/]+/,
                          '',
                        )}`}
                        href={router.pathname}
                        prefetch={false}
                      >
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a
                          className={classes.menuLink}
                          hrefLang={availableLocale}
                          lang={availableLocale}
                        >
                          {label}
                        </a>
                      </Link>
                    </MenuItem>
                  ),
                )}
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

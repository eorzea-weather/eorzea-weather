import blue from '@material-ui/core/colors/blue';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import React, { FC, useMemo } from 'react';
import { useSettings } from '../../context/settings';

const Theme: FC = ({ children }) => {
  const settings = useSettings();
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(() => {
    let dark = settings.state.dark;
    if (dark == null) dark = prefersDark;

    return createMuiTheme({
      palette: {
        type: dark ? 'dark' : 'light',
        primary: blue,
      },
    });
  }, [settings, prefersDark]);

  return (
    <>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </>
  );
};

export default Theme;

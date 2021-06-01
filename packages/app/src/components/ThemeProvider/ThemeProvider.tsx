import blue from '@material-ui/core/colors/blue';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import React, { FC, useContext, useMemo } from 'react';
import { SettingsContext } from '../../context/settings';

const ThemeProvider: FC = ({ children }) => {
  const settings = useContext(SettingsContext);
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(() => {
    // This isn't unsafe. TypeScript go away.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
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

export default ThemeProvider;

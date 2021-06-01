import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import MoonIcon from '@material-ui/icons/Brightness4';
import SunIcon from '@material-ui/icons/BrightnessHigh';
import React, { FC, useContext, useCallback } from 'react';
import { SettingsContext } from '../context/settings';

const ThemeButton: FC = () => {
  const settings = useContext(SettingsContext);
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  // This isn't unsafe. TypeScript go away.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  let dark = settings.state.dark;
  if (dark == null) dark = prefersDark;

  const handleThemeIconClick = useCallback(() => {
    // This isn't unsafe. TypeScript go away.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    let dark = settings.state.dark;
    if (dark == null) dark = prefersDark;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    settings.dispatch({
      type: 'setdark',
      dark: !dark,
    });
  }, [settings, prefersDark]);

  return (
    <IconButton color="inherit" onClick={handleThemeIconClick}>
      {dark ? <MoonIcon /> : <SunIcon />}
    </IconButton>
  );
};

export default ThemeButton;

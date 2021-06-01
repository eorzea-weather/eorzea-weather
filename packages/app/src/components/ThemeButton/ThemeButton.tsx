import useMediaQuery from '@material-ui/core/useMediaQuery';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import MoonIcon from '@material-ui/icons/Brightness4';
import SunIcon from '@material-ui/icons/BrightnessHigh';
import { useMessageFormatter } from '@react-aria/i18n';
import React, { FC, useCallback } from 'react';
import { useSettings } from '../../context/settings';
import messages from './intl';

const ThemeButton: FC = () => {
  const messageFormatter = useMessageFormatter(messages);
  const settings = useSettings();
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  let dark = settings.state.dark;
  if (dark == null) dark = prefersDark;

  const handleThemeIconClick = useCallback(() => {
    let dark = settings.state.dark;
    if (dark == null) dark = prefersDark;

    settings.dispatch({
      type: 'setdark',
      dark: !dark,
    });
  }, [settings, prefersDark]);

  return (
    <Tooltip title={messageFormatter('toggle_theme')}>
      <IconButton color="inherit" onClick={handleThemeIconClick}>
        {dark ? <MoonIcon /> : <SunIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeButton;

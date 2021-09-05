import { createContext, useContext } from 'react';
import type { Context } from './types';

const SettingsContext = createContext<Context | undefined>(undefined);

export default SettingsContext;

export const useSettings = (): Context => {
  const settings = useContext(SettingsContext);
  if (settings === undefined)
    throw new Error('useSettings must be used within a SettingsProvider');
  return settings;
};

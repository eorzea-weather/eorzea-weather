/* global localStorage, */

import React, { FC, useEffect, useReducer, useState } from 'react';

import SettingsReducer from './reducer';
import SettingsContext from './context';
import type { State, Context } from './types';

// Initial State

const initialState: State = {
  dark: null,
  displaySeconds: true,
};

// Context and Provider

export const Provider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(SettingsReducer, initialState);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialized)
      try {
        localStorage.setItem('settings', JSON.stringify(state));
      } catch {
        /* no-op */
      }
  }, [initialized, state]);

  useEffect(() => {
    if (!initialized && window.localStorage) {
      try {
        if (localStorage['settings'])
          dispatch({
            type: 'load',
            state: JSON.parse(localStorage['settings']) as State,
          });
      } catch {
        /* no-op */
      }

      setInitialized(true);
    }
  }, [initialized]);

  return (
    <SettingsContext.Provider value={{ state, dispatch } as Context}>
      {children}
    </SettingsContext.Provider>
  );
};

/* global localStorage, */

import React, {
  createContext,
  FC,
  useEffect,
  useReducer,
  useState,
} from 'react';

export type NullishBool = boolean | null;

export type State = {
  dark: NullishBool;
};

export type Action = {
  type: string;
  dark?: NullishBool;
  state?: State;
};

export type Context = {
  state: State;
  dispatch: (action: Action) => void;
};

const initialState: State = {
  dark: null,
};

function settingsReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'load':
      return {
        ...state,
        ...action.state,
      };

    case 'setdark':
      return {
        ...state,
        dark: action.dark ?? null,
      };
  }

  return state;
}

const useSettings = () => {
  const [state, dispatch] = useReducer(settingsReducer, initialState);
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

  return {
    state,
    dispatch,
  } as Context;
};

export const SettingsContext = createContext<Context>({
  state: initialState,
  dispatch: () => null,
} as Context);

export const Provider: FC = ({ children }) => {
  return (
    <SettingsContext.Provider value={useSettings()}>
      {children}
    </SettingsContext.Provider>
  );
};

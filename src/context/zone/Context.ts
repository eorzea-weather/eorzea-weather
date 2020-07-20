import { createContext } from 'react';

export type Zone = {
  id: string;
  name: string;
};

type Values = {
  zones: {
    [id: string]: Zone;
  };
};

const Context = createContext<Values>({
  zones: {},
});

export default Context;

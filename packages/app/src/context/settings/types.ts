export type BoolOrNull = boolean | null;

export type State = {
  dark: BoolOrNull;
};

export type ActionType = 'load' | 'setdark';

export type Action = {
  type: ActionType;
  dark?: BoolOrNull;
  state?: State;
};

export type Context = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

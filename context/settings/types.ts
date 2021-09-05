export type BoolOrNull = boolean | null;

export type State = {
  dark: BoolOrNull;
  displaySeconds: boolean;
};

export type ActionType = 'load' | 'setdark' | 'setdisplayseconds';

export type Action = {
  type: ActionType;
  dark?: BoolOrNull;
  displaySeconds?: boolean;
  state?: State;
};

export type Context = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

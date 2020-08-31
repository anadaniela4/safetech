import React, { createContext, useContext, useReducer, Dispatch } from 'react';
import { Actions } from '../Actions/ActionsTypes';
import { IStateApp } from './IApp';
import Reducer, { initialState } from '../Reducers/Reducers';

export interface IContextProps {
  state: IStateApp;
  dispatch: Dispatch<Actions>;
}

interface ICreateReducer {
  children: JSX.Element;
}

export const StateContext = createContext<IStateApp | any>({});

export const Provider = ({ children }: ICreateReducer): JSX.Element => {
  return (
    <StateContext.Provider value={useReducer(Reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);

export function useSelector<T>(selector: (state: IStateApp) => T): T {
  const [state] = useStateValue();
  return selector(state);
}

export function useDispatch() {
  const [state, dispatch]: [IContextProps, Dispatch<Actions>] = useStateValue();

  return action => typeof action === 'function' ? action(dispatch, state) : dispatch(action);
}
import React from "react";

export const initialState = { data: [] };

export function reducer(state, action) {
  switch (action.type) {
    case "init":
      return { ...state, data: action.data };
    case "filter":
      return { ...state, data: state.data.filter((item) => item === 1) };
    case "add_pin":
      return { ...state, pin: { position: action.position } };
    default:
      throw new Error();
  }
}

export const GlobalContext = React.createContext(initialState);

export const useGlobal = () => {
  const { globalState, dispatch } = React.useContext(GlobalContext);
  return { globalState, dispatch };
};

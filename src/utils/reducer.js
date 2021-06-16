import React from "react";

export const initialState = {
  data: [],
  currentInfoId: null,
  infoDrawerOpen: false,
};

export function reducer(state, action) {
  switch (action.type) {
    case "init":
      return { ...state, data: action.data };
    case "setInfoId":
      return { ...state, currentInfoId: action.data };
    case "setInfoDrawerOpen":
      return { ...state, infoDrawerOpen: action.data };
    case "filter":
      return { ...state, data: state.data.filter((item) => item === 1) };

    default:
      throw new Error();
  }
}

export const GlobalContext = React.createContext(initialState);

export const useGlobal = () => {
  const { globalState, dispatch } = React.useContext(GlobalContext);
  return { globalState, dispatch };
};

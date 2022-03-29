import { createContext, useReducer } from "react";

export const ThemeContext = createContext();
const themeReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_COLOR":
      return { ...state, color: action.payload };
    case "CHANGE_MODE":
      return { ...state, mode: action.payload };
    //   n6
    // return后面不要直接写mode，而不写...state，不然就会创建一个新的mode，就创建了新的state object, and there is no color property anymore
    default:
      return state;
  }
};

export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, {
    color: "#58249c",
    mode: "dark",
  });
  const changeColor = (color) => {
    dispatch({ type: "CHANGE_COLOR", payload: color });
  };

  const changeMode = (mode) => {
    dispatch({ type: "CHANGE_MODE", payload: mode });
  };

  return (
    <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

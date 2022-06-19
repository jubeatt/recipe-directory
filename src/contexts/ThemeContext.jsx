import { createContext, useCallback, useReducer } from "react"

export const ThemeContext = createContext()

const initialState = {
  colorTheme: 'purple',
  darkTheme: false
}

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_COLOR_THEME':
      return {...state, colorTheme: action.payload}
    case 'CHANGE_DARK_THEME':
      return {...state, darkTheme: action.payload}
    default:
      return state
  }
}

export function ThemeProvider ({ children }) {
  const [state, dispatch] = useReducer(themeReducer, initialState)
  const changeColorTheme = useCallback((color) => dispatch({
    type: 'CHANGE_COLOR_THEME',
    payload: color
  }), [])
  const changeDarkTheme = useCallback((isActive) => dispatch({
    type: 'CHANGE_DARK_THEME',
    payload: isActive
  }), [])

  return (
    <ThemeContext.Provider value={{...state, changeColorTheme, changeDarkTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}
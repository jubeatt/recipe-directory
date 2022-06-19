import { createContext, useReducer , useCallback } from "react"

export const ThemeContext = createContext()

const initialState = {
  color: '#58249c',
  mode: 'light'
}
const themeReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_THEME':
      return { ...state, color: action.payload }
    case 'CHANGE_MODE':
      return { ...state, mode: action.payload}
    default:
      return state
  }
}
export function ThemeProvider ({ children }) {
  const [state, dispatch] = useReducer(themeReducer, initialState)

  const changeTheme = useCallback((color) => dispatch({
    type:'CHANGE_THEME',
    payload: color
  }), [])
  const changeMode = useCallback((mode) => dispatch({
    type: 'CHANGE_MODE',
    payload: mode
  }), [])

  return (
    <ThemeContext.Provider value={{...state, changeTheme, changeMode}}>
      {children}
    </ThemeContext.Provider>
  )
}
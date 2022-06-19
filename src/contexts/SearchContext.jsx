import { createContext, useCallback, useReducer } from "react"

export const SearchContext = createContext()

const initialState = {
  searchText: ''
}

const searchReducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_BY':
      return {...state, searchText: action.payload}
    default:
      return state
  }
}

export function SearchProvider ({ children }) {
  const [state, dispatch] = useReducer(searchReducer, initialState)
  const searchBy = useCallback((text) => dispatch({
    type: 'SEARCH_BY',
    payload: text
  }), [])

  return (
    <SearchContext.Provider value={{...state, searchBy}}>
      {children}
    </SearchContext.Provider>
  )
}
import { useContext } from "react"
import { SearchContext } from "../contexts/SearchContext"

export function useSearch () {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error('useSearch() must be used inside SearchProvider.')
  }
  return context
}
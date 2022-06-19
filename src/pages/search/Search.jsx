import "./Search.css"
import React from "react"
import { useLocation } from "react-router-dom"
import { useFetch } from "hooks/useFetch"
import RecipeList from "components/RecipeList"
import Progress, { progressProps } from "components/Progress"
import { useTheme } from "hooks/useTheme"

export default function Search() {
  const { mode } = useTheme()
  const queryString = useLocation().search
  const queryParams = new URLSearchParams(queryString)
  const keyword = queryParams.get('q')
  const url = 'http://localhost:3000/recipes?title_like=' + keyword
  const { data, isPending, error  } = useFetch(url)

  return (
    <div className="search">
      <Progress
        isAnimating={isPending}
        animationDuration={progressProps.animationDuration}
        incrementDuration={progressProps.incrementDuration}
      />
      <h2 className={`page-title ${mode}`}>{`Recipes include: "${keyword}"`}</h2>
      {isPending && <div className={`loading ${mode}`}>Searching...</div>}
      {error && <div className="error">{error}</div>}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}

import "./Home.css"
import React from "react"
import { useFetch } from "hooks/useFetch"
import RecipeList from "components/RecipeList"
import Progress, { progressProps } from "components/Progress"
import { useTheme } from "hooks/useTheme"

export default function Home() {
  const { mode } = useTheme()
  const { data, isPending, error } = useFetch("http://localhost:3000/recipes")
  return (
    <div className="home">
      <Progress
        isAnimating={isPending}
        animationDuration={progressProps.animationDuration}
        incrementDuration={progressProps.incrementDuration}
      />
      {isPending && <div className={`loading ${mode}`}>Loading...</div>}
      {error && <div className="error">{error}</div>}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}

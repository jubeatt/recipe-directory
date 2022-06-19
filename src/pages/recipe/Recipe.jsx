import "./Recipe.css"
import React from "react"
import { useParams } from "react-router-dom"
import { useFetch } from "hooks/useFetch"
import Progress, { progressProps } from "components/Progress"
import { useTheme } from "hooks/useTheme"

export default function Recipe() {
  const { mode } = useTheme()
  const { id } = useParams()
  const { data: recipe, isPending, error } = useFetch(`http://localhost:3000/recipes/${id}`)

  return (
    <div className={`recipe ${mode}`}>
      <Progress
        isAnimating={isPending}
        animationDuration={progressProps.animationDuration}
        incrementDuration={progressProps.incrementDuration}
      />
      {isPending && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {recipe && (
        <>
          <h1 className="page-title">{recipe?.title}</h1>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
          </ul>
          <p className="method">{recipe.method}</p>
        </>
      )}
    </div>
  )
}

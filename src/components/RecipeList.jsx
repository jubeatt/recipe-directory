import "./RecipeList.css"
import React from 'react'
import { Link } from "react-router-dom"
import { useTheme } from "hooks/useTheme"

export default function RecipeList({ recipes }) {
  const { mode } = useTheme()

  return recipes.length !== 0 ? (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime}</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipe/${recipe.id}`}>Cook This</Link>
        </div>
      ))}
    </div>
  ) : <div className="loading">No recipes load...</div>
}

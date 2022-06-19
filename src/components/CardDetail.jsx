import React from 'react'
import { useTheme } from '../hooks/useTheme'
export default function CardDetail({ recipe }) {
  const { darkTheme } = useTheme()

  return (
    <div className={`${darkTheme ? 'bg-zinc-600' : 'bg-white'} rounded p-8 shadow`}>
      <h2 className={`${darkTheme ? 'text-white' : 'text-gray-700'} font-semibold text-3xl my-4 text-center`}>{recipe.title}</h2>
      <p className={`${darkTheme ? 'text-white' : 'text-gray-500'} text-light text-center`}>Takes {recipe.cookingTime} to cook</p>
      <p className={`${darkTheme ? 'text-white' : 'text-gray-400'} text-center mb-4`}>{recipe.ingredients.join(', ')}</p>
      <p className={`${darkTheme ? 'text-white' : 'text-gray-500'}  line-clamp-3`}>{recipe.method}</p>
    </div>
  )
}
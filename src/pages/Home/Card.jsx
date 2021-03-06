import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import { CgTrashEmpty } from "react-icons/cg"
import { db } from '../../firebase/config'

export default function Card({ recipe }) {
  const { darkTheme } = useTheme()
  
  const deleteRecipe = (id) => {
    db.collection('recipes').doc(id).delete()
  }

  return (
    <div className={`${darkTheme ? 'bg-zinc-600' : 'bg-white'} rounded p-4 shadow hover:rotate-3 duration-300 relative`}>
      <h2 className={`${darkTheme ? 'text-white' : 'text-gray-700'} font-semibold text-2xl  mb-1`}>{recipe.title}</h2>
      <p className={`${darkTheme ? 'text-white' : 'text-gray-400'} mb-4 text-light`}>{recipe.cookingTime}</p>
      <p className={`${darkTheme ? 'text-white' : 'text-gray-500'} line-clamp-3`}>{recipe.method}</p>
      <div className='text-center mt-4'>
        <Link 
          className={`${darkTheme ? 'text-gray-500 bg-white hover:bg-gray-400 hover:text-white' : 'text-gray-500 bg-gray-200 hover:bg-gray-300'} inline-block rounded px-4 py-2 duration-300`}
          to={`/recipe/${recipe.id}`}
        >
          Cook This
        </Link>
      </div>
      <button
        className="absolute top-2.5 right-2.5 curosr-pointer"
        onClick={() => deleteRecipe(recipe.id)}
      >
        <CgTrashEmpty size={22} color={darkTheme ? 'white' : 'black'} />
      </button>
    </div>
  )
}

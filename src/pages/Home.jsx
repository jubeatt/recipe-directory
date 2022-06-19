import React from 'react'
import { useFetch } from '../hooks/useFetch'
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { BsExclamationCircleFill } from "react-icons/bs"
import Card from '../components/Card'
import { useTheme } from '../hooks/useTheme'
import { useSearch } from '../hooks/useSearch'

export default function Home() {
  const { darkTheme } = useTheme()
  const { searchText } = useSearch()
  const { data: recipes, isPending, error } = useFetch(`http://localhost:3000/recipes?title_like=${searchText}`)

  return (
    <div className='mt-8 pb-10'>
      <div className='container'>
        {searchText && <div className={`${darkTheme ? 'text-white' : 'text-slate-700'} text-2xl font-bold text-center mb-8`}>Recipes including "{searchText}"</div>}
        {isPending && (
          <div className='text-center text-4xl'>
            <span className='spin'>
              <AiOutlineLoading3Quarters color={darkTheme ? 'white' : 'black'} />
            </span>
          </div>
        )}
        {error && (
          <div className='text-rose-700 bg-rose-100 text-xl p-2 rounded flex gap-2 items-center'>
            <BsExclamationCircleFill /> {error}
          </div>
        )}
        {!isPending && recipes?.length === 0 && (
          <div className={`${darkTheme ? 'text-white' : 'text-slate-700'} text-2xl`}>No match recipes...</div>
        )}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 items-start'>
          {!isPending && recipes?.length > 0 && recipes.map(recipe => <Card key={recipe.id} recipe={recipe} />)}
        </div>
      </div>
    </div>
  )
}

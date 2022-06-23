import React, { useRef, useState } from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { BsExclamationCircleFill } from "react-icons/bs"
import Card from './Card'
import { useTheme } from '../../hooks/useTheme'
import { useSearch } from '../../hooks/useSearch'
import { useEffect } from 'react'
import { db } from '../../firebase/config'

export default function Home() {
  const { darkTheme } = useTheme()
  const { searchText } = useSearch()
  const [recipes, setRecipes] = useState(null)
  const backupRecipes = useRef(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const isInit = useRef(false)

  useEffect(() => {
    if (!isInit.current) return
    setIsPending(true)
    setTimeout(() => {
      setIsPending(false)
    }, 500)
    if (recipes && searchText) {
      const searchResult = backupRecipes.current
        .filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()))
      setRecipes(searchResult)
    } else {
      setRecipes(backupRecipes.current)
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText])
  
  useEffect(() => {
    setIsPending(true)
    const unsubscribe = db.collection('recipes').onSnapshot(snapshot => {
      if (snapshot.empty) throw new Error('Can not load any recipe...')
        const response = []
        snapshot.forEach(doc => {
          response.push({
            id: doc.id,
            ...doc.data()
          })
        })
        isInit.current = true
        setRecipes(response)
        backupRecipes.current = response
        setIsPending(false)
    }, (error) => {
      isInit.current = true
      setError(error.message)
      setIsPending(false)
    })
    return () => unsubscribe()
  }, [])

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
          {!isPending && recipes?.length > 0 && recipes.map(recipe => (
            <Card key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  )
}

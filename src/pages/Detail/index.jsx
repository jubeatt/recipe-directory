import React from 'react'
import { useParams } from 'react-router-dom'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useTheme } from '../../hooks/useTheme'
import { BsExclamationCircleFill } from 'react-icons/bs'
import { useEffect } from 'react'
import { useState } from 'react'
import { db } from '../../firebase/config'
import { colorScheme } from '../../theme/colorScheme'
import ModalForm from './Form'

export default function Detail() {
  const { id } = useParams()
  const { darkTheme, colorTheme } = useTheme()
  const [recipe, setRecipe] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [modal, setModal] = useState(false)

  useEffect(() => {
    setIsPending(true)
    const unsubscribe = db.collection('recipes').doc(id).onSnapshot(snapshot => {
      setIsPending(false)
      if (!snapshot.exists) throw new Error('Can not found that recipe')
      setRecipe(snapshot.data())
    }, (error) => {
      setIsPending(false)
      setError(error.message)
    })
    
    return () => unsubscribe()
  }, [id])


  return (
    <div className='pb-10'>
      <div className='container'>
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
        {recipe && (
          <>
            <div className='text-right mb-4'>
              <button
                className={`${colorScheme[colorTheme]['bg']} ${colorScheme[colorTheme]['hoverBg']} px-6 py-2 rounded text-white`}
                onClick={() => setModal(true)}
              >
              Edit
              </button>
            </div>
            <div className={`${darkTheme ? 'bg-zinc-600' : 'bg-white'} rounded p-8 shadow`}>
              <h2 className={`${darkTheme ? 'text-white' : 'text-gray-700'} font-semibold text-3xl my-4 text-center`}>{recipe.title}</h2>
              <p className={`${darkTheme ? 'text-white' : 'text-gray-500'} text-light text-center`}>Takes {recipe.cookingTime} to cook</p>
              <p className={`${darkTheme ? 'text-white' : 'text-gray-400'} text-center mb-4`}>{recipe.ingredients.join(', ')}</p>
              <p className={`${darkTheme ? 'text-white' : 'text-gray-500'}  line-clamp-3`}>{recipe.method}</p>
            </div>
          </>
        )}
      </div>
      {modal && (
        <ModalForm
          id={id}
          formData={recipe}
          onClose={() => setModal(false)}
        />
      )}
    </div>
  )
}

import React from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import CardDetail from "../components/CardDetail"
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useTheme } from '../hooks/useTheme'

export default function Detail() {
  const { id } = useParams()
  const { darkTheme } = useTheme()
  const { data: recipe ,isPending, error } = useFetch(`http://localhost:3000/recipes/${id}`)
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
        {error && <div>{error}</div>}
        {recipe && <CardDetail recipe={recipe} />}
      </div>
    </div>
  )
}

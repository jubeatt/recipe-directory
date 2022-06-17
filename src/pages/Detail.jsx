import React from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import CardDetail from "../components/CardDetail"

export default function Detail() {
  const { id } = useParams()
  const { data: recipe ,isPending, error } = useFetch(`http://localhost:3000/recipes/${id}`)
  return (
    <div className='pb-10'>
      <div className='container'>
        {isPending && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {recipe && <CardDetail recipe={recipe} />}
      </div>
    </div>
  )
}

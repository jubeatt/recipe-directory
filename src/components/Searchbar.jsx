import './Searchbar.css'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function Searchbar() {
  const [term, setTerm] = useState("")
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    history.push(`/search?q=${term}`)
  }

  return (
    <div className='searchbar'>
      <form onSubmit={handleSubmit} autoComplete="off">
        <label htmlFor="search">Search</label>
        <input
          type="text"
          id="search"
          value={term}
          onChange={e => setTerm(e.target.value)} />
      </form>
    </div>
  )
}

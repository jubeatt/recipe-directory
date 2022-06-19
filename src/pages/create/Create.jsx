import "./Create.css"
import { useHistory } from "react-router-dom"
import React, { useEffect, useRef, useState } from "react"
import { useFetch } from "hooks/useFetch"
import Progress, { progressProps } from "components/Progress"

export default function Create() {
  const [title, setTitle] = useState("")
  const [method, setMethod] = useState("")
  const [cookingTIme, setCookingTime] = useState("")
  const [newIngredients, setNewIngredients] = useState("")
  const [ingredients, setIngredients] = useState([])
  const inputIngredientRef = useRef(null)
  const { setPostData, isPending, error, data } = useFetch('http://localhost:3000/recipes', 'POST')
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    setPostData({
      title,
      method,
      ingredients,
      cookingTIme: cookingTIme + ' minutes'
    })
  }

  useEffect(() => {
    data && history.push('/')
  }, [data, history])

  const addIngredients = (e) => {
    e.preventDefault()
    const newIng = newIngredients.trim()
    // validation
    newIng
      && !ingredients.includes(newIng) 
      && setIngredients(prevIngredients => [...prevIngredients, newIng])

    setNewIngredients("")
    inputIngredientRef.current.focus()
  }
  
  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe Title:</span>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Recipe Ingredients:</span>
          <div className="ingredients">
            <input
              ref={inputIngredientRef}
              type="text"
              value={newIngredients}
              onChange={e => setNewIngredients(e.target.value)}
            />
            <button onClick={addIngredients}>add</button>
          </div>
          <p>Current Ingredients: <em>{ingredients.join(', ')}</em></p>
        </label>
        <label>
          <span>Recipe Method:</span>
          <textarea
            value={method}
            onChange={e => setMethod(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Cooking Time (minutes):</span>
          <input
            type="number"
            max="100"
            value={cookingTIme}
            onChange={e => setCookingTime(e.target.value)}
            required
          />
        </label>
        <button>{ isPending ? 'saving...' :'submit'}</button>
      </form>
    </div>
  )
}

import React, { useState } from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { useHistory } from "react-router-dom"
import { useTheme } from '../hooks/useTheme'
import { colorScheme } from "../theme/colorScheme"

const Label = ({ text }) => {
  const { darkTheme } = useTheme()
  return <div className={`  ${darkTheme ? 'label-dark' : 'label'}`}>{text}</div>
}

const FormField = ({ type, value, disabled, onChange, ...props}) => {
  if (type === 'text') {
    return (
      <input 
        className="input-field"
        disabled={disabled}
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
    )
  } else if (type === 'textarea') {
    return (
      <textarea 
        className="input-field"
        disabled={disabled}
        value={value}
        onChange={onChange}
        {...props}
      ></textarea>
    )
  } else if (type === 'number') {
    return (
      <input 
        className="input-field"
        disabled={disabled}
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
    )
  }
}

export default function Create() {
  const { darkTheme, colorTheme } = useTheme()

  const [title, setTitle] = useState("")
  const [ingredientsInput, setIngredientsInput] = useState("")
  const [method, setMethod] = useState("")
  const [cookingTime, setCookingTime] = useState("")
  const [ingredients, setIngredients] = useState([])
  const [loading, setLoading] = useState(false)
  
  const history = useHistory()

  const resetState = () => {
    setTitle("")
    setIngredientsInput("")
    setMethod("")
    setCookingTime("")
    setLoading(false)
  }

  const addNewRecipe = (e) => {
    e.preventDefault()
    const data = {
      title,
      ingredients,
      method,
      cookingTime
    }
    setLoading(true)
    fetch('http://localhost:3000/recipes', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) throw new Error(response.statusText)
      setTimeout(() => {
        resetState()
        history.push('/')
      } , 1500)
    })
    .catch(error => console.log(error.message))
  }

  return (
    <div className='pb-10'>
      <form className='container-sm' onSubmit={addNewRecipe}>
        <h2 className={`${darkTheme ? 'text-white' : 'text-slate-700'}  text-center font-bold text-4xl mb-4`}>Add New Recipe</h2>
        <div className='mb-4'>
          <Label text="Recipe Title:"/>
          <FormField
            type="text"
            disabled={loading}
            value={title}
            required={true}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <Label text="Recipe Ingredients:"/>
          <div className='flex gap-2 mb-1'>
            <FormField
              type="text"
              disabled={loading}
              value={ingredientsInput}
              onChange={e => setIngredientsInput(e.target.value)}
            />
            <button
              disabled={loading}
              className={`${colorScheme[colorTheme]['bg']} ${colorScheme[colorTheme]['hover']} duration-300 py-1 px-4 rounded text-white`}
              onClick={e => {
                e.preventDefault()
                const newIngredient = ingredientsInput.trim()
                // validation
                newIngredient
                  && !ingredients.includes(newIngredient) 
                  && setIngredients(prev => [...prev, newIngredient])
                setIngredientsInput("")
              }}
            >
              add
            </button>
          </div>
          <div className={`${darkTheme ? 'text-white' : 'text-gray-400'}`}>Current ingredients: {ingredients.join(', ')}</div>
        </div>
        <div className='mb-4'>
          <Label text="Recipe Method:"/>
          <FormField
            type="textarea"
            disabled={loading}
            value={method}
            required={true}
            onChange={e => setMethod(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <Label text="Cooking Time (minutes):"/>
          <FormField
            type="number"
            disabled={loading}
            value={cookingTime}
            required={true}
            onChange={e => setCookingTime(e.target.value)}
          />
        </div>
        <div className='text-center'>
          <button
            disabled={loading}
            className={`${colorScheme[colorTheme]['bg']} ${colorScheme[colorTheme]['hover']} duration-300 inline-flex gap-2 items-center py-1 px-4 rounded text-white`}
          >
            <span>submit</span>
            {loading &&
              <span className='spin'>
                <AiOutlineLoading3Quarters />
              </span>
            }
          </button>
        </div>
      </form>
    </div>
  )
}

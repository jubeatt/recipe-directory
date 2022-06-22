import { useState } from "react"
import { db } from "../firebase/config"

export function useForm (values) {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const [title, setTitle] = useState(() => values?.title || "")
  const [ingredientsInput, setIngredientsInput] = useState("")
  const [method, setMethod] = useState(() => values?.method || "")
  const [cookingTime, setCookingTime] = useState(() => parseInt(values?.cookingTime, 10) || "")
  const [ingredients, setIngredients] = useState(() => values?.ingredients || []) 

  const updateTitle = (e) => setTitle(e.target.value)
  const updateIngredientsInput = (e) => setIngredientsInput(e.target.value)
  const updateMethod = (e) => setMethod(e.target.value)
  const updateCookingTime = (e) => setCookingTime(e.target.value)
  
  const addIngredientList = (e) => {
    e.preventDefault()
    const newIngredient = ingredientsInput.trim()
    // validation
    newIngredient
      && !ingredients.includes(newIngredient) 
      && setIngredients(prev => [...prev, newIngredient])
    setIngredientsInput("")
  }

  const resetState = () => {
    setTitle("")
    setIngredientsInput("")
    setMethod("")
    setCookingTime("")
    setLoading(false)
  }

  const updateRecipe = async (e, id) => {
    e.preventDefault()
    setLoading(true)
    await db.collection('recipes').doc(id).update({
        title,
        ingredients,
        method,
        cookingTime: cookingTime + ' minutes'
      })
      .then(() => {
        resetState()
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
        setError('Can not update this recipe')
        throw new Error(error.message)
      })
  }

  const addNewRecipe = async (e) => {
    e.preventDefault()
    const doc = {
      title,
      ingredients,
      method,
      cookingTime: cookingTime + ' minutes'
    }
    setLoading(true)
    await db.collection('recipes').add(doc)
      .then(() => {
        setLoading(false)
        resetState()
      })
      .catch(error => {
        setLoading(false)
        setError('Can not update this recipe')
        throw new Error(error.message)
      })
  }

  return {
    title,
    ingredientsInput,
    method,
    cookingTime,
    ingredients,
    error,
    loading,
    updateTitle,
    updateIngredientsInput,
    updateMethod,
    updateCookingTime,
    addNewRecipe,
    addIngredientList,
    updateRecipe,
    setError
  }
}
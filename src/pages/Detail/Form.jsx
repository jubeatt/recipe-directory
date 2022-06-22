import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { BsExclamationCircleFill } from 'react-icons/bs'
import FormField from '../../components/FormField'
import Label from '../../components/Label'
import Modal from '../../components/Modal'
import { useForm } from '../../hooks/useForm'
import { useTheme } from '../../hooks/useTheme'
import { colorScheme } from '../../theme/colorScheme'

export default function ModalForm({ id, formData, onClose }) {
  const { colorTheme } = useTheme()
  const {
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
    addIngredientList,
    updateRecipe,
  } = useForm(formData)

  const handleSubmit = (e) => {
    updateRecipe(e, id)
      .then(() => onClose())
      .catch(errorMessage => console.log(errorMessage))
  }

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <h2 className="text-slate-700 text-center font-bold text-4xl mb-4">Update Recipe</h2>
        {error && (
          <div className='text-rose-700 bg-rose-100 text-xl p-2 rounded flex gap-2 items-center'>
            <BsExclamationCircleFill /> {error}
          </div>
        )}
        <div className='my-4'>
          <Label text="Recipe Title:"/>
          <FormField
            border={true}
            type="text"
            disabled={loading}
            value={title}
            required={true}
            onChange={updateTitle}
          />
        </div>
        <div className='mb-4'>
          <Label text="Recipe Ingredients:"/>
          <div className='flex gap-2 mb-1'>
            <FormField
              border={true}
              type="text"
              disabled={loading}
              value={ingredientsInput}
              onChange={updateIngredientsInput}
            />
            <button
              disabled={loading}
              className={`${colorScheme[colorTheme]['bg']} ${colorScheme[colorTheme]['hoverBg']} duration-300 py-1 px-4 rounded text-white`}
              onClick={addIngredientList}
            >
              Add
            </button>
          </div>
          <div className="text-gray-400">Current ingredients: {ingredients.join(', ')}</div>
        </div>
        <div className='mb-4'>
          <Label text="Recipe Method:"/>
          <FormField
            border={true}
            type="textarea"
            disabled={loading}
            value={method}
            required={true}
            onChange={updateMethod}
          />
        </div>
        <div className='mb-4'>
          <Label text="Cooking Time (minutes):"/>
          <FormField
            border={true}
            type="number"
            disabled={loading}
            value={cookingTime}
            required={true}
            onChange={updateCookingTime}
          />
        </div>
        <div className='text-center'>
          <button
            disabled={loading}
            className={`${colorScheme[colorTheme]['bg']} ${colorScheme[colorTheme]['hoverBg']} duration-300 inline-flex gap-2 items-center py-1 px-4 rounded text-white`}
          >
            <span>Save</span>
            {loading &&
              <span className='spin'>
                <AiOutlineLoading3Quarters />
              </span>
            }
          </button>
        </div>
      </form>
    </Modal>
  )
}

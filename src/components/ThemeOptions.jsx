import React from 'react'
import { BsSun, BsSunFill } from "react-icons/bs"
import { useTheme } from '../hooks/useTheme'
import Button from './Button'

export default function ThemeOptions() {
  const { darkTheme, changeDarkTheme, changeColorTheme } = useTheme()

  return (
    <div className='mt-4 mb-8'>
      <div className='container'>
        <div className='flex items-center justify-between'>
          <button 
            className='cursor-pointer' 
            onClick={() => darkTheme ? changeDarkTheme(false) : changeDarkTheme(true)
          }>
            {darkTheme ? <BsSunFill size={22} color="#e0e222" /> : <BsSun size={22} />}
          </button>
          <div className='flex items-center gap-3'>
            <Button color="purple" onClick={() => changeColorTheme('purple')} />
            <Button color="green" onClick={() => changeColorTheme('green')} />
            <Button color="red" onClick={() => changeColorTheme('red')}/>
          </div>
        </div>
      </div>
    </div>
  )
}

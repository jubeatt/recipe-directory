import React from 'react'
import { BsSun, BsSunFill } from "react-icons/bs";
import { colorScheme } from "../theme/colorScheme"
import { useTheme } from '../hooks/useTheme';

const Button = ({ color }) => {
  const { changeColorTheme } = useTheme()
  return (
    <button 
      className={`w-5 h-5 rounded-full border-0 ${colorScheme[color]['bg']}`}
      onClick={() => changeColorTheme(color)}
    ></button>
  )
}

export default function ThemeOptions() {
  const { darkTheme, changeDarkTheme } = useTheme()

  return (
    <div className='mt-4 mb-8'>
      <div className='container'>
        <div className='flex items-center justify-between'>
          <button 
            className='cursor-pointer' 
            onClick={() => darkTheme ? changeDarkTheme(false) : changeDarkTheme(true)
          }>
            {darkTheme ?<BsSunFill size={22} color="#e0e222" /> : <BsSun size={22} />}
          </button>
          <div className='flex items-center gap-3'>
            <Button color="purple" />
            <Button color="green" />
            <Button color="red" />
          </div>
        </div>
      </div>
    </div>
  )
}

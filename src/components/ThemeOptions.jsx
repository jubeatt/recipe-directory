import React, { useContext } from 'react'
import { ThemeContext } from "../store/ThemeContext"
import { BsSun, BsSunFill } from "react-icons/bs";
import { colorScheme } from "../theme/colorScheme"

const Button = ({ color }) => {
  const { setColorTheme } = useContext(ThemeContext)
  return (
    <button 
      className={`w-5 h-5 rounded-full border-0 ${colorScheme[color]['bg']}`}
      onClick={() => setColorTheme(color)}
    ></button>
  )
}

export default function ThemeOptions() {
  const {darkTheme, setDarkTheme} = useContext(ThemeContext)

  return (
    <div className='mt-4 mb-8'>
      <div className='container'>
        <div className='flex items-center justify-between'>
          <button 
            className='cursor-pointer' 
            onClick={() => darkTheme ? setDarkTheme(false) : setDarkTheme(true)
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

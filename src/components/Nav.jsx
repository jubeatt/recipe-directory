import React, { useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { colorScheme } from "../theme/colorScheme"
import { useTheme } from '../hooks/useTheme'
import { useSearch } from '../hooks/useSearch'

export default function Nav() {
  const location = useLocation()
  const { colorTheme } = useTheme()
  const { searchBy } = useSearch()
  const delay = useRef(400)
  const timer = useRef(null)
  const inputRef = useRef()
  // debounce
  const handleSearch = () => {
    timer.current && clearTimeout(timer.current)
    timer.current = setTimeout(() => searchBy(inputRef.current.value), delay.current)
  }

  return (
    <div className={`${colorScheme[colorTheme]['bg']} py-4 duration-300`}>
      <div className='container md:flex md:items-center'>
        <Link to="/" className='block text-white text-center font-bold text-2xl md:mr-auto mb-2 md:mb-0'>Cook Ninja</Link>
        <div className='md:flex md:items-center'>
          <div className='text-center mb-4 md:mr-4 md:mb-0'>
            <label>
              <span className='block text-white mr-2 font-medium md:inline-block'>Search:</span>
              <input 
                className='text-slate-700 border-0 rounded px-2 py-1 focus:outline-slate-700'
                type="text"
                ref={inputRef}
                disabled={location.pathname !== '/'}
                onChange={handleSearch}
              />
            </label>
          </div>
          <div className='text-center'>
            <Link to="/create" className={`${colorScheme[colorTheme]['hoverText']} inline-block border border-white font-medium text-white bg-transparent rounded px-1 py-2 hover:bg-white duration-300`}>Create Recipe</Link>
          </div>
        </div>
      </div>
    </div> 
  )
}

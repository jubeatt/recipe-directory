import './ThemeSelector.css'
import React from 'react'
import { useTheme } from "hooks/useTheme"
import Sun from "icons/Sun.svg"

const colors = ['#58249c', '#249c6b', '#b70233']

export default function ThemeSelector() {
  const { mode, changeTheme, changeMode } = useTheme()
  return (
    <div className='theme-selector'>
      <div
        className='mode-toggle'
        onClick={() => changeMode(mode === 'light' ? 'dark' : 'light')}
      >
        <img 
          src={Sun}
          alt="change mode icon"
          style={{ filter: mode === 'light' ? 'invert(0)' : 'invert(1)' }}
        />
      </div>
      <div className='theme-buttons'>
        {colors.map(color => (
          <div
            key={color}
            style={{ background: color }}
            onClick={() => changeTheme(color)}
          />
        ))}
      </div>
    </div>
  )
}

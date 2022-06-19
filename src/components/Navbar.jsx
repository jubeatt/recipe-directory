import "./Navbar.css"
import React from 'react'
import { Link } from 'react-router-dom'
import Searchbar from "./Searchbar"
import { useTheme } from "hooks/useTheme"

export default function Navbar() {
  const { color } = useTheme() 

  return (
    <div className='navbar' style={{ background: color }}>
      <nav>
        <Link className="brand" to="/">
          <h1>Cook Ninja</h1> 
        </Link>
        <Searchbar />
        <Link to="/create">
          create
        </Link>
      </nav>
    </div>
  )
}

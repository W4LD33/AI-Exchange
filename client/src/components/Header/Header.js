import React from 'react'
import './header.css'

const Header = () => {
  return (
    <div className='header-container'>
        <h1 className='header-logo'>AI Ethics and Governance</h1>
        <input className='header-search' placeholder='Search...'></input>
        
    </div>
  )
}

export default Header

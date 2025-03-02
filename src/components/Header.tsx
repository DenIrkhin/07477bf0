import React from 'react'
import './header.css'
import aircallLogo from '../assets/aircall-logo.svg'

export interface HeaderProps {
  title?: string
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header>
      <img
        src={aircallLogo}
        alt="Aircall Logo"
      />
      {title && <h1>{title}</h1>}
    </header>
  )
}

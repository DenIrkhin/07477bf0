import React, { ReactNode } from 'react'
import './header.css'
import aircallLogo from '../assets/aircall-logo.svg'

export interface HeaderProps {
  title?: string
  children?: ReactNode
}

export const Header: React.FC<HeaderProps> = ({ title, children }) => {
  return (
    <header>
      <div className="header-left">
        <img
          src={aircallLogo}
          alt="aircallLogo"
        />
        {title && <h1>{title}</h1>}
      </div>
      {children && <div className="header-right">{children}</div>}
    </header>
  )
}

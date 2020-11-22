import React from 'react'
import button from './Button.module.css'

const Button = ({ onClick, children, type, disabled }) => (
  <button
    className={`${button.button} ${button[type]}`}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
)

export default Button

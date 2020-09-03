import React from 'react';
import button from './Button.module.css';

const Button = ({ onClick, children, type }) => (
  <button className={`${button.button} ${button[type]}`}
    onClick={onClick}>
    {children}
  </button>
);

export default Button;
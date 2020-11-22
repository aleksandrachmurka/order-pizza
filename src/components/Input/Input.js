import React from 'react'
import styles from './Input.module.css'

const Input = (props) => {
  let element
  const classes = `${styles.element} ${
    !props.valid && props.touched && styles.invalid
  }`

  switch (props.type) {
    case 'select':
      element = (
        <select className={classes} {...props} onChange={props.onChange}>
          {props.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )
      break
    default:
      element = (
        <input className={classes} {...props} onChange={props.onChange} />
      )
  }

  return (
    <div className={styles.input}>
      <label className={styles.label} htmlFor={props.id}>
        {props.label}
      </label>
      {element}
    </div>
  )
}

export default Input

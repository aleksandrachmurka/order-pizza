import React from 'react'
import styles from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'

const Modal = ({ show, close, children }) => (
  //shouldComponentUpdate - show, children
  <>
    <Backdrop show={show} close={close} />
    <div className={`${styles.modal} ${show ? styles.show : styles.hide}`}>
      {children}
    </div>
  </>
)

export default Modal

import React from 'react'
import styles from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'

const Modal = ({ show, close, children }) => (
  <>
    <Backdrop show={show} close={close} />
    <div className={`${styles.modal} ${show ? styles.show : styles.hide}`}>
      {children}
    </div>
  </>
)

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.show !== prevProps.show || nextProps.close !== prevProps.close
)

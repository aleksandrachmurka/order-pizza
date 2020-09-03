import React from 'react';
import modal from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = ({ show, close, children }) => (
  <>
    <Backdrop show={show} close={close} />
    <div className={modal.modal}
      style={{
        transform: show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: show ? '1' : '0'
      }}
    >
      {children}
    </div>
  </>
);

export default Modal;
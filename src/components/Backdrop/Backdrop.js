import React from 'react';
import backdrop from './Backdrop.module.css';

const Backdrop = ({ show, close }) => (
  show && <div className={backdrop.backdrop} onClick={close}></div>
);

export default Backdrop;
import React from 'react';
import Modal from '../components/Modal/Modal';

const withError = (WrappedComponent, axios) => {
  return props => {
    return (
      <>
        <Modal>
          Something went wrong
        </Modal>
        <WrappedComponent {...props} />
      </>
    );
  }
}

export default withError;
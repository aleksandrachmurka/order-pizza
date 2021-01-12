import React from 'react'
import useErrorHandler from '../hooks/useErrorHandler'
import Modal from '../components/Modal/Modal'

const withError = (WrappedComponent, axios) => {
  return (props) => {
    const { error, closeErrorModal } = useErrorHandler(axios)
    return (
      <>
        <Modal show={error} close={closeErrorModal}>
          {error && error.message}
        </Modal>
        <WrappedComponent {...props} />
      </>
    )
  }
}

export default withError

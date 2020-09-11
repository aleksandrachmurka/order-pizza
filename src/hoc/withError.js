import React, { Component } from 'react';
import Modal from '../components/Modal/Modal';

const withError = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });

      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({ error: error });
      });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    closeErrorModal = () => {
      this.setState({ error: null })
    }

    render() {
      return (
        <>
          <Modal show={this.state.error} close={this.closeErrorModal}>
            {this.state.error && this.state.error.message}
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  }
};

export default withError;
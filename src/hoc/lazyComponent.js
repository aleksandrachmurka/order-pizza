import React, { Component } from 'react'

const LazyComponent = (importComponent) => {
  return class extends Component {
    state = {
      component: null,
    }

    componentDidMount() {
      importComponent().then((c) => {
        this.setState({ component: c.default })
      })
    }

    render() {
      const Comp = this.state.component
      return Comp ? <Comp {...this.props} /> : null
    }
  }
}

export default LazyComponent

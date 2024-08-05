import React, { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.log(error)
    console.log(errorInfo)
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
    // You can log the error or send it to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      return <h5>Something went wrong.</h5>
    }

    return this.props.children
  }
}

export default ErrorBoundary

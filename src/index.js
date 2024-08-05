import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'core-js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'

import App from './App'
import store from './store'
import ErrorBoundary from './ErrorBoundary'
import EnquiryForm from './pages/EnquiryForm'

const root = createRoot(document.getElementById('root'))

const RootComponent = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 120000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <App />
        {isOpen && <EnquiryForm show={isOpen} setShow={setIsOpen} />}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <ToastContainer />
      </Provider>
    </ErrorBoundary>
  )
}

root.render(<RootComponent />)

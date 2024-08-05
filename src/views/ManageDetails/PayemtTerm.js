import React, { useEffect, useState } from 'react'
import { Button, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Editor from 'react-simple-wysiwyg'
import { MyAPI, MyError } from '../../MyAPI'

function PayemtTerm() {
  const [paymentTerm, setPaymentTerm] = useState('')
  const [paymentTermData, setPaymentTermData] = useState([])
  const [paymentTermId, setPaymentTermId] = useState('')
  const token = useSelector((state) => state.token)

  const fetchPaymentTerm = async () => {
    try {
      let res = await MyAPI.GET('/paymentTerm', token)
      let { success, message, error, paymentTerms } = res.data || res
      if (success) {
        setPaymentTermData(paymentTerms)
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  useEffect(() => {
    if (paymentTermData && paymentTermData.length > 0) {
      setPaymentTerm(paymentTermData[0].html)
      setPaymentTermId(paymentTermData[0]._id)
    }
  }, [paymentTermData])

  useEffect(() => {
    fetchPaymentTerm()
  }, [token])

  const handleAddPaymentTerm = async () => {
    try {
      let res = await MyAPI.POST('/paymentTerm', { html: paymentTerm }, token)
      let { success, message, error } = res.data || res
      console.log(res.data)
      if (success) {
        MyError.success(message)
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  const handleUpdatePaymentTerm = async () => {
    try {
      let res = await MyAPI.PUT(`/paymentTerm/${paymentTermId}`, { html: paymentTerm }, token)
      let { message, error, success } = res.data || res
      console.log(res.data)
      if (success) {
        fetchPaymentTerm()
        MyError.success(message)
      } else {
        MyError.error(message || error || 'API Error.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  return (
    <>
      <Col className="mb-2">
        <h6 className="poppins">Payment Term</h6>
      </Col>
      <Col md={12}>
        <Editor
          value={paymentTerm}
          onChange={(e) => setPaymentTerm(e.target.value)}
          containerProps={{
            style: {
              resize: 'vertical',
              minHeight: '60vh',
              marginInline: 'auto',
              fontSize: '0.8rem',
            },
          }}
        />
      </Col>
      <Col className="mt-2 mb-2">
        <Button
          onClick={paymentTermId ? handleUpdatePaymentTerm : handleAddPaymentTerm}
          variant="primary"
          size="sm"
        >
          save
        </Button>
      </Col>
    </>
  )
}

export default PayemtTerm

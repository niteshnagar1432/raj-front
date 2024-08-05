import React, { useEffect, useState } from 'react'
import { Button, Col } from 'react-bootstrap'
import Editor from 'react-simple-wysiwyg'
import { MyAPI, MyError } from '../../MyAPI'
import { useSelector } from 'react-redux'

function FAQ() {
  const [faqDetails, setFaqDetails] = useState('')
  const [faqId, setFaqId] = useState('')
  const [faqData, setFaqData] = useState([])
  const token = useSelector((state) => state.token)

  const fetchFAQ = async () => {
    try {
      let res = await MyAPI.GET(`/faq`, token)
      let { message, success, error, faqs } = res.data || res
      console.log(res.data)
      if (success) {
        setFaqData(faqs)
      } else {
        MyError.warn(message || error || 'API Error.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  useEffect(() => {
    if (faqData && faqData.length > 0) {
      setFaqDetails(faqData[0].html)
      setFaqId(faqData[0]._id)
    }
  }, [faqData])

  useEffect(() => {
    fetchFAQ()
  }, [token])

  const handleApiFAQ = async () => {
    if (!faqDetails) {
      return MyError.warn('Please Enter FAQ')
    }

    //new form data
    // const formData = new FormData()
    // formData.append('html', faqDetails)

    try {
      let res = await MyAPI.POST('/faq', { html: faqDetails }, token)
      let { message, error, success } = res.data || res
      console.log(res)
      if (success) {
        MyError.success(message)
      } else {
        MyError.error(message || error || 'API Error.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  const handleUpdateFAQ = async () => {
    try {
      let res = await MyAPI.PUT(`/faq/${faqId}`, { html: faqDetails }, token)
      let { message, error, success } = res.data || res
      console.log(res.data)
      if (success) {
        fetchFAQ()
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
        <h6 className="poppins">FAQ</h6>
      </Col>
      <Col md={12}>
        <Editor
          value={faqDetails}
          onChange={(e) => setFaqDetails(e.target.value)}
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
        <Button variant="primary" onClick={faqId ? handleUpdateFAQ : handleApiFAQ} size="sm">
          save
        </Button>
      </Col>
    </>
  )
}

export default FAQ

import React, { useEffect, useState } from 'react'
import { Button, Col } from 'react-bootstrap'
import Editor from 'react-simple-wysiwyg'
import { MyAPI, MyError } from '../../MyAPI'
import { useSelector } from 'react-redux'

function TermConditions() {
  const [termConditions, setTermCondition] = useState('')
  const [termConditionsData, setTermConditionData] = useState([])
  const [termConditionsId, setTermConditionId] = useState('')
  const token = useSelector((state) => state.token)

  const fetchTearmAndCondition = async () => {
    try {
      let res = await MyAPI.GET('/t&c', token)
      let { success, message, error, termAndConditions } = res.data || res
      console.log(res.data)
      if (success) {
        setTermConditionData(termAndConditions)
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  useEffect(() => {
    if (termConditionsData && termConditionsData.length > 0) {
      setTermCondition(termConditionsData[0].html)
      setTermConditionId(termConditionsData[0]._id)
    }
  }, [termConditionsData])

  useEffect(() => {
    fetchTearmAndCondition()
  }, [token])

  const handleAddTearmAndCondition = async () => {
    try {
      let res = await MyAPI.POST('/t&c', { html: termConditions }, token)
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

  const handleUpdateTermComdition = async () => {
    try {
      let res = await MyAPI.PUT(`/t&c/${termConditionsId}`, { html: termConditions }, token)
      let { message, error, success } = res.data || res
      console.log(res.data)
      if (success) {
        fetchTearmAndCondition()
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
        <h6 className="poppins">Term & Conditions</h6>
      </Col>
      <Col md={12}>
        <Editor
          value={termConditions}
          onChange={(e) => setTermCondition(e.target.value)}
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
          onClick={termConditionsId ? handleUpdateTermComdition : handleAddTearmAndCondition}
          variant="primary"
          size="sm"
        >
          save
        </Button>
      </Col>
    </>
  )
}

export default TermConditions

import React, { useEffect, useState } from 'react'
import { Button, Col } from 'react-bootstrap'
import Editor from 'react-simple-wysiwyg'
import { MyAPI, MyError } from '../../MyAPI'
import { useSelector } from 'react-redux'

function TravelEssentials() {
  const [travelEsen, setTravelEssen] = useState('')
  const [travelEsenData, setTravelEssenData] = useState([])
  const [travelEsenId, setTravelEssenId] = useState('')
  const token = useSelector((state) => state.token)

  const fetchTravelEssentials = async () => {
    try {
      let res = await MyAPI.GET('/travelEssentials', token)
      let { success, message, error, travelEssentials } = res.data || res
      console.log(res.data)
      if (success) {
        setTravelEssenData(travelEssentials)
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  useEffect(() => {
    if (travelEsenData && travelEsenData.length > 0) {
      setTravelEssen(travelEsenData[0].html)
      setTravelEssenId(travelEsenData[0]._id)
    }
  }, [travelEsenData])

  useEffect(() => {
    fetchTravelEssentials()
  }, [token])

  const handleAddTravelEssentials = async () => {
    try {
      let res = await MyAPI.POST('/travelEssentials', { html: travelEsen }, token)
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

  const handleUpdateTravelEssential = async () => {
    try {
      let res = await MyAPI.PUT(`/travelEssentials/${travelEsenId}`, { html: travelEsen }, token)
      let { message, error, success } = res.data || res
      console.log(res.data)
      if (success) {
        fetchTravelEssentials()
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
        <h6 className="poppins">Travel Essentials</h6>
      </Col>
      <Col md={12}>
        <Editor
          value={travelEsen}
          onChange={(e) => setTravelEssen(e.target.value)}
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
          onClick={travelEsenId ? handleUpdateTravelEssential : handleAddTravelEssentials}
          variant="primary"
          size="sm"
        >
          save
        </Button>
      </Col>
    </>
  )
}

export default TravelEssentials

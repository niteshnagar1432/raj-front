import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Pagination, Row, Table } from 'react-bootstrap'
import { CiEdit } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MyAPI, MyError } from '../../MyAPI'

function AllCar() {
  const navigate = useNavigate()
  const [cars, setCars] = useState([])
  let token = useSelector((state) => state.token)

  const fetchData = async () => {
    if (token) {
      try {
        let res = await MyAPI.GET('/admin/car', token)
        let { success, message, error, cars } = res.data || res
        if (success) {
          setCars(cars)
        } else {
          MyError.error(message || error)
        }
      } catch (error) {
        console.error('Error fetching car data:', error)
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [token])

  const handleDelete = async (id) => {
    try {
      let res = await MyAPI.DELETE(`/admin/car/${id}`, token)
      let { success, error, message } = res.data || res
      if (success) {
        fetchData()
        MyError.success(message)
      } else {
        MyError.error(message || error)
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  const UpdateStatus = async (id, status) => {
    try {
      //new form data
      let formData = new FormData()
      formData.append('status', status)
      let res = await MyAPI.PUT(`/admin/car/${id}`, formData, token)
      let { success, error, message } = res.data || res
      if (success) {
        fetchData()
      } else {
        MyError.error(message || error)
      }
      console.log(res)
    } catch (error) {
      MyError.error(error.message)
    }
  }

  return (
    <>
      <Row className="d-flex align-items-center justify-content-end mb-3">
        <Col md={4}>
          <Form.Group>
            <Form.Control className="input-border" type="text" placeholder="Search" />
          </Form.Group>
        </Col>
        {/* <Button variant="primary">Filter</Button> */}
      </Row>
      <Table striped bordered responsive hover className="text-dark">
        <thead>
          <tr>
            <th className="text-dark">S.No</th>
            <th className="text-dark">Car Name</th>
            <th className="text-dark">Car Model</th>
            <th className="text-dark">Car Capacity</th>
            <th className="text-dark">Car Price</th>
            <th className="text-dark">Status</th>
            {/* <th className="text-dark">Price Title</th> */}
            <th className="text-dark">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars &&
            cars.length > 0 &&
            cars.map((item, index) => (
              <tr key={index}>
                <td className="text-dark">{index + 1}</td>
                <td className="text-dark">{item.carName}</td>
                <td className="text-dark">{item.carModel}</td>
                <td className="text-dark">{item.carCapacity}</td>
                <td className="text-dark">{item.carPrice}</td>
                <td className="text-dark">
                  <Form.Check
                    type="switch"
                    onChange={() =>
                      UpdateStatus(item._id, item.status === 'inactive' ? 'active' : 'inactive')
                    }
                    checked={item.status === 'inactive' ? false : true}
                    id="custom-switch"
                  />
                </td>
                {/* <td className="text-dark">{item.priceTitle}</td> */}
                <td className="d-flex gap-2 text-dark">
                  <Button
                    onClick={() => navigate(`/admin/car/${item._id}/edit`)}
                    variant="warning"
                    className="mr-2"
                  >
                    <CiEdit size={22} />
                  </Button>
                  <Button onClick={() => handleDelete(item._id)} variant="danger">
                    <MdDelete size={22} />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.Prev />
          <Pagination.Item active>{1}</Pagination.Item>
          <Pagination.Item>{2}</Pagination.Item>
          <Pagination.Item>{3}</Pagination.Item>
          <Pagination.Next />
        </Pagination>
      </div>
    </>
  )
}

export default AllCar

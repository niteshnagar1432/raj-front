import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Pagination, Row, Table } from 'react-bootstrap'
import { FaEye, FaSearch, FaSwatchbook } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { MyAPI, MyError } from '../../MyAPI'

function AllClients() {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [clients, setClients] = useState([]) // Initialize state for client data

  const fetchClients = async () => {
    try {
      let res = await MyAPI.GET('/users')
      let { success, message, error, users } = res.data || res
      console.log(res.data)
      if (success) {
        setClients(users)
      } else {
        MyError.error(message || error || 'Server Error Please try again later')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])

  const handleShowModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <Row>
        <Col md={12}>
          <Container className="bg-white py-3 px-2 rounded-3">
            <Row className="mb-3 justify-content-between">
              <Col md={8} className="d-flex align-items-center gap-2">
                show
                <Col md={2}>
                  <Form.Select>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                  </Form.Select>
                </Col>
                entries
                <Col md={4} className="d-flex align-items-center">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaSearch />
                    </span>
                    <Form.Control type="text" placeholder="Search" />
                  </div>
                </Col>
              </Col>
            </Row>
            <Table className="mt-3" striped responsive hover>
              <thead>
                <tr>
                  <th className="text-center text-dark">#</th>
                  <th className="text-center text-dark">Customer Id</th>
                  <th className="text-center text-dark">Full Name</th>
                  <th className="text-center text-dark">Email</th>
                  <th className="text-center text-dark">Phone</th>
                  <th className="text-center text-dark">DOB</th>
                  <th className="text-center text-dark">Registered Date</th>
                  <th className="text-center text-dark">Status</th>
                  <th className="text-center text-dark">Action</th>
                  <th className="text-center text-dark">Booking</th>
                </tr>
              </thead>
              <tbody>
                {clients &&
                  clients.length > 0 &&
                  clients.map((client, index) => (
                    <tr key={index}>
                      <td className="text-center text-dark">{index + 1}</td>
                      <td className="text-center text-dark">{client._id ?? 'NA'}</td>
                      <td className="text-center text-dark">{client.userName ?? 'NA'}</td>
                      <td className="text-center text-dark">{client.email ?? 'NA'}</td>
                      <td className="text-center text-dark">{client.phone ?? 'NA'}</td>
                      <td className="text-center text-dark">{client.dob ?? ''}</td>
                      <td className="text-center text-dark">{client.registeredDate ?? 'NA'}</td>
                      <td className="text-center text-dark">
                        <div
                          className="px-1 py-1 rounded-5"
                          style={{ color: '#1F9254', backgroundColor: '#EBF9F1' }}
                        >
                          {client.status ?? 'NA'}
                        </div>
                      </td>
                      <td className="text-center cursor-pointer">
                        <FaEye onClick={handleShowModal} size={22} color="#0984E3" />
                      </td>
                      <td className="text-center cursor-pointer">
                        <FaSwatchbook
                          onClick={() => navigate(`/admin/client/${client._id}/bookings`)}
                          size={22}
                          color="#0984E3"
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <div className="d-flex justify-content-center">
              <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Item>{3}</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
              </Pagination>
            </div>
          </Container>
        </Col>
      </Row>
      <Modal show={showModal} className={showModal ? '' : 'd-none'} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Client Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col md={12}>
            <b>Client Id :</b> Client Unique Id
          </Col>
          <Col md={12}>
            <b>Full Name :</b> John Smith
          </Col>
          <Col md={12}>
            <b>Email :</b> john-smith@email.com
          </Col>
          <Col md={12}>
            <b>Phone :</b> +1 1234567890
          </Col>
          <Col md={12}>
            <b>Username :</b> @john-smith2020
          </Col>
          <Col md={12}>
            <b>Company Name :</b> Company Name
          </Col>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => navigate('/admin/client/123/edit')}>
            Edit
          </Button>
          <Button variant="danger" className="text-white" onClick={handleCloseModal}>
            Delete
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AllClients

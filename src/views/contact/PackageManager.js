import React, { useState } from 'react'
import { Container, Alert, Table, Button, Form, Row, Col, Card } from 'react-bootstrap'
import { CiEdit } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const PackageManager = () => {
  const maxPackages = 3
  const navigate = useNavigate()
  const [receivedMessages, setReceivedMessages] = useState([
    {
      packageId: 2,
      message: 'Please change the destination to Tokyo.',
      dateTime: '2024-07-18 10:30 AM',
    },
  ])
  const [packages, setPackages] = useState([
    { id: 1, destination: 'Paris', createdAt: '2024-07-15' },
    { id: 2, destination: 'London', createdAt: '2024-07-16' },
  ])

  const handleAddPackage = () => {
    if (packages.length < maxPackages) {
      const newId = packages.length ? Math.max(...packages.map((pkg) => pkg.id)) + 1 : 1
      setPackages([
        ...packages,
        {
          destination: 'New Destination',
          id: newId,
          createdAt: new Date().toISOString().split('T')[0],
        },
      ])
    }
  }

  const handleDelete = (id) => {
    setPackages(packages.filter((pkg) => pkg.id !== id))
  }

  const handleEdit = (id) => {
    console.log(`Edit package with id: ${id}`)
  }

  return (
    <Container>
      <Col className="d-flex align-items-center justify-content-between">
        <h4 className="poppins">Package Manager</h4>
        <Button variant="primary" onClick={() => navigate('/admin/package/embed')} className="mb-3">
          Add Package
        </Button>
      </Col>

      {packages.length >= maxPackages && (
        <Alert variant="warning">Each inquiry can create a maximum of 3 packages.</Alert>
      )}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="text-dark">#</th>
            <th className="text-dark">Package ID</th>
            <th className="text-dark">Destination</th>
            <th className="text-dark">Created At</th>
            <th className="text-dark">Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg, index) => (
            <tr key={pkg.id}>
              <td className="text-dark">{index + 1}</td>
              <td className="text-dark">{pkg.id}</td>
              <td className="text-dark">{pkg.destination}</td>
              <td className="text-dark">{pkg.createdAt}</td>
              <td className="text-dark">
                <Button variant="primary" onClick={() => handleEdit(pkg.id)}>
                  <CiEdit size={22} />
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(pkg.id)}>
                  <MdDelete size={22} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Row className="mt-4">
        <Col md={12}>
          <h5 className="poppins">Received Modification Messages</h5>
          {receivedMessages.length > 0 ? (
            receivedMessages.map((msg, index) => (
              <Card key={index} className="mb-3">
                <Card.Header className="d-flex justify-content-between">
                  <div className="text-dark">Package ID: {msg.packageId}</div>
                  <div className="text-dark">{msg.dateTime}</div>
                </Card.Header>
                <Card.Body>
                  <Card.Text className="text-dark">{msg.message}</Card.Text>
                </Card.Body>
              </Card>
            ))
          ) : (
            <Card className="mb-3">
              <Card.Body>
                <Card.Text className="text-dark">No messages received</Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default PackageManager

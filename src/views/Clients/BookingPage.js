import React from 'react'
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap'

function BookingPage() {
  // Sample client details
  const clientDetails = {
    name: 'John Doe',
    email: 'john@example.com',
    userId: '123456',
    registeredDate: '01 Jan 2021',
    dob: '15 Aug 1985',
    address: '123 Main St, City, Country',
    maritalStatus: 'Married',
    anniversaryDate: '12 Dec 2010',
  }

  // Sample car booking data
  const carBookings = [
    {
      carName: 'Toyota',
      carModel: 'Corolla',
      duration: '3 days',
      date: '12 Jan 2023',
      amount: '$100',
    },
    { carName: 'Honda', carModel: 'Civic', duration: '2 days', date: '12 Jan 2023', amount: '$80' },
    // Add more booking data as needed
  ]

  // Sample package booking data
  const packageBookings = [
    { packageName: 'Beach Vacation', destination: 'Maldives', date: '15 Feb 2023', amount: '$500' },
    { packageName: 'Mountain Trek', destination: 'Himalayas', date: '20 Mar 2023', amount: '$300' },
    // Add more package booking data as needed
  ]

  return (
    <Container>
      {/* Client details */}
      <Row>
        <Col>
          <Card>
            <Card.Header className="text-dark">Client Details</Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Card.Title className="text-dark">{clientDetails.name}</Card.Title>
                  <Card.Text className="text-dark">
                    <strong>User ID:</strong> {clientDetails.userId}
                    <br />
                    <strong>Email:</strong> {clientDetails.email}
                    <br />
                    <strong>Registered Date:</strong> {clientDetails.registeredDate}
                  </Card.Text>
                </Col>
                <Col md={6}>
                  <Card.Text className="text-dark">
                    <strong>DOB:</strong> {clientDetails.dob}
                    <br />
                    <strong>Marital Status:</strong> {clientDetails.maritalStatus}
                    <br />
                    {clientDetails.maritalStatus === 'Married' && (
                      <>
                        <strong>Anniversary Date:</strong> {clientDetails.anniversaryDate}
                      </>
                    )}
                  </Card.Text>
                </Col>
                <Col md={12}>
                  <br />
                  <Card.Text className="text-dark">
                    <strong>Address:</strong> {clientDetails.address}
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Car booking details */}
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Header className="text-dark">Car Booking Details</Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th className="text-dark">Car Name</th>
                    <th className="text-dark">Car Model</th>
                    <th className="text-dark">Duration</th>
                    <th className="text-dark">Date</th>
                    <th className="text-dark">Amount</th>
                    <th className="text-dark">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {carBookings.map((booking, index) => (
                    <tr key={index}>
                      <td className="text-dark">{booking.carName}</td>
                      <td className="text-dark">{booking.carModel}</td>
                      <td className="text-dark">{booking.duration}</td>
                      <td className="text-dark">{booking.date}</td>
                      <td className="text-dark">{booking.amount}</td>
                      <td className="text-dark">
                        <Button variant="info" size="sm" className="me-2">
                          View
                        </Button>
                        <Button variant="danger" size="sm">
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Package booking details */}
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Header className="text-dark">Package Booking Details</Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th className="text-dark">Package Name</th>
                    <th className="text-dark">Destination</th>
                    <th className="text-dark">Date</th>
                    <th className="text-dark">Amount</th>
                    <th className="text-dark">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {packageBookings.map((booking, index) => (
                    <tr key={index}>
                      <td className="text-dark">{booking.packageName}</td>
                      <td className="text-dark">{booking.destination}</td>
                      <td className="text-dark">{booking.date}</td>
                      <td className="text-dark">{booking.amount}</td>
                      <td className="text-dark">
                        <Button variant="info" size="sm" className="me-2">
                          View
                        </Button>
                        <Button variant="danger" size="sm">
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default BookingPage

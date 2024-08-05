import React, { useState } from 'react'
import { Table, Button, Badge, Container, Form, Pagination, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaEye } from 'react-icons/fa'

const bookingsData = [
  { id: '1', packageName: 'Holiday Package A', bookingDate: '2023-07-01', status: 'Confirmed' },
  { id: '2', packageName: 'Adventure Package B', bookingDate: '2023-06-25', status: 'Pending' },
  { id: '3', packageName: 'Relaxation Package C', bookingDate: '2023-06-20', status: 'Cancelled' },
  { id: '4', packageName: 'City Tour Package', bookingDate: '2023-06-15', status: 'Confirmed' },
  { id: '5', packageName: 'Beach Getaway Package', bookingDate: '2023-06-10', status: 'Pending' },
  {
    id: '6',
    packageName: 'Mountain Trekking Package',
    bookingDate: '2023-06-05',
    status: 'Confirmed',
  },
  { id: '7', packageName: 'Cruise Package', bookingDate: '2023-06-01', status: 'Pending' },
  { id: '8', packageName: 'Safari Package', bookingDate: '2023-05-28', status: 'Cancelled' },
  { id: '9', packageName: 'Spa Retreat Package', bookingDate: '2023-05-25', status: 'Confirmed' },
  {
    id: '10',
    packageName: 'Historical Tour Package',
    bookingDate: '2023-05-20',
    status: 'Pending',
  },
  { id: '11', packageName: 'Honeymoon Package', bookingDate: '2023-05-15', status: 'Confirmed' },
]

const pageSize = 10 // Number of items per page

function MyBookings() {
  const [bookings, setBookings] = useState(bookingsData)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // Filtered and paginated data
  const filteredBookings = bookings.filter(
    (booking) =>
      booking.id.includes(searchTerm) ||
      booking.packageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bookingDate.includes(searchTerm) ||
      booking.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalItems = filteredBookings.length
  const totalPages = Math.ceil(totalItems / pageSize)

  // Pagination logic
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  )

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="poppins">Your Bookings</h5>
        <Col md={3}>
          <Form.Control
            type="text"
            className="input-border"
            placeholder="Search by Booking ID, Package Name, Date, Status"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th className="text-dark">S.No</th>
            <th className="text-dark">Booking ID</th>
            <th className="text-dark">Package Name</th>
            <th className="text-dark">Booking Date</th>
            <th className="text-dark">Status</th>
            <th className="text-dark">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedBookings.map((booking, index) => (
            <tr key={booking.id}>
              <td className="text-dark">{(currentPage - 1) * pageSize + index + 1}</td>
              <td className="text-dark">Booking-{booking.id}</td>
              <td className="text-dark">{booking.packageName}</td>
              <td className="text-dark">{booking.bookingDate}</td>
              <td className="text-dark">
                <Badge
                  bg={
                    booking.status === 'Confirmed'
                      ? 'success'
                      : booking.status === 'Pending'
                        ? 'warning'
                        : 'danger'
                  }
                >
                  {booking.status}
                </Badge>
              </td>
              <td>
                <Button variant="primary">
                  {' '}
                  <FaEye size={22} />{' '}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-center mb-3">
        <Pagination>
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </Container>
  )
}

export default MyBookings

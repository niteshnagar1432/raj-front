import React, { useEffect, useState } from 'react'
import { Table, Form, Button, Pagination, Col, Row } from 'react-bootstrap'
import { CiEdit } from 'react-icons/ci'
import { FaEye } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { MyAPI, MyError } from '../../MyAPI'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'

function Rajasthan() {
  const navigate = useNavigate()
  const token = useSelector((state) => state.token)

  const [packages, setPackages] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 10

  const getAllPackages = async () => {
    try {
      let res = await MyAPI.GET('/admin/package', token)
      let { success, packages, message, error } = res.data || res
      if (success) {
        setPackages(packages)
      } else {
        MyError.error(message || error || 'API Error.')
      }
      console.log(res.data)
    } catch (error) {
      MyError.error(error.message)
    }
  }

  useEffect(() => {
    getAllPackages()
  }, [])

  const deletePackage = async (id) => {
    try {
      let res = await MyAPI.DELETE(`/admin/package/${id}`, token)
      let { success, message, error } = res.data || res
      if (success) {
        getAllPackages()
        MyError.success(message)
      } else {
        MyError.error(message || error || 'API Error.')
      }
      console.log(res)
    } catch (error) {
      MyError.error(error.message)
    }
  }

  const updatePackageStatus = async (id, status) => {
    try {
      let res = await MyAPI.PUT(`/admin/rajasthani/package`, { packageId: id, status }, token)
      let { success, message, error } = res.data || res
      if (success) {
        getAllPackages()
        MyError.success('Status Updated.')
      } else {
        MyError.error(message || error || 'API Error.')
      }
      console.log(res)
    } catch (error) {
      MyError.error(error.message)
    }
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const filteredPackages = packages.filter((pkg) => {
    const dateFormatted = format(new Date(pkg.createdAt), 'yyyy-MM-dd')
    return (
      pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.destination.some((d) => d.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      pkg.tripType.some((t) => t.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      pkg.costOptions.totalPrice.toString().includes(searchTerm.toLowerCase()) ||
      pkg.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dateFormatted.includes(searchTerm.toLowerCase())
    )
  })

  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
  const currentRecords = filteredPackages.slice(indexOfFirstRecord, indexOfLastRecord)
  const totalPages = Math.ceil(filteredPackages.length / recordsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div>
      <Row className="d-flex align-items-center justify-content-end mb-3">
        <Col md={4}>
          <h5>Best Tour Packages</h5>
        </Col>
        <Col md={4}>&nbsp;</Col>
        <Col md={4}>
          <Form.Group>
            <Form.Control
              className="input-border"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Table striped bordered hover className="mb-3">
        <thead>
          <tr>
            <th className="text-dark">S.No</th>
            <th className="text-dark">Title</th>
            <th className="text-dark">Destination</th>
            <th className="text-dark">Trip Type</th>
            <th className="text-dark">Price</th>
            <th className="text-dark">Status</th>
            <th className="text-dark">Date</th>
            <th className="text-dark">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.reverse().map((item, index) => (
            <tr key={index}>
              <td className="text-dark">{indexOfFirstRecord + index + 1}</td>
              <td className="text-dark">{item.title}</td>
              <td className="text-dark">
                {item.destination.map((d, i) => (
                  <span key={i}>
                    {d.name}
                    {i < item.destination.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </td>
              <td className="text-dark">
                {item.tripType.map((t, i) => (
                  <span key={i}>
                    {t.name}
                    {i < item.tripType.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </td>
              <td className="text-dark">{item.costOptions.totalPrice}</td>
              <td className="text-dark">
                <Form.Check
                  checked={item.isRajasthani}
                  onClick={() => updatePackageStatus(item._id, !item.isRajasthani)}
                  type="switch"
                  id="custom-switch"
                />
              </td>
              <td className="text-dark">{format(new Date(item.createdAt), 'yyyy-MM-dd')}</td>
              <td className="d-flex gap-2 text-dark">
                <Button variant="secondary">
                  <FaEye onClick={() => navigate(`/package/${item._id}`)} size={22} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-center mb-3">
        <Pagination>
          <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </div>
  )
}

export default Rajasthan

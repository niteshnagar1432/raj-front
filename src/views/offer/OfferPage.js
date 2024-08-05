import React, { useEffect, useState } from 'react'
import {
  Table,
  Form,
  Button,
  Pagination,
  Col,
  Row,
  InputGroup,
  FormControl,
  Badge,
} from 'react-bootstrap'
import { CiEdit } from 'react-icons/ci'
import { FaEye } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { MyAPI, MyError } from '../../MyAPI'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'

function OfferPage() {
  const navigate = useNavigate()
  const token = useSelector((state) => state.token)

  const [packages, setPackages] = useState([])
  const [selectedPackages, setSelectedPackages] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [discount, setDiscount] = useState('')
  const [discountType, setDiscountType] = useState('percentage')
  const recordsPerPage = 10

  const getAllPackages = async () => {
    try {
      let res = await MyAPI.GET('/admin/offer/packages?isOffered=true', token)
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handleSelectPackage = (e, packageId) => {
    if (e.target.checked) {
      setSelectedPackages([...selectedPackages, packageId])
    } else {
      setSelectedPackages(selectedPackages.filter((id) => id !== packageId))
    }
  }

  const removeOffer = async (delete_id) => {
    try {
      let res = await MyAPI.POST('/admin/offer/remove', { packageIds: [`${delete_id}`] }, token)
      let { success, message, error } = res.data || res
      if (success) {
        getAllPackages()
        MyError.success('Offer Removed Successfully.')
      } else {
        MyError.error(message || error || 'API Error.')
      }
      console.log(res)
    } catch (error) {
      MyError.error(error.message)
    }
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

  const calculateDiscountedPrice = (discountType, actualPrice, discountValue) => {
    if (discountType === 'percentage') {
      return actualPrice - actualPrice * (discountValue / 100)
    } else if (discountType === 'price') {
      return actualPrice - discountValue
    } else {
      throw new Error('Invalid discount type')
    }
  }

  return (
    <div>
      <Row className="d-flex align-items-center justify-content-end mb-3">
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

      {/* <Row className="mb-3">
        <Col md={6} className="d-flex">
          <InputGroup className="d-flex">
            <FormControl
              placeholder="Discount"
              aria-label="Discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
            <Form.Select
              aria-label="Discount type"
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
            </Form.Select>
            <Button onClick={applyDiscount}>Apply Discount</Button>
          </InputGroup>
        </Col>
      </Row> */}

      <Table striped bordered hover responsive className="mb-3">
        <thead>
          <tr>
            {/* <th className="text-dark">
              <Form.Check type="checkbox" />
            </th> */}
            <th className="text-dark">S.No</th>
            <th className="text-dark">Title</th>
            <th className="text-dark">Destination</th>
            <th className="text-dark">Trip Type</th>
            <th className="text-dark">Price</th>
            <th className="text-dark">Discount</th>
            <th className="text-dark">Original Price</th>
            {/* <th className="text-dark">Status</th> */}
            <th className="text-dark">Date</th>
            <th className="text-dark">Action</th>
            {/* <th className="text-dark">Action</th> */}
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((item, index) => (
            <tr key={index}>
              {/* <td className="text-dark">
                <Form.Check
                  type="checkbox"
                  onChange={(e) => handleSelectPackage(e, item._id)}
                  checked={selectedPackages.includes(item._id)}
                />
              </td> */}
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
              <td className="text-dark">
                {item.fixedDeparture.type === true
                  ? item.fixedDeparture.tripleSharing.totalPrice
                  : item.costOptions.totalPrice}
              </td>
              <td className="text-dark">
                {item.offer.type === 'percentage' ? `${item.offer.value}%` : `${item.offer.value}`}
              </td>
              <td className="text-dark">
                {parseInt(
                  calculateDiscountedPrice(
                    item.offer.type,
                    item.fixedDeparture.type === true
                      ? item.fixedDeparture.tripleSharing.totalPrice
                      : item.costOptions.totalPrice,
                    item.offer.value,
                  ),
                )}
              </td>
              {/* <td className="text-dark">
                <Badge
                  bg={item.status === 'active' ? 'success' : 'secondary'}
                  className="cursor-pointer"
                  onClick={() => updatePackageStatus(item._id, item.status)}
                >
                  {item.status === 'active' ? 'Active' : 'Inactive'}
                </Badge>
              </td> */}
              <td className="text-dark">{format(new Date(item.createdAt), 'yyyy-MM-dd')}</td>
              <td className=" text-dark">
                <Button onClick={() => removeOffer(item._id)} size="sm" variant="danger">
                  <MdDelete size={18} />
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

export default OfferPage

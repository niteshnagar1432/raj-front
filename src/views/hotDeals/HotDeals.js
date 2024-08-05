/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import { Table, Form, Button, Pagination, Col, Row } from 'react-bootstrap'
import { CiEdit } from 'react-icons/ci'
import { FaEye } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { calculateDiscountedPrice, MyAPI, MyError } from '../../MyAPI'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'

function HotDeals() {
  const navigate = useNavigate()
  const token = useSelector((state) => state.token)

  const [packages, setPackages] = useState([])

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

  const updatePackageStatus = async (id, status) => {
    try {
      //new form data
      let formData = new FormData()
      if (status) {
        formData.append('hotDeals', false)
      } else {
        formData.append('hotDeals', true)
      }
      let res = await MyAPI.PUT(`/admin/package/${id}`, formData, token)
      let { success, message, error } = res.data || res
      if (success) {
        getAllPackages()
        MyError.success('hot deal activated.')
      } else {
        MyError.error(message || error || 'API Error.')
      }
      console.log(res)
    } catch (error) {
      MyError.error(error.message)
    }
  }

  return (
    <div>
      <Row className="d-flex align-items-center justify-content-end mb-3">
        <Col md={4}>
          <Form.Group>
            <Form.Control className="input-border" type="text" placeholder="Search" />
          </Form.Group>
        </Col>
      </Row>
      <Table striped bordered responsive hover>
        <thead>
          <tr>
            <th className="text-dark">S.No</th>
            <th className="text-dark">Title</th>
            <th className="text-dark">Location</th>
            <th className="text-dark">Price</th>
            <th className="text-dark">Discount</th>
            <th className="text-dark">Original Price</th>
            <th className="text-dark">Status</th>
            <th className="text-dark">Date</th>
            <th className="text-dark">Action</th>
          </tr>
        </thead>
        <tbody>
          {packages &&
            packages.length > 0 &&
            packages.map(
              (item, index) =>
                item.offer && (
                  <tr key={index}>
                    <td className="text-dark">{index + 1}</td>
                    <td className="text-dark">{item.title}</td>
                    <td className="text-dark">{item.destination.map((item) => item.name)}</td>
                    <td className="text-dark">
                      {item.fixedDeparture.type === true
                        ? item.fixedDeparture.tripleSharing.totalPrice
                        : item.costOptions.totalPrice}
                    </td>
                    <td className="text-dark">
                      {item.offer.type === 'percentage'
                        ? `${item.offer.value}%`
                        : `${item.offer.value}`}
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
                    <td className="text-dark">
                      <Form.Check
                        checked={item.hotDeals}
                        onClick={() => updatePackageStatus(item._id, item.hotDeals)}
                        type="switch"
                        id="custom-switch"
                      />
                    </td>
                    <td className="text-dark">{format(new Date(item.createdAt), 'yyyy-MM-dd')}</td>
                    <td className="d-flex gap-2 text-dark">
                      <Button variant="secondary">
                        {' '}
                        <FaEye size={22} />{' '}
                      </Button>
                    </td>
                  </tr>
                ),
            )}
          {packages && packages.length === 0 && (
            <tr>
              <td colSpan={9} className="text-center text-dark">
                No packages found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Bottom pagination section */}
      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.Prev />
          <Pagination.Item active>{1}</Pagination.Item>
          <Pagination.Item>{2}</Pagination.Item>
          <Pagination.Item>{3}</Pagination.Item>
          <Pagination.Next />
        </Pagination>
      </div>
    </div>
  )
}

export default HotDeals

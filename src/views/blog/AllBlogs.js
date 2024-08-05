import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Pagination, Row, Table } from 'react-bootstrap'
import { CiEdit } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MyAPI, MyError } from '../../MyAPI'

function AllBlogs() {
  const navigate = useNavigate()
  const token = useSelector((state) => state.token)
  const [blogs, setBlogs] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 10

  const fetAllBlogs = async () => {
    try {
      let res = await MyAPI.GET(`/blog`, token)
      let { success, message, error, data } = res.data || res
      console.log(res.data)

      if (success) {
        setBlogs(data)
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  useEffect(() => {
    fetAllBlogs()
  }, [token])

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase())
  }

  const filteredBlogs = blogs.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery) ||
      item._id.toLowerCase().includes(searchQuery) ||
      new Date(item.createdAt).toISOString().split('T')[0].includes(searchQuery),
  )

  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
  const currentRecords = filteredBlogs.slice(indexOfFirstRecord, indexOfLastRecord)
  const totalPages = Math.ceil(filteredBlogs.length / recordsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const handleDeleteBlog = async (id) => {
    try {
      let res = await MyAPI.DELETE(`/blog/${id}`, token)
      let { success, message, error } = res.data || res

      if (success) {
        fetAllBlogs()
        MyError.success(message)
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  const handleChangeStatus = async (blogId, status) => {
    try {
      //new form data
      let formData = new FormData()
      if (status === 'active') {
        formData.append('status', 'inactive')
      } else {
        formData.append('status', 'active')
      }

      let res = await MyAPI.PUT(`/blog/${blogId}`, formData, token)
      let { success, message, error } = res.data || res
      if (success) {
        fetAllBlogs()
        MyError.success(message)
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
      console.log(res.data)
    } catch (error) {
      MyError.error(error.message)
    }
  }

  return (
    <>
      <Row className="d-flex align-items-center justify-content-end mb-3">
        <Col md={4}>
          <Form.Group>
            <Form.Control
              className="input-border"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearch}
            />
          </Form.Group>
        </Col>
      </Row>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th className="text-dark">S.No</th>
            <th className="text-dark">Blog ID</th>
            <th className="text-dark">Blog Title</th>
            <th className="text-dark">Publish Date</th>
            <th className="text-dark">Status</th>
            <th className="text-dark">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((item, index) => (
            <tr key={index}>
              <td className="text-dark">{indexOfFirstRecord + index + 1}</td>
              <td className="text-dark">{item._id}</td>
              <td className="text-dark">
                {item.title.split(' ').slice(0, 10).join(' ')}
                {item.title.split(' ').length > 10 ? '...' : ''}
              </td>
              <td className="text-dark">{new Date(item.createdAt).toISOString().split('T')[0]}</td>
              <td className="text-dark">
                <Form.Check
                  type="switch"
                  id={`custom-switch-${index}`}
                  onClick={() => handleChangeStatus(item._id, item.status)}
                  defaultChecked={item.status === 'active'}
                />
              </td>
              <td className="d-flex gap-2 text-dark">
                <Button
                  onClick={() => navigate(`/admin/blogs/edit/${item._id}`)}
                  variant="warning"
                  className="mr-2"
                >
                  <CiEdit size={22} />
                </Button>
                <Button onClick={() => handleDeleteBlog(item._id)} variant="danger">
                  <MdDelete size={22} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center mb-3">
        <Pagination>
          <Pagination.Prev
            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, pageIndex) => (
            <Pagination.Item
              key={pageIndex}
              active={pageIndex + 1 === currentPage}
              onClick={() => paginate(pageIndex + 1)}
            >
              {pageIndex + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </>
  )
}

export default AllBlogs

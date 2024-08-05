/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import Editor from 'react-simple-wysiwyg'
import { MyAPI, MyError, MyToken } from '../../MyAPI'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
function EditBlog() {
  const token = useSelector((state) => state.token)
  const navigate = useNavigate()
  const { id } = useParams()

  const [blogTitle, setBlogTitle] = useState('')
  const [blogSubTitle, setBlogSubTitle] = useState('')
  const [blogContent, setBlogContent] = useState('')
  const [blogDescription, setBlogDescription] = useState('')
  const [blogImage, setBlogImage] = useState('')
  const [blogImageBackground, setBlogImageBackground] = useState('')
  const [blogImageOther, setBlogImageOther] = useState('')

  const [blogData, setBlogData] = useState(null)
  const [isBlogImageUpdate, setIsBlogImageUpdate] = useState(false)
  const [isBlogImageBackgroundUpdate, setIsBlogImageBackgroundUpdate] = useState(false)
  const [isBlogImageOtherUpdate, setIsBlogImageOtherUpdate] = useState(false)

  const fetchBlogData = async (id) => {
    try {
      let res = await MyAPI.GET(`/blog/${id}`, token)
      let { message, error, success, data } = res.data || res
      // console.log(res.data)
      if (success) {
        setBlogData(data)
        setBlogTitle(data.title)
        setBlogSubTitle(data.subTitle)
        setBlogContent(data.html)
        setBlogDescription(data.description)
      } else {
        MyError.error(message || error || 'Server Error Please try again later')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  useEffect(() => {
    fetchBlogData(id)
  }, [id])

  const handleUpdateBlog = async () => {
    if (!blogTitle) {
      return MyError.warn('Blog Title is required')
    }
    if (!blogSubTitle) {
      return MyError.warn('Blog Sub Title is required')
    }
    if (!blogContent) {
      return MyError.warn('Blog Content is required')
    }
    if (!blogDescription) {
      return MyError.warn('Blog Description is required')
    }
    if (isBlogImageUpdate && !blogImage) {
      return MyError.warn('Blog Image is required')
    }
    if (isBlogImageBackgroundUpdate && !blogImageBackground) {
      return MyError.warn('Blog Image Background is required')
    }

    if (isBlogImageOtherUpdate && (!blogImageOther || blogImageOther.length === 0)) {
      return MyError.warn('Blog Image Other is required')
    }

    try {
      //new form data
      const formData = new FormData()
      formData.append('title', blogTitle)
      formData.append('subTitle', blogSubTitle)
      formData.append('html', blogContent)
      formData.append('description', blogDescription)
      if (isBlogImageUpdate) {
        formData.append('coverImage', blogImage)
      }

      if (isBlogImageBackgroundUpdate) {
        formData.append('backgroundImage', blogImageBackground)
      }

      if (isBlogImageOtherUpdate && blogImageOther && blogImageOther.length > 0) {
        blogImageOther.forEach((item, index) => {
          formData.append(`otherImages`, item)
        })
      }

      let res = await MyAPI.PUT(`/blog/${id}`, formData, token)

      let { success, message, error } = res.data || res
      console.log(res.data)
      if (success) {
        // navigate('/admin/blogs/all')
        fetchBlogData(id)
        MyError.success(message)
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  return (
    <>
      <center>
        {' '}
        <h3>Edit Blog</h3>{' '}
      </center>
      <Row>
        <Col md={12} className="mt-3">
          <Form.Group>
            <Form.Label>Blog Title</Form.Label>
            <Form.Control
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              type="text"
              className="input-border"
              placeholder="Enter Blog Title"
            />
          </Form.Group>
        </Col>

        <Col md={12} className="mt-3">
          <Form.Group>
            <Form.Label>Blog Sub Title</Form.Label>
            <Form.Control
              value={blogSubTitle}
              className="input-border"
              onChange={(e) => setBlogSubTitle(e.target.value)}
              type="text"
              placeholder="Enter Blog Sub Title"
            />
          </Form.Group>
        </Col>

        <Col md={4} className="mt-3">
          <Form.Group>
            <Form.Label>Cover Image</Form.Label>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Update Image"
              checked={isBlogImageUpdate}
              onChange={() => setIsBlogImageUpdate(!isBlogImageUpdate)}
            />
            {isBlogImageUpdate && (
              <Form.Control
                // value={blogImage}
                onChange={(e) => setBlogImage(e.target.files[0])}
                type="file"
              />
            )}
            {!isBlogImageUpdate && (
              <img
                src={blogData && blogData.coverImage}
                alt="Cover"
                style={{ width: '100px', height: '100px' }}
              />
            )}
          </Form.Group>
        </Col>

        <Col md={4} className="mt-3">
          <Form.Group>
            <Form.Label>Background Image</Form.Label>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Update Image"
              checked={isBlogImageBackgroundUpdate}
              onChange={() => setIsBlogImageBackgroundUpdate(!isBlogImageBackgroundUpdate)}
            />
            {isBlogImageBackgroundUpdate && (
              <Form.Control
                // value={blogImageBackground}
                onChange={(e) => setBlogImageBackground(e.target.files[0])}
                type="file"
              />
            )}
            {!isBlogImageBackgroundUpdate && (
              <img
                src={blogData && blogData.backgroundImage}
                alt="Cover"
                style={{ width: '100px', height: '100px' }}
              />
            )}
          </Form.Group>
        </Col>

        <Col md={4} className="mt-3">
          <Form.Group>
            <Form.Label>Other Image</Form.Label>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Update Image"
              checked={isBlogImageOtherUpdate}
              onChange={() => setIsBlogImageOtherUpdate(!isBlogImageOtherUpdate)}
            />
            {isBlogImageOtherUpdate && (
              <Form.Control
                multiple
                onChange={(e) => setBlogImageOther([...e.target.files])}
                type="file"
              />
            )}
            <div className="d-flex align-items-center justify-content-center gap-1">
              {!isBlogImageOtherUpdate &&
                blogData &&
                blogData.otherImages.length > 0 &&
                blogData.otherImages.map((item, index) => (
                  <img
                    key={index}
                    src={item ?? ''}
                    alt="Cover"
                    style={{ width: '100px', height: '100px' }}
                  />
                ))}
            </div>
          </Form.Group>
        </Col>

        <Col md={12} className="mt-3">
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={blogDescription}
              onChange={(e) => setBlogDescription(e.target.value)}
              as="textarea"
              rows={3}
              placeholder="Enter Description..."
            />
          </Form.Group>
        </Col>

        <Col md={12} className="mt-3">
          <Editor
            value={blogContent}
            onChange={(e) => setBlogContent(e.target.value)}
            containerProps={{
              style: {
                resize: 'vertical',
                minHeight: '40vh',
                marginInline: 'auto',
              },
            }}
          />
        </Col>
        <Col md={12} className="mt-3 mb-3">
          <Button onClick={handleUpdateBlog} variant="primary" size="sm">
            Update Blog
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default EditBlog

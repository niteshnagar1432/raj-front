import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { MyAPI, MyError } from '../../MyAPI'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AddBlog() {
  const token = useSelector((state) => state.token)
  const navigate = useNavigate()

  const [blogTitle, setBlogTitle] = useState('')
  const [blogSubTitle, setBlogSubTitle] = useState('')
  const [blogContent, setBlogContent] = useState('')
  const [blogDescription, setBlogDescription] = useState('')
  const [blogImage, setBlogImage] = useState('')
  const [blogImageBackground, setBlogImageBackground] = useState('')
  const [blogImageOther, setBlogImageOther] = useState('')

  const handleAddBlod = async () => {
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
    if (!blogImage) {
      return MyError.warn('Blog Image is required')
    }
    // if (!blogImageBackground) {
    //   return MyError.warn('Blog Image Background is required')
    // }
    if (!blogImageOther || blogImageOther.length === 0) {
      return MyError.warn('Blog Image Other is required')
    }

    try {
      const formData = new FormData()
      formData.append('title', blogTitle)
      formData.append('subTitle', blogSubTitle)
      formData.append('html', blogContent)
      formData.append('description', blogDescription)
      formData.append('coverImage', blogImage)
      // formData.append('backgroundImage', blogImageBackground)

      if (blogImageOther && blogImageOther.length > 0) {
        blogImageOther.forEach((item) => {
          formData.append('otherImages', item)
        })
      }

      let res = await MyAPI.FORM_DATA_POST('/blog', formData, token)

      let { success, message, error } = res.data || res
      if (success) {
        navigate('/admin/blogs/all')
        MyError.success(message)
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  }

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ]

  return (
    <>
      <center>
        <h3>Add Blog</h3>
      </center>
      <Row>
        <Col md={12} className="mt-3">
          <Form.Group>
            <Form.Label>Blog Title</Form.Label>
            <Form.Control
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              type="text"
              placeholder="Enter Blog Title"
            />
          </Form.Group>
        </Col>

        <Col md={12} className="mt-3">
          <Form.Group>
            <Form.Label>Blog Sub Title</Form.Label>
            <Form.Control
              value={blogSubTitle}
              onChange={(e) => setBlogSubTitle(e.target.value)}
              type="text"
              placeholder="Enter Blog Sub Title"
            />
          </Form.Group>
        </Col>

        <Col md={6} className="mt-3">
          <Form.Group>
            <Form.Label>Cover Image</Form.Label>
            <Form.Control onChange={(e) => setBlogImage(e.target.files[0])} type="file" />
          </Form.Group>
        </Col>

        {/* <Col md={4} className="mt-3">
          <Form.Group>
            <Form.Label>Background Image</Form.Label>
            <Form.Control onChange={(e) => setBlogImageBackground(e.target.files[0])} type="file" />
          </Form.Group>
        </Col> */}

        <Col md={6} className="mt-3">
          <Form.Group>
            <Form.Label>Other Image</Form.Label>
            <Form.Control
              multiple
              onChange={(e) => setBlogImageOther([...e.target.files])}
              type="file"
            />
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

        <Col md={12} className="mt-4" style={{ minHeight: '60vh', marginInline: 'auto' }}>
          <ReactQuill
            value={blogContent}
            onChange={setBlogContent}
            modules={modules}
            formats={formats}
            style={{ minHeight: '60vh', marginInline: 'auto' }} // Adjusted minHeight here
          />
        </Col>
        <Col md={12} className="mt-3 mb-3">
          <Button onClick={handleAddBlod} variant="primary" size="sm">
            Add Blog
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default AddBlog

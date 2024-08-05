import React, { useState } from 'react'
import { Container, Row, Col, Button, Form, Image, Card } from 'react-bootstrap'

function EditProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: '',
    age: 30,
    gender: 'Male',
    profilePicture: '',
    city: 'New York',
    state: 'NY',
    pincode: '10001',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfile({ ...profile, [name]: value })
  }

  const handleFileChange = (e) => {
    setProfile({ ...profile, profilePicture: URL.createObjectURL(e.target.files[0]) })
  }

  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleSave = () => {
    // Save profile logic here
    toggleEdit()
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="12">
          <div className="d-flex  justify-content-between">
            <h3>Profile</h3>
            <Col className="d-flex align-items-center justify-content-end">
              <Button size="sm" onClick={toggleEdit}>
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </Col>
          </div>

          <Row className="mb-3">
            <Col md={12}>
              <Image
                src={profile.profilePicture || 'https://via.placeholder.com/150'}
                roundedCircle
                fluid
              />
              {isEditing && (
                <Form.Group className="mt-3">
                  <Form.Label>Change Profile Picture</Form.Label>
                  <Form.Control type="file" onChange={handleFileChange} />
                </Form.Group>
              )}
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={profile.password}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  value={profile.age}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={profile.gender}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={profile.city}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={profile.state}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                  type="text"
                  name="pincode"
                  value={profile.pincode}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </Form.Group>
            </Col>
          </Row>

          {isEditing && (
            <div className="text-center mb-3">
              <Button variant="primary" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default EditProfile

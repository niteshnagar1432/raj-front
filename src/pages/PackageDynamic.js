/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from 'react'
import WhatsAppHelp from '../components1/WhatsAppHelp'
import Footer from '../components1/Footer'
import Header from '../components1/Header'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MyAPI, MyError } from '../MyAPI'
import { MdOutlineRateReview, MdOutlineSettingsBackupRestore } from 'react-icons/md'
import { BiTrip } from 'react-icons/bi'

import { useSelector } from 'react-redux'
import { Accordion, Button, Card, Col, Row } from 'react-bootstrap'
import { FaQuestionCircle } from 'react-icons/fa'
import './model.css'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FaCalendarAlt } from 'react-icons/fa'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import { SlLocationPin } from 'react-icons/sl'
import Timeline from './Timeline'
import EnquiryForm from './EnquiryForm'

import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import EnquiryButton from '../components1/EnquiryButton'
import RecomndedTrip from '../components1/RecomndedTrip'

function PackageDynamic() {
  const [packageData, setPackageData] = useState(null)
  const [allReview, setAllReview] = useState([])
  const userId = useSelector((state) => state.userId)
  const navigate = useNavigate()
  const { id } = useParams()
  const fetchPackage = async (id) => {
    try {
      let res = await MyAPI.GET(`/admin/package/${id}`)
      let { success, message, error, packageExist } = res.data || res
      console.log(res.data)
      if (success) {
        setPackageData(packageExist)
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  const fetchPackageReview = async () => {
    try {
      let res = await MyAPI.GET(`/reviews/${id}`)
      let { success, message, error, data } = res.data || res
      console.log('All reviews', res.data)
      if (success) {
        setAllReview(data.reviews.reverse())
      } else {
        MyError.error(message || error || 'Server Error Please try again later')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  useEffect(() => {
    fetchPackage(id)
    fetchPackageReview()
  }, [id])

  const [activeIndex, setActiveIndex] = useState(0)

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')

  const handleAddComment = async () => {
    var user_id = localStorage.getItem('userId')
    if (!userId && !user_id) {
      navigate('/login')
      return MyError.warn('Please Login...')
    }

    if (!name) {
      return MyError.warn('Please Enter Name')
    }

    if (!email) {
      return MyError.warn('Please Enter Email')
    }

    if (!comment) {
      return MyError.warn('Please Enter Comment')
    }

    try {
      let res = await MyAPI.POST(`/review/${id}/${userId || user_id}`, { name, email, comment })
      let { success, message, error } = res.data || res
      if (success) {
        MyError.success(message)
        fetchPackageReview()
        setName('')
        setEmail('')
        setComment('')
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0') // Get day and pad with leading zero
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const month = monthNames[date.getMonth()] // Get month name
    const year = date.getFullYear() // Get year
    return `${day} ${month} ${year}`
  }

  const [activeTab, setActiveTab] = useState('overview')

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  const BookingClick = () => {
    setActiveTab('booking')
    window.scrollTo({
      top: 800,
      left: 0,
      behavior: 'smooth',
    })
  }

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [startDate, setStartDate] = useState(null)

  const calculateDiscountedPrice = (discountType, actualPrice, discountValue) => {
    if (discountType === 'percentage') {
      return actualPrice - actualPrice * (discountValue / 100)
    } else if (discountType === 'price') {
      return actualPrice - discountValue
    } else {
      throw new Error('Invalid discount type')
    }
  }

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  // Update the state based on window width
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768)
  }

  useEffect(() => {
    // Add resize event listener
    window.addEventListener('resize', handleResize)

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const [activeKey, setActiveKey] = useState('0') // Default to first item

  const handleToggle = (index) => {
    setActiveKey(activeKey === index ? null : index) // Toggle open/close
  }

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState('')

  const openLightbox = (index) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  return (
    <>
      <Header />
      <EnquiryButton />

      <section
        className="breadcrumb-main pb-20 pt-14"
        style={{
          backgroundImage: 'url(https://htmldesigntemplates.com/html/travelin/images/bg/bg1.jpg)',
        }}
      >
        <div
          className="section-shape section-shape1 top-inherit bottom-0"
          style={{
            backgroundImage: 'url(https://htmldesigntemplates.com/html/travelin/images/shape8.png)',
          }}
        ></div>
        <div className="breadcrumb-outer">
          <div className="container">
            <div className="breadcrumb-content text-center">
              <h1 className="mb-3">
                {' '}
                {packageData && packageData.destination?.map((item) => item.name)}
              </h1>
              <nav aria-label="breadcrumb" className="d-block">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="#">
                      {' '}
                      <span style={{ color: 'var(--secondary-color)' }}>Home</span>{' '}
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {packageData && packageData.destination?.map((item) => item.name)}
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="dot-overlay"></div>
      </section>

      <section className="trending pt-6 pb-0 overflow-hidden">
        <div className="container">
          <div className="single-content">
            <div id="highlight">
              <div className="row">
                <div className="col-12 col-lg-6">
                  <div
                    className="single-image rounded-3 overflow-hidden"
                    style={{ width: '100%', height: '90vh' }}
                  >
                    <img
                      loading="lazy"
                      src={packageData && packageData.galleryImages[0]}
                      alt="image"
                      style={{ objectFit: 'cover', objectPosition: 'bottom' }}
                      className="rounded-3 shadow"
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="single-full-title border-b mb-2 pb-2">
                    <div className="single-title text-start">
                      <h2 className="mb-1">
                        {/* {packageData && packageData.destination?.map((item) => item.name)} */}
                        {packageData && packageData.title}
                      </h2>
                      <p className="text-dark mb-0">
                        From &nbsp;
                        {packageData &&
                          packageData.fixedDeparture.type === false &&
                          (packageData.offer ? (
                            <>
                              <span className="text-muted text-truncate text-decoration-line-through">
                                ₹{packageData.costOptions.totalPrice}
                              </span>
                              &nbsp; &nbsp;
                              <span>
                                <b>
                                  ₹
                                  {calculateDiscountedPrice(
                                    packageData.offer.type,
                                    packageData.costOptions.totalPrice,
                                    packageData.offer.value,
                                  )}{' '}
                                </b>
                                /-
                              </span>
                            </>
                          ) : (
                            <span className="text-muted">
                              ₹{packageData.costOptions.totalPrice} /-
                            </span>
                          ))}
                        {packageData &&
                          packageData.fixedDeparture.type === true &&
                          (packageData.offer ? (
                            <>
                              <span className="text-muted text-truncate text-decoration-line-through">
                                ₹{packageData.fixedDeparture.tripleSharing.totalPrice}
                              </span>
                              &nbsp; &nbsp;
                              <span>
                                <b>
                                  ₹
                                  {calculateDiscountedPrice(
                                    packageData.offer.type,
                                    packageData.fixedDeparture.tripleSharing.totalPrice,
                                    packageData.offer.value,
                                  )}{' '}
                                </b>
                                /-
                              </span>
                            </>
                          ) : (
                            <span className="text-muted">
                              ₹{packageData.fixedDeparture.tripleSharing.totalPrice} /-
                            </span>
                          ))}
                      </p>
                    </div>
                  </div>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <BiTrip size={20} /> &nbsp; Trip Type : &nbsp;
                          {packageData && packageData.tripType?.map((item) => `${item.name},`)}
                        </td>
                        <td>
                          <i className="fa fa-clock-o pink mr-1" aria-hidden="true"></i> Duration :
                          &nbsp;
                          {packageData && packageData.days}D / {packageData && packageData.nights}N
                        </td>
                      </tr>
                      <tr>
                        {packageData && packageData.fixedDeparture.type === false && (
                          <td>
                            <i className="fa fa-group pink mr-1" aria-hidden="true"></i> Group Size
                            :{' '}
                            {packageData.fixedDeparture.groupSize
                              ? packageData.fixedDeparture.groupSize
                              : 0}
                          </td>
                        )}
                        {packageData && packageData.fixedDeparture.type === true && (
                          <td>
                            <i className="fa fa-group pink mr-1" aria-hidden="true"></i> Group Size
                            :{' '}
                            {packageData.fixedDeparture.groupSize
                              ? packageData.fixedDeparture.groupSize
                              : 0}
                          </td>
                        )}
                        {packageData && packageData.reviews && (
                          <td>
                            <MdOutlineRateReview size={20} /> &nbsp; Reviews :{' '}
                            {packageData.reviews.length}
                          </td>
                        )}
                      </tr>
                      <tr>
                        {packageData && packageData.reviews && (
                          <td>
                            <SlLocationPin size={20} /> &nbsp; Location :{' '}
                            {packageData && packageData.destination?.map((item) => item.name)}
                          </td>
                        )}
                      </tr>
                    </tbody>
                  </table>
                  <Row className="mt-3">
                    <Col md={12} className="d-flex align-items-center">
                      <Button
                        onClick={BookingClick}
                        style={{ background: '#244855', borderColor: '#244855' }}
                        className="px-5"
                      >
                        Book Now
                      </Button>
                      <p onClick={handleShow} className="ms-3 cursor-pointer">
                        <FaQuestionCircle /> &nbsp; Trip Enquiry
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>

              <EnquiryForm show={show} setShow={setShow} />

              <div>
                <div className="border-none py-3 mt-2 d-flex align-items-center justify-content-start gap-2 overflow-x-auto">
                  <Button
                    className={`outline-none`}
                    style={{
                      background: activeTab === 'overview' ? '#244855' : 'transparent',
                      color: activeTab === 'overview' ? '#fff' : '#244855',
                      borderColor: '#244855',
                      whiteSpace: 'nowrap',
                    }}
                    onClick={() => handleTabClick('overview')}
                  >
                    Overview
                  </Button>
                  <Button
                    className={`outline-none`}
                    style={{
                      background: activeTab === 'trip-outline' ? '#244855' : 'transparent',
                      color: activeTab === 'trip-outline' ? '#fff' : '#244855',
                      borderColor: '#244855',
                      whiteSpace: 'nowrap',
                    }}
                    onClick={() => handleTabClick('trip-outline')}
                  >
                    Trip Outline
                  </Button>
                  <Button
                    className={`outline-none`}
                    style={{
                      background: activeTab === 'trip-includes' ? '#244855' : 'transparent',
                      color: activeTab === 'trip-includes' ? '#fff' : '#244855',
                      borderColor: '#244855',
                      whiteSpace: 'nowrap',
                    }}
                    onClick={() => handleTabClick('trip-includes')}
                  >
                    Trip Includes
                  </Button>
                  <Button
                    className={`outline-none`}
                    style={{
                      background: activeTab === 'trip-excludes' ? '#244855' : 'transparent',
                      color: activeTab === 'trip-excludes' ? '#fff' : '#244855',
                      borderColor: '#244855',
                      whiteSpace: 'nowrap',
                    }}
                    onClick={() => handleTabClick('trip-excludes')}
                  >
                    Trip Excludes
                  </Button>
                  <Button
                    className={`outline-none`}
                    style={{
                      background: activeTab === 'gallery' ? '#244855' : 'transparent',
                      color: activeTab === 'gallery' ? '#fff' : '#244855',
                      borderColor: '#244855',
                      whiteSpace: 'nowrap',
                    }}
                    onClick={() => handleTabClick('gallery')}
                  >
                    Gallery
                  </Button>
                  <Button
                    className={`outline-none`}
                    style={{
                      background: activeTab === 'terms-policy' ? '#244855' : 'transparent',
                      color: activeTab === 'terms-policy' ? '#fff' : '#244855',
                      borderColor: '#244855',
                      whiteSpace: 'nowrap',
                    }}
                    onClick={() => handleTabClick('terms-policy')}
                  >
                    Term & Policy
                  </Button>
                  <Button
                    className={`outline-none`}
                    style={{
                      background: activeTab === 'booking' ? '#244855' : 'transparent',
                      color: activeTab === 'booking' ? '#fff' : '#244855',
                      borderColor: '#244855',
                      whiteSpace: 'nowrap',
                    }}
                    onClick={() => handleTabClick('booking')}
                  >
                    Booking
                  </Button>
                </div>
                <div className="tab-content mt-1 mb-4">
                  {activeTab === 'overview' && <div>{packageData && packageData.description}</div>}
                  {activeTab === 'trip-outline' && (
                    <div>
                      {isMobile ? (
                        <Accordion activeKey={activeKey}>
                          {packageData &&
                            packageData.itineraries &&
                            packageData.itineraries.map((item, index) => (
                              <Card key={item._id}>
                                <Accordion.Header onClick={() => handleToggle(index.toString())}>
                                  Day {index + 1} - {item.heading || 'Heading Not Found.'}
                                </Accordion.Header>
                                <Accordion.Collapse eventKey={index.toString()}>
                                  <Card.Body className="text-dark border-top">
                                    {item.activity || 'Activity Not Found.'}
                                  </Card.Body>
                                </Accordion.Collapse>
                              </Card>
                            ))}
                        </Accordion>
                      ) : (
                        <Timeline events={packageData.itineraries} />
                      )}
                    </div>
                  )}
                  {activeTab === 'trip-includes' && (
                    <div>
                      <ul>
                        {packageData &&
                          packageData.includes.length > 0 &&
                          packageData.includes.map((item, index) => (
                            <li key={index} className="d-block pb-1">
                              <i className="fa fa-check pink mr-1"></i> {item}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                  {activeTab === 'trip-excludes' && (
                    <div>
                      {' '}
                      <ul>
                        {packageData &&
                          packageData.excludes.length > 0 &&
                          packageData.excludes.map((item, index) => (
                            <li key={index} className="d-block pb-1">
                              <i className="fa fa-close pink mr-1"></i> {item}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                  {activeTab === 'gallery' && (
                    <div className="gallery">
                      {packageData.galleryImages &&
                        packageData.galleryImages.length > 0 &&
                        packageData.galleryImages.map((image, index) => (
                          <div className="gallery-item" key={index}>
                            <Zoom>
                              <img
                                src={image}
                                alt={`Image Not Found.`}
                                style={{ cursor: 'pointer' }}
                              />
                            </Zoom>
                          </div>
                        ))}
                    </div>
                  )}
                  {lightboxOpen && (
                    <Lightbox
                      mainSrc={lightboxIndex}
                      onCloseRequest={closeLightbox}
                      enableZoom={true} // Optional: Enable zooming
                    />
                  )}
                  <style jsx>{`
                    .gallery {
                      display: grid;
                      grid-template-columns: repeat(3, 1fr);
                      gap: 1rem;
                    }
                    .gallery-item img {
                      width: 100%;
                      height: auto;
                      object-fit: cover;
                      aspect-ratio: 1;
                    }
                  `}</style>
                  {activeTab === 'terms-policy' && (
                    <>
                      <div className="border-bottom mb-2">
                        <h5 className="text-uppercase poppins mid-font">Terms and Conditions</h5>
                        <p
                          dangerouslySetInnerHTML={{
                            __html:
                              packageData && packageData.termsAndConditions
                                ? packageData.termsAndConditions
                                : 'No Terms and Conditions',
                          }}
                        />
                      </div>
                      <div className="border-bottom mb-2">
                        <h5 className="text-uppercase poppins mid-font">Payment Terms</h5>
                        <p
                          dangerouslySetInnerHTML={{
                            __html:
                              packageData && packageData.paymentTerms
                                ? packageData.paymentTerms
                                : 'No Terms and Conditions',
                          }}
                        />
                      </div>
                      <div className="border-bottom mb-2">
                        <h5 className="text-uppercase poppins mid-font">Travel Essentials</h5>
                        <p
                          dangerouslySetInnerHTML={{
                            __html:
                              packageData && packageData.travelEssentials
                                ? packageData.travelEssentials
                                : 'No Terms and Conditions',
                          }}
                        />
                      </div>
                      <div className="border-bottom mb-2">
                        <h5 className="text-uppercase poppins mid-font">faqs</h5>
                        <p
                          dangerouslySetInnerHTML={{
                            __html:
                              packageData && packageData.faqs
                                ? packageData.faqs
                                : 'No Terms and Conditions',
                          }}
                        />
                      </div>
                    </>
                  )}
                  {activeTab === 'booking' && (
                    <div className="border-bottom mb-2">
                      <Row className="py-2 border-bottom">
                        <Col md={10}>
                          Select Date and Pricing Options for this trip in the Trip Options setting.
                        </Col>
                        <Col md={2}>
                          <Button variant="danger">
                            {' '}
                            <MdOutlineSettingsBackupRestore size={22} />
                            &nbsp; Clear All
                          </Button>
                        </Col>
                      </Row>
                      <div className="d-flex align-items-center py-3">
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip id="tooltip-right">
                              Select a Date to view available pricings and other options.
                            </Tooltip>
                          }
                        >
                          <Button
                            variant="danger"
                            className="d-flex align-items-center"
                            onClick={() => document.getElementById('datePicker').click()}
                          >
                            Select a Date <FaCalendarAlt className="ms-2" />
                          </Button>
                        </OverlayTrigger>
                        <DatePicker
                          id="datePicker"
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          customInput={<input type="text" className="d-none" />}
                        />
                        {/* <div
                          className="ms-3 p-2 border border-primary rounded bg-light text-primary"
                          style={{ maxWidth: '250px' }}
                        >
                          Select a Date to view available pricings and other options.
                        </div> */}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* <div className="tour-includes mb-4">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <i className="fa fa-clock-o pink mr-1" aria-hidden="true"></i>{' '}
                        {packageData && packageData.days}D / {packageData && packageData.nights}N
                      </td>
                      {packageData && packageData.fixedDeparture.type && (
                        <td>
                          <i className="fa fa-group pink mr-1" aria-hidden="true"></i> Group Size :{' '}
                          {packageData.fixedDeparture.groupSize}
                        </td>
                      )}
                      {packageData && packageData.fixedDeparture.type === false && (
                        <td>
                          <i className="fa fa-group pink mr-1" aria-hidden="true"></i>
                          {packageData.costOptions.type}
                        </td>
                      )}
                      <td>
                        <i className="fa fa-calendar pink mr-1" aria-hidden="true"></i> Jan 18 - Dec
                        21
                      </td>
                    </tr>
                    {packageData && packageData.fixedDeparture.type === false && (
                      <tr>
                        <td>
                          <MdFlightTakeoff size={22} />
                          Flight Price : {packageData.costOptions.flightPrice}
                        </td>
                        <td>
                          <GiIsland size={22} /> &nbsp; Land Price :{' '}
                          {packageData.costOptions.landPackagePrice}
                        </td>
                        <td>
                          <IoPricetag size={22} /> &nbsp; Total Price :{' '}
                          {packageData.costOptions.totalPrice}
                        </td>
                      </tr>
                    )}

                    {packageData && packageData.fixedDeparture.type && (
                      <tr>
                        <td>
                          <MdFlightTakeoff size={22} /> Double Sharing Flight Price :{' '}
                          {packageData.fixedDeparture.doubleSharing.flightPrice}
                        </td>
                        <td>
                          <GiIsland size={22} /> &nbsp; Double Sharing Land Price :{' '}
                          {packageData.fixedDeparture.doubleSharing.landPackagePrice}
                        </td>
                        <td>
                          <IoPricetag size={22} /> &nbsp; Total Price :{' '}
                          {packageData.fixedDeparture.doubleSharing.totalPrice}
                        </td>
                      </tr>
                    )}

                    {packageData && packageData.fixedDeparture.type && (
                      <tr>
                        <td>
                          <MdFlightTakeoff size={22} /> Triple Sharing Flight Price :{' '}
                          {packageData.fixedDeparture.tripleSharing.flightPrice}
                        </td>
                        <td>
                          <GiIsland size={22} /> &nbsp; Triple Sharing Land Price :{' '}
                          {packageData.fixedDeparture.tripleSharing.landPackagePrice}
                        </td>
                        <td>
                          <IoPricetag size={22} /> &nbsp; Total Price :{' '}
                          {packageData.fixedDeparture.tripleSharing.totalPrice}
                        </td>
                      </tr>
                    )}
                    {packageData && packageData.fixedDeparture.type && (
                      <tr>
                        <td>
                          <i className="fa fa-group pink mr-1" aria-hidden="true"></i> Fixed
                          Departure : Yes
                        </td>
                      </tr>
                    )}

                    {packageData && packageData.fixedDeparture.type === false && (
                      <tr>
                        <td>
                          <i className="fa fa-group pink mr-1" aria-hidden="true"></i> Fixed
                          Departure : No
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="description mb-2">
                <div className="row">
                  <div className="col-lg-6 col-md-6 mb-2">
                    <div className="desc-box bg-grey p-4 rounded">
                      <h5 className="mb-2">Departure & Return Location</h5>
                      <p className="mb-0">Jammu and Kashmir International Airport(Google Map)</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 mb-2">
                    <div className="desc-box bg-grey p-4 rounded">
                      <h5 className="mb-2">Bedroom</h5>
                      <p className="mb-0">4 Bedrooms</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 mb-2">
                    <div className="desc-box bg-grey p-4 rounded">
                      <h5 className="mb-2">Departure Time</h5>
                      <p className="mb-0">3 Hours Before Flight Time</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 mb-2">
                    <div className="desc-box bg-grey p-4 rounded">
                      <h5 className="mb-2">Departure Time</h5>
                      <p className="mb-0">3 Hours Before Flight Time</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 mb-2">
                    <div className="desc-box bg-grey p-4 rounded">
                      <h5 className="mb-2">Price Includes</h5>
                      <ul>
                        {packageData &&
                          packageData.includes.length > 0 &&
                          packageData.includes.map((item, index) => (
                            <li key={index} className="d-block pb-1">
                              <i className="fa fa-check pink mr-1"></i> {item}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 mb-2">
                    <div className="desc-box bg-grey p-4 rounded">
                      <h5 className="mb-2">Price Excludes</h5>
                      <ul>
                        {packageData &&
                          packageData.excludes.length > 0 &&
                          packageData.excludes.map((item, index) => (
                            <li key={index} className="d-block pb-1">
                              <i className="fa fa-close pink mr-1"></i> {item}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* <div className="description mb-4">
                <h4>Flight / Train </h4>
                <p>
                  {packageData && packageData.flightTrain
                    ? packageData.flightTrain
                    : 'Flight / Train Not Included'}
                </p>
              </div> */}

              {/* <div className="description mb-4">
                <h4>Cabs </h4>
                <p>{packageData && packageData.cabs ? packageData.cabs : 'Cab Not Included '}</p>
              </div>
              <div className="description mb-4">
                <h4>Hotels </h4>
                {packageData &&
                  packageData.hotels.length > 0 &&
                  packageData.hotels.map((hotel) => (
                    <div className="d-flex align-items-start justify-content-start flex-column mb-2 gap-1">
                      <span>
                        <b>Hotel Name :</b> {hotel.name}{' '}
                      </span>
                      <span>
                        <b>City :</b> {hotel.city}{' '}
                      </span>
                      <span>
                        <b>Rating :</b>
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < hotel.rating ? 'star-filled' : 'star-empty'}>
                            &#9733;
                          </span>
                        ))}
                      </span>
                      <span>
                        <b>Nights :</b>
                        {hotel.nights}
                      </span>

                      <p>
                        {' '}
                        <b>About :</b> {hotel.description}
                      </p>
                    </div>
                  ))}
                {packageData && packageData.hotels.length === 0 && <p>Hotel Not Included</p>}
              </div> */}
            </div>

            <RecomndedTrip
              destinationId={(packageData && packageData.destination[0]._id) || null}
            />
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppHelp />
    </>
  )
}

export default PackageDynamic

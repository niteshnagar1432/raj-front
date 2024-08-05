/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react'
import Header from '../components1/Header'
import Footer from '../components1/Footer'
import WhatsAppHelp from '../components1/WhatsAppHelp'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MyAPI, MyError, MyToken } from '../MyAPI'
import EnquiryButton from '../components1/EnquiryButton'

function BlogDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)

  const fetchBlog = async (id) => {
    try {
      let res = await MyAPI.GET(`/blog/${id}`)
      let { success, message, error, data } = res.data || res
      console.log(res.data)
      if (success) {
        setBlog(data)
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  useEffect(() => {
    fetchBlog(id)
  }, [id])

  const formatDate = (dateString, format) => {
    const date = new Date(dateString)
    const options = { day: '2-digit', month: 'long', year: 'numeric' }

    switch (format) {
      case 'dd':
        return date.toLocaleDateString('en-US', { day: '2-digit' })
      case 'month':
        return date.toLocaleDateString('en-US', { month: 'long' })
      case 'year':
        return date.toLocaleDateString('en-US', { year: 'numeric' })
      case 'all':
        return date.toLocaleDateString('en-US', options)
      default:
        return date.toLocaleDateString('en-US', options) // Default to 'all' format
    }
  }

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ')
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...'
    }
    return text
  }

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')

  const handleAddComment = async () => {
    var token = MyToken.getItem()
    console.log(token)
    if (!token) {
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
      let res = await MyAPI.POST(`/blog-comment/${id}`, { name, email, content: comment }, token)
      let { success, message, error } = res.data || res
      console.log(res.data)
      if (success) {
        MyError.success(message)
        // fetchPackageReview()
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

  return (
    <>
      <Header />
      <EnquiryButton />
      <div className="page-cover pt-10 pb-10 bg-lgrey border-b">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4">
              <div className="cover-content text-center text-md-start">
                <div className="author-detail mb-2">
                  <Link to="#" className="tag white bg-theme py-1 px-3 me-2 rounded">
                    #Technology
                  </Link>
                  <Link to="#" className="tag py-1 px-3">
                    <i className="fa fa-eye"></i> 2500
                  </Link>
                </div>
                <h1 className="lh-sm">{blog && blog.title}</h1>
                <div className="author-detail d-flex align-items-center">
                  <span className="me-3">
                    <Link to="#">
                      <i className="fa fa-clock"></i> Posted On : &nbsp;
                      {formatDate(blog && blog.createdAt)}
                    </Link>
                  </span>
                  <span className="me-3">
                    <Link to="#">
                      <i className="fa fa-user"></i> Jack Richard
                    </Link>
                  </span>
                  <span>
                    <Link to="#">
                      <i className="fa fa-comments"></i> 50
                    </Link>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="box-shadow p-3 position-relative">
                <img src={blog && blog.coverImage} alt="Image" className="w-100 rounded" />
                {/* <div className="video-button text-center position-absolute top-50 start-0 end-0 z-index1">
                  <div className="call-button text-center">
                    <button
                      type="button"
                      className="play-btn js-video-button"
                      data-video-id="152879427"
                      data-channel="vimeo"
                    >
                      <i className="fa fa-play bg-blue"></i>
                    </button>
                  </div>
                  <div className="video-figure"></div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="blog blog-left pt-10">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12">
              <div className="blog-single">
                <div className="blog-single-in d-md-flex align-items-center mb-4 text-center text-md-start">
                  <div className="blog-date me-4">
                    <div className="date text-center bg-theme p-5 py-4 rounded">
                      <h2 className="day mb-0 white">{blog && formatDate(blog.createdAt, 'dd')}</h2>
                      <div className="month white">
                        {blog && formatDate(blog.createdAt, 'month')}
                      </div>
                    </div>
                  </div>
                  <div className="blog-single-in-cont w-75">
                    <div className="blog-content">
                      <h2 className="blog-title mb-0">
                        <Link to="#" className="">
                          {blog && truncateText(blog.subTitle, 7)}
                        </Link>
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="blog-wrapper">
                  <div className="blog-content">
                    {/* <div className="blog-imagelist mb-3">
                      <img src={blog && blog.backgroundImage} alt="image" className="rounded" />
                    </div> */}
                    <p className="mb-3 text-capitalize">&nbsp; . {blog && blog.description}</p>
                  </div>

                  {/* <!-- blog blockquote --> */}
                  <div className="blog-quote mb-4 rounded">
                    <p className="white">
                      “To take a trivial example, which ever undertakes laborious physical work
                      exercise, except obtain some advantage blinded”{' '}
                    </p>
                    <span className="white">By John Smith</span>
                    <i className="fas fa-quote-left"></i>
                  </div>

                  <div className="blog-imagelist mb-4">
                    <div className="row">
                      {blog &&
                        blog.otherImages.map((image, index) => (
                          <div
                            className={
                              blog.otherImages.length === 1
                                ? 'col-md-12 col-sm-12 col-xs-12'
                                : 'col-md-6 col-sm-6 col-xs-12'
                            }
                          >
                            <img src={image} alt="image" className="rounded" />
                          </div>
                        ))}
                    </div>
                  </div>

                  <p className="mb-4">
                    <div
                      className="mb-4"
                      dangerouslySetInnerHTML={{ __html: blog ? blog.html : '' }}
                    ></div>
                  </p>

                  {/* <!-- blog share --> */}
                  <div className="blog-share d-flex justify-content-between align-items-center mb-4 bg-lgrey border rounded">
                    <div className="blog-share-tag">
                      <ul className="inline">
                        <li>
                          <strong>Posted In:</strong>
                        </li>
                        <li>
                          <Link to="#">Fashion,</Link>
                        </li>
                        <li>
                          <Link to="#">Beauty,</Link>
                        </li>
                        <li>
                          <Link to="#">Vacation,</Link>
                        </li>
                        <li>
                          <Link to="#">Travel,</Link>
                        </li>
                        <li>
                          <Link to="#">News</Link>
                        </li>
                      </ul>
                    </div>
                    <div className="header-social">
                      <ul className="d-flex align-items-center justify-content-center gap-2">
                        <li>
                          <Link to="#">
                            <i className="fab fa-facebook-f"></i>
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <i className="fab fa-google-plus-g"></i>
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <i className="fab fa-twitter"></i>
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <i className="fab fa-linkedin-in"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* <!-- author detail --> */}
                  <div className="blog-author mb-4 bg-grey border rounded">
                    <div className="blog-author-item">
                      <div className="row d-flex justify-content-between align-items-center">
                        <div className="col-md-3 col-sm-3 col-xs-12">
                          <div className="blog-thumb text-center position-relative">
                            <img
                              src="https://htmldesigntemplates.com/html/travelin/images/reviewer/1.jpg"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="col-md-9 col-sm-9 col-xs-12">
                          <h3 className="title pink">
                            <a href="#">
                              About Author <span>Graphic Designer</span>
                            </a>
                          </h3>
                          <p className="m-0">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sceler
                            neque in euismod. Nam vitae urnasodales neque in faucibus.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <!-- blog next prev --> */}
                  <div className="blog-next mb-4 d-sm-flex align-items-center rounded">
                    <Link to="#" className="d-block bg-theme">
                      <div className="prev ps-4">
                        <i className="fa fa-arrow-left white"></i>
                        <p className="m-0 white">Previous Post</p>
                        <p className="m-0 white">The bedding was hardly able</p>
                      </div>
                    </Link>
                    <Link to="#" className="d-block bg-grey">
                      <div className="next pr-4 text-right">
                        <i className="fa fa-arrow-right"></i>
                        <p className="m-0">Previous Post</p>
                        <p className="m-0">The bedding was hardly able</p>
                      </div>
                    </Link>
                  </div>

                  {/* <!-- blog comment list --> */}
                  <div className="single-comments single-box mb-4">
                    <h4 className="mb-4">Showing 16 verified guest comments</h4>
                    {blog &&
                      blog.comments &&
                      blog.comments.map((item, index) => (
                        <div className="comment-box w-100">
                          <div className="comment-image mt-2">
                            <img
                              src="https://htmldesigntemplates.com/html/travelin/images/reviewer/1.jpg"
                              alt="image"
                            />
                          </div>
                          <div className="comment-content rounded w-100">
                            <h4 className="mb-1 Soldman Kell">
                              {item.user.userName || 'Name Not Found'}
                            </h4>
                            <p className="comment-date">{formatDate(item.createdAt || null)}</p>
                            <div className="comment-rate">
                              <div className="rating">
                                <span className="fa fa-star checked"></span>
                                <span className="fa fa-star checked"></span>
                                <span className="fa fa-star checked"></span>
                                <span className="fa fa-star checked"></span>
                                <span className="fa fa-star checked"></span>
                              </div>
                            </div>

                            <p className="comment">{item.content || 'No Comment Found.'}</p>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* <!-- blog review --> */}
                  <div className="single-add-review">
                    <h4 className="">Write a Review</h4>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group mb-2">
                          <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Name"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group mb-2">
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Email"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 mb-1">
                        <div className="form-group">
                          <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Comment..."
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-btn">
                          <button onClick={handleAddComment} className="nir-btn">
                            Submit Review
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-12">
              <div className="sidebar-sticky">
                <div className="list-sidebar">
                  <div className="author-news mb-4 box-shadow border-all p-5 text-center rounded">
                    <div className="author-news-content">
                      <div className="author-thumb mb-1">
                        <img
                          src="https://htmldesigntemplates.com/html/travelin/images/reviewer/1.jpg"
                          alt="author"
                        />
                      </div>
                      <div className="author-content">
                        <h3 className="title mb-1">
                          <Link to="#">John Smith</Link>
                        </h3>
                        <p className="mb-2">
                          Hello, We’re content writer who is fascinated by content fashion,
                          celebrity and lifestyle. We helps clients bring the right content to the
                          right people.
                        </p>
                        <div className="header-social">
                          <ul>
                            <li>
                              <Link to="#">
                                <i className="fab fa-facebook-f"></i>
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <i className="fab fa-google-plus-g"></i>
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <i className="fab fa-twitter"></i>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sidebar-item mb-4">
                    <h4 className="">All Categories</h4>
                    <ul className="sidebar-category">
                      <li>
                        <Link to="#">All</Link>
                      </li>
                      <li>
                        <Link to="#">Featured</Link>
                      </li>
                      <li>
                        <Link to="#">Sliders</Link>
                      </li>
                      <li className="active">
                        <Link to="#">Manage Listings</Link>
                      </li>
                      <li>
                        <Link to="#">Address and Map</Link>
                      </li>
                      <li>
                        <Link to="#">Reservation Requests</Link>
                      </li>
                      <li>
                        <Link to="#">Your Reservation</Link>
                      </li>
                      <li>
                        <Link to="#">Search Results</Link>
                      </li>
                    </ul>
                  </div>

                  <div className="popular-post sidebar-item mb-4">
                    <div className="sidebar-tabs">
                      <div className="post-tabs">
                        {/* <!-- tab navs --> */}
                        <ul
                          className="nav nav-tabs nav-pills nav-fill"
                          id="postsTab1"
                          role="tablist"
                        >
                          <li className="nav-item" role="presentation">
                            <button
                              aria-selected="false"
                              className="nav-link active"
                              data-bs-target="#popular"
                              data-bs-toggle="tab"
                              id="popular-tab"
                              role="tab"
                              type="button"
                            >
                              Popular
                            </button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button
                              aria-selected="true"
                              className="nav-link"
                              data-bs-target="#recent"
                              data-bs-toggle="tab"
                              id="recent-tab"
                              role="tab"
                              type="button"
                            >
                              Recent
                            </button>
                          </li>
                        </ul>
                        {/* <!-- tab contents --> */}
                        <div className="tab-content" id="postsTabContent1">
                          {/* <!-- popular posts --> */}
                          <div
                            aria-labelledby="popular-tab"
                            className="tab-pane fade active show"
                            id="popular"
                            role="tabpanel"
                          >
                            <article className="post border-b pb-3">
                              <div className="s-content d-flex align-items-center justify-space-between">
                                <div className="sidebar-image w-25 me-3">
                                  <Link to="#">
                                    <img
                                      src="https://htmldesigntemplates.com/html/travelin/images/trending/trending10.jpg"
                                      alt=""
                                    />
                                  </Link>
                                </div>
                                <div className="content-list w-75">
                                  <h5 className="mb-1">
                                    <Link to="#">
                                      1Certified Graphic Design with Free Project Course
                                    </Link>
                                  </h5>
                                  <div className="date">12 Feb 2024</div>
                                </div>
                              </div>
                            </article>
                            <article className="post border-b pb-3">
                              <div className="s-content d-flex align-items-center justify-space-between">
                                <div className="sidebar-image w-25 me-3">
                                  <Link to="#">
                                    <img
                                      src="https://htmldesigntemplates.com/html/travelin/images/trending/trending10.jpg"
                                      alt=""
                                    />
                                  </Link>
                                </div>
                                <div className="content-list w-75">
                                  <h5 className="mb-1">
                                    <Link to="#">
                                      1Certified Graphic Design with Free Project Course
                                    </Link>
                                  </h5>
                                  <div className="date">12 Feb 2024</div>
                                </div>
                              </div>
                            </article>
                            <article className="post border-b pb-3">
                              <div className="s-content d-flex align-items-center justify-space-between">
                                <div className="sidebar-image w-25 me-3">
                                  <Link to="#">
                                    <img
                                      src="https://htmldesigntemplates.com/html/travelin/images/trending/trending10.jpg"
                                      alt=""
                                    />
                                  </Link>
                                </div>
                                <div className="content-list w-75">
                                  <h5 className="mb-1">
                                    <Link to="#">
                                      1Certified Graphic Design with Free Project Course
                                    </Link>
                                  </h5>
                                  <div className="date">12 Feb 2024</div>
                                </div>
                              </div>
                            </article>
                          </div>
                          {/* <!-- Recent posts --> */}
                          <div
                            aria-labelledby="recent-tab"
                            className="tab-pane fade"
                            id="recent"
                            role="tabpanel"
                          >
                            <article className="post border-b pb-3">
                              <div className="s-content d-flex align-items-center justify-space-between">
                                <div className="sidebar-image w-25 me-3">
                                  <Link to="#">
                                    <img
                                      src="https://htmldesigntemplates.com/html/travelin/images/trending/trending10.jpg"
                                      alt=""
                                    />
                                  </Link>
                                </div>
                                <div className="content-list w-75">
                                  <h5 className="mb-1">
                                    <Link to="#">
                                      1Certified Graphic Design with Free Project Course
                                    </Link>
                                  </h5>
                                  <div className="date">12 Feb 2024</div>
                                </div>
                              </div>
                            </article>
                            <article className="post border-b pb-3">
                              <div className="s-content d-flex align-items-center justify-space-between">
                                <div className="sidebar-image w-25 me-3">
                                  <Link to="#">
                                    <img
                                      src="https://htmldesigntemplates.com/html/travelin/images/trending/trending10.jpg"
                                      alt=""
                                    />
                                  </Link>
                                </div>
                                <div className="content-list w-75">
                                  <h5 className="mb-1">
                                    <Link to="#">
                                      1Certified Graphic Design with Free Project Course
                                    </Link>
                                  </h5>
                                  <div className="date">12 Feb 2024</div>
                                </div>
                              </div>
                            </article>
                            <article className="post border-b pb-3">
                              <div className="s-content d-flex align-items-center justify-space-between">
                                <div className="sidebar-image w-25 me-3">
                                  <Link to="#">
                                    <img
                                      src="https://htmldesigntemplates.com/html/travelin/images/trending/trending10.jpg"
                                      alt=""
                                    />
                                  </Link>
                                </div>
                                <div className="content-list w-75">
                                  <h5 className="mb-1">
                                    <Link to="#">
                                      1Certified Graphic Design with Free Project Course
                                    </Link>
                                  </h5>
                                  <div className="date">12 Feb 2024</div>
                                </div>
                              </div>
                            </article>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sidebar-item mb-4">
                    <h4 className="">Tags</h4>
                    <ul className="sidebar-tags d-flex flex-wrap gap-2">
                      <li>
                        <Link to="#">Tour</Link>
                      </li>
                      <li>
                        <Link to="#">Rental</Link>
                      </li>
                      <li>
                        <Link to="#">City</Link>
                      </li>
                      <li>
                        <Link to="#">Yatch</Link>
                      </li>
                      <li>
                        <Link to="#">Activity</Link>
                      </li>
                      <li>
                        <Link to="#">Museum</Link>
                      </li>
                      <li>
                        <Link to="#">Beauty</Link>
                      </li>
                      <li>
                        <Link to="#">classNameic</Link>
                      </li>
                      <li>
                        <Link to="#">Creative</Link>
                      </li>
                      <li>
                        <Link to="#">Designs</Link>
                      </li>
                      <li>
                        <Link to="#">Featured</Link>
                      </li>
                      <li>
                        <Link to="#">Free Style</Link>
                      </li>
                      <li>
                        <Link to="#">Programs</Link>
                      </li>
                      <li>
                        <Link to="#">Travel</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <WhatsAppHelp />
    </>
  )
}

export default BlogDetails

/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react'
import Header from '../components1/Header'
import { Link } from 'react-router-dom'
import Footer from '../components1/Footer'
import WhatsAppHelp from '../components1/WhatsAppHelp'
import { MyAPI, MyError } from '../MyAPI'
import EnquiryButton from '../components1/EnquiryButton'

function BlogsPage() {
  const [blogs, setBlogs] = useState([])

  const fetchBlogs = async () => {
    try {
      let res = await MyAPI.GET('/activeBlogs')
      let { success, message, error, data } = res.data || res
      console.log(res.data)
      if (success) {
        setBlogs(data)
      } else {
        MyError.error(message || error || 'API Error.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ')
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...'
    }
    return text
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
              <h1 className="mb-3">Blogs</h1>
              <nav aria-label="breadcrumb" className="d-block">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/">
                      {' '}
                      <span style={{ color: 'var(--secondary-color)' }}>Home</span>{' '}
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Blog's
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="dot-overlay"></div>
      </section>

      {/* <!-- blog starts --> */}
      <section className="blog">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 pe-lg-4">
              <div className="listing-inner">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="list-results d-flex align-items-center justify-content-between">
                      <div className="list-results-sort">
                        <p className="m-0">Showing 1-5 of 80 results</p>
                      </div>
                      <div className="click-menu d-flex align-items-center justify-content-between">
                        {/* <div className="change-list me-2 rounded overflow-hidden"><Link href="post-list-1.html"><i className="fa fa-bars bg-grey"></i></Link></div>
                                                <div className="change-grid f-active me-2 rounded overflow-hidden"><Link href="post-grid-1.html"><i className="fa fa-th"></i></Link></div> */}
                        <div className="sortby d-flex align-items-center justify-content-between ml-2">
                          <select className="niceSelect">
                            <option value="1">Sort By</option>
                            <option value="2">Average rating</option>
                            <option value="3">Price: low to high</option>
                            <option value="4">Price: high to low</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {blogs &&
                    blogs.length > 0 &&
                    blogs.map((blog, index) => (
                      <div className="col-lg-6">
                        <div className="trend-item box-shadow bg-white mb-4 rounded overflow-hidden">
                          <div className="trend-image">
                            <img src={blog.coverImage} alt="image" />
                          </div>
                          <div className="trend-content-main p-4 pb-2">
                            <div className="trend-content">
                              <h5 className="theme mb-1">Technology</h5>
                              <h4>
                                <Link to={`/blog/${blog._id}`}>{blog.title ?? ''}</Link>
                              </h4>
                              <p className="mb-3">{truncateText(blog.description ?? '', 30)}</p>
                              <div className="entry-meta d-flex align-items-center justify-content-between">
                                <div className="entry-author mb-2">
                                  <img
                                    src="https://htmldesigntemplates.com/html/travelin/images/reviewer/1.jpg"
                                    alt=""
                                    className="rounded-circle me-1"
                                  />
                                  <span>John Smith</span>
                                </div>
                                <div className="entry-button d-flex align-items-center mb-2">
                                  <Link to={`/blog/${blog._id}`} className="nir-btn">
                                    Read More
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                  {/* <div className="col-lg-6">
                    <div className="trend-item box-shadow bg-white mb-4 rounded overflow-hidden">
                      <div className="trend-image">
                        <img
                          src="https://htmldesigntemplates.com/html/travelin/images/trending/trending10.jpg"
                          alt="image"
                        />
                      </div>
                      <div className="trend-content-main p-4 pb-2">
                        <div className="trend-content">
                          <h5 className="theme mb-1">Technology</h5>
                          <h4>
                            <Link to="/blog/142512001">
                              How a developer duo at Deutsche Bank keep remote alive.
                            </Link>
                          </h4>
                          <p className="mb-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                          </p>
                          <div className="entry-meta d-flex align-items-center justify-content-between">
                            <div className="entry-author mb-2">
                              <img
                                src="https://htmldesigntemplates.com/html/travelin/images/reviewer/1.jpg"
                                alt=""
                                className="rounded-circle me-1"
                              />
                              <span>John Smith</span>
                            </div>
                            <div className="eentry-button d-flex align-items-center mb-2">
                              <Link to="/blog/142512001" className="nir-btn">
                                Read More
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>

                <div className="pagination-main text-center">
                  <ul className="pagination">
                    <li>
                      <Link to="#">
                        <i className="fa fa-angle-double-left" aria-hidden="true"></i>
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="#">1</Link>
                    </li>
                    <li>
                      <Link to="#">2</Link>
                    </li>
                    <li>
                      <Link to="#">3</Link>
                    </li>
                    <li>
                      <Link to="#">4</Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* <!-- sidebar starts --> */}
            <div className="col-lg-4 ps-lg-4">
              <div className="sidebar-sticky">
                <div className="list-sidebar">
                  <div className="sidebar-item">
                    <h4 className="">Search Here</h4>
                    <div className="newsletter-form rounded overflow-hidden position-relative">
                      <form>
                        <input type="text" placeholder="Search your keyword here.." />
                        <input
                          type="submit"
                          className="nir-btn bordernone rounded-0 position-absolute end-0"
                          value="Search"
                        />
                      </form>
                    </div>
                  </div>

                  <div className="author-news mb-4 box-shadow p-5 text-center rounded overflow-hidden border-all">
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
                          <ul classNameName="d-flex gap-2 align-items-center justify-content-center">
                            <li>
                              <Link to="#">
                                <i className="fab fa-facebook-f rounded"></i>
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <i className="fab fa-google-plus-g rounded"></i>
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <i className="fab fa-twitter rounded"></i>
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
                          <li className="nav-item d-inline-block" role="presentation">
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
                          <li className="nav-item d-inline-block" role="presentation">
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
                            <article className="post mb-2 border-b pb-2">
                              <div className="s-content d-flex align-items-center justify-space-between">
                                <div className="sidebar-image w-25 me-3 rounded">
                                  <Link to="#">
                                    <img src="images/trending/trending1.jpg" alt="" />
                                  </Link>
                                </div>
                                <div className="content-list w-75">
                                  <h5 className="mb-1">
                                    <Link to="#">An Incredibly Easy Method That Works For All</Link>
                                  </h5>
                                  <div className="date">10 Apr 2024</div>
                                </div>
                              </div>
                            </article>

                            <article className="post border-b pb-2 mb-2">
                              <div className="s-content d-flex align-items-center justify-space-between">
                                <div className="sidebar-image w-25 me-3 rounded">
                                  <Link to="#">
                                    <img
                                      src="https://htmldesigntemplates.com/html/travelin/images/trending/trending10.jpg"
                                      alt=""
                                    />
                                  </Link>
                                </div>
                                <div className="content-list w-75">
                                  <h5 className="mb-1">
                                    <Link to="#">15 Unheard Ways To Achieve Greater Walker</Link>
                                  </h5>
                                  <div className="date">29 Mar 2024</div>
                                </div>
                              </div>
                            </article>

                            <article className="post mb-2 border-b pb-2">
                              <div className="s-content d-flex align-items-center justify-space-between">
                                <div className="sidebar-image w-25 me-3 rounded">
                                  <Link to="#">
                                    <img
                                      src="https://htmldesigntemplates.com/html/travelin/images/trending/trending10.jpg"
                                      alt=""
                                    />
                                  </Link>
                                </div>
                                <div className="content-list w-75">
                                  <h5 className="mb-1">
                                    <Link to="#">An Incredibly Easy Method That Works For All</Link>
                                  </h5>
                                  <div className="date">10 Apr 2024</div>
                                </div>
                              </div>
                            </article>

                            <article className="post">
                              <div className="s-content d-flex align-items-center justify-space-between">
                                <div className="sidebar-image w-25 me-3 rounded">
                                  <Link to="#">
                                    <img
                                      src="https://htmldesigntemplates.com/html/travelin/images/trending/trending10.jpg"
                                      alt=""
                                    />
                                  </Link>
                                </div>
                                <div className="content-list w-75">
                                  <h5 className="mb-1">
                                    <Link to="#">15 Unheard Ways To Achieve Greater Walker</Link>
                                  </h5>
                                  <div className="date">21 Feb 2024</div>
                                </div>
                              </div>
                            </article>
                          </div>
                          <div
                            aria-labelledby="recent-tab"
                            className="tab-pane fade"
                            id="recent"
                            role="tabpanel"
                          >
                            <article className="post mb-2 border-b pb-2">
                              <div className="s-content d-flex align-items-center justify-space-between">
                                <div className="sidebar-image w-25 me-3 rounded">
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
                                      10 Ways To Immediately Start Selling Furniture
                                    </Link>
                                  </h5>
                                  <div className="date">08 Mar 2024</div>
                                </div>
                              </div>
                            </article>

                            <article className="post border-b pb-2 mb-2">
                              <div className="s-content d-flex align-items-center justify-space-between">
                                <div className="sidebar-image w-25 me-3 rounded">
                                  <Link to="#">
                                    <img src="images/trending/trending6.jpg" alt="" />
                                  </Link>
                                </div>
                                <div className="content-list w-75">
                                  <h5 className="mb-1">
                                    <Link to="#">
                                      Photography Photo modify and Beautiful Walker
                                    </Link>
                                  </h5>
                                  <div className="date">18 Jan 2024</div>
                                </div>
                              </div>
                            </article>

                            <article className="post mb-2 border-b pb-2">
                              <div className="s-content d-flex align-items-center justify-space-between">
                                <div className="sidebar-image w-25 me-3 rounded">
                                  <Link to="#">
                                    <img
                                      src="https://htmldesigntemplates.com/html/travelin/images/trending/trending10.jpg"
                                      alt=""
                                    />
                                  </Link>
                                </div>
                                <div className="content-list w-75">
                                  <h5 className="mb-1">
                                    <Link to="#">An Incredibly Easy Method That Works For All</Link>
                                  </h5>
                                  <div className="date">10 Apr 2024</div>
                                </div>
                              </div>
                            </article>

                            <article className="post">
                              <div className="s-content d-flex align-items-center justify-space-between">
                                <div className="sidebar-image w-25 me-3 rounded">
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
      {/* <!-- blog Ends -->   */}

      <Footer />
      <WhatsAppHelp />
    </>
  )
}

export default BlogsPage

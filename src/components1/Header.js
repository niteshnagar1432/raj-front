/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
// import logo from "../images/logo.png";
// import logo from "../images/my-img/logo-removebg-preview.png";
import logo from '../assets/Logo/Brown/RajputanaRoutes-logo-Brown-rgb-600px.png'
import { Link, useNavigate } from 'react-router-dom'
import { IoCallOutline } from 'react-icons/io5'
import { MyAPI, MyError, MyToken } from '../MyAPI'

function Header() {
  const navigate = useNavigate()
  const [isUser, setIsUser] = useState(false)
  const isLocalUser = localStorage.getItem('isUser')
  const isLocalAdmin = localStorage.getItem('isAdmin')
  const token = MyToken.getItem()
  const [AllDestinations, setAllDestinations] = useState([])

  const fetchAllDestinations = async () => {
    try {
      let res = await MyAPI.GET('/public/destinations')
      let { success, message, error, data } = res.data || res
      if (success) {
        setAllDestinations(data)
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllDestinations()
    if ((isLocalUser || isLocalAdmin) && token) {
      setIsUser(true)
    } else {
      setIsUser(false)
    }
  }, [isLocalUser, isLocalAdmin, token])

  useEffect(() => {
    window.addEventListener('scroll', function () {
      var scrollValue = window.pageYOffset
      var headerMenu = document.querySelector('.header_menu')

      if (scrollValue > 70) {
        headerMenu.classList.add('fixed-top', 'animated', 'slideInDown')
      } else {
        headerMenu.classList.remove('fixed-top', 'animated', 'slideInDown')
      }
    })

    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 10) {
        document.querySelector('.navbar').classList.add('navbar-sticky-in')
      } else {
        document.querySelector('.navbar').classList.remove('navbar-sticky-in')
      }
    })

    // document.querySelectorAll(".navbar li").forEach(function (elem) {
    //   elem.addEventListener("mouseenter", function () {
    //     var ul = this.querySelector("ul");
    //     if (ul) {
    //       ul.style.display = "block";
    //       setTimeout(function () {
    //         ul.style.opacity = "1";
    //         ul.style.transform = "translateY(0)";
    //       }, 50);
    //     }
    //   });

    //   elem.addEventListener("mouseleave", function () {
    //     var ul = this.querySelector("ul");
    //     if (ul) {
    //       ul.style.opacity = "0";
    //       ul.style.transform = "translateY(10px)";
    //       setTimeout(function () {
    //         ul.style.display = "none";
    //       }, 300);
    //     }
    //   });
    // });

    if (window.innerWidth > 992) {
      document.querySelectorAll('.navbar-arrow ul ul > li').forEach(function (elem) {
        var anchor = elem.querySelector('a')
        if (anchor && elem.querySelector('ul')) {
          var arrowIndicator = document.createElement('i')
          arrowIndicator.classList.add('arrow-indicator', 'fa', 'fa-angle-right')
          anchor.appendChild(arrowIndicator)
        }
      })
    }
  }, [])

  const [isOpen, setIsOpen] = useState(false)
  const [homeIsOpen, setHomeIsOpen] = useState(false)

  const getFormattedDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return new Date().toLocaleDateString('en-US', options)
  }

  return (
    <>
      <header className="main_header_area">
        <div className="header-content py-1 bg-theme">
          <div className="container d-flex align-items-center justify-content-between">
            <div className="links">
              <ul>
                <li>
                  <a href="#" className="white">
                    <i className="icon-calendar white"></i>&nbsp; {getFormattedDate()}
                  </a>
                </li>
                <li>
                  <a href="#" className="white">
                    <i className="icon-location-pin white"></i> Rajasthan, India
                  </a>
                </li>
                <li>
                  <a href="#" className="white">
                    <i className="icon-clock white"></i> Mon-Fri: 10 AM – 5 PM
                  </a>
                </li>
              </ul>
            </div>
            <div className="links float-right">
              <ul>
                <li>
                  <a href="#" className="white">
                    <i className="fab fa-facebook" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="white">
                    <i className="fab fa-twitter" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="white">
                    <i className="fab fa-instagram" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="white">
                    <i className="fab fa-linkedin " aria-hidden="true"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="header_menu" id="header_menu">
          <nav className="navbar navbar-default">
            <div className="container">
              <div className="navbar-flex d-flex align-items-center justify-content-between w-100 pb-3 pt-3">
                {/* <!-- Brand and toggle get grouped for better mobile display --> */}
                <div className="navbar-header">
                  <Link className="navbar-brand" href="#">
                    <img
                      style={{
                        width: '45px',
                        height: 'auto',
                        objectFit: 'contain',
                        borderRadius: '7px',
                      }}
                      src={logo}
                      alt="image"
                    />
                  </Link>
                </div>
                {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
                <div
                  className="navbar-collapse1 d-flex align-items-center"
                  id="bs-example-navbar-collapse-1"
                >
                  <ul className="nav navbar-nav" id="responsive-menu">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    {/* <li>
                      <Link href="#">About Us</Link>
                    </li> */}

                    <li className="submenu dropdown">
                      <Link
                        to="#"
                        className="dropdown-toggle"
                        data-toggle="dropdown"
                        role="button"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Tour Packages <i className="icon-arrow-down" aria-hidden="true"></i>
                      </Link>
                      <ul className="dropdown-menu">
                        {AllDestinations &&
                          AllDestinations.length > 0 &&
                          AllDestinations.map(
                            (item, index) =>
                              item.packages &&
                              item.packages.length > 0 && (
                                <li key={index}>
                                  <Link to={`/${item._id}`}>{item.name}</Link>
                                </li>
                              ),
                          )}
                        {AllDestinations && AllDestinations.length === 0 && (
                          <li>Description Not Found</li>
                        )}
                      </ul>
                    </li>
                    <li>
                      <Link to="/book/car">Car Rental</Link>
                    </li>
                    <li>
                      <Link to="/hot/deals">Hot Deals</Link>
                    </li>
                    <li>
                      <Link to="/blogs">Blogs</Link>
                    </li>
                  </ul>
                </div>
                <div className="register-login d-flex align-items-center">
                  {isUser ? (
                    <Link
                      to={isLocalAdmin ? '/admin/dashboard' : '/user/dashboard'}
                      className="me-3"
                    >
                      <i className="icon-user"></i> Dashboard
                    </Link>
                  ) : (
                    <Link to="/login" className="me-3">
                      <i className="icon-user"></i> Login/Register
                    </Link>
                  )}

                  <Link to="tel:+919090403075">
                    <div className="px-3 py-1 rounded-5 primaryBoarder">
                      <IoCallOutline size={22} color="var(--primary-color)" />{' '}
                      <span style={{ color: 'var(--primary-color)' }}>+91-9090403075</span>
                    </div>
                  </Link>
                </div>

                {/* <div id="slicknav-mobile"></div> */}
                <div className="slicknav_menu">
                  <Link
                    href="#"
                    aria-haspopup="true"
                    tabindex="0"
                    // className="slicknav_btn slicknav_open "
                    // className="slicknav_btn slicknav_collapsed"
                    onClick={() => setIsOpen(!isOpen)}
                    className={
                      isOpen ? 'slicknav_btn slicknav_open' : 'slicknav_btn slicknav_collapsed'
                    }

                    // style="outline: none;"
                  >
                    <span className="slicknav_menutxt"></span>
                    <span className="slicknav_icon slicknav_no-text">
                      <span className="slicknav_icon-bar"></span>
                      <span className="slicknav_icon-bar"></span>
                      <span className="slicknav_icon-bar"></span>
                    </span>
                  </Link>
                  <ul
                    className={isOpen ? 'slicknav_nav' : 'slicknav_nav d-none'}
                    // style=""
                    role="menu"
                    aria-hidden="false"
                  >
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li className="dropdown submenu active slicknav_collapsed slicknav_parent">
                      <Link
                        href="#"
                        role="menuitem"
                        aria-haspopup="true"
                        tabindex="0"
                        className="slicknav_item slicknav_row"
                        // style="outline: none;"
                      >
                        <Link
                          href="#"
                          className="dropdown-toggle"
                          data-toggle="dropdown"
                          role="button"
                          aria-haspopup="true"
                          aria-expanded="false"
                          tabindex="0"
                        >
                          Tour Packages <i className="icon-arrow-down" aria-hidden="true"></i>
                        </Link>
                        <span className="slicknav_arrow" onClick={() => setHomeIsOpen(!homeIsOpen)}>
                          {homeIsOpen ? (
                            <i className="fa fa-minus"></i>
                          ) : (
                            <i className="fa fa-plus"></i>
                          )}
                        </span>
                      </Link>
                      <ul
                        className={
                          homeIsOpen
                            ? 'dropdown-menu slicknav_hidden'
                            : 'dropdown-menu slicknav_hidden d-none'
                        }
                        role="menu"
                        aria-hidden="true"
                      >
                        {AllDestinations &&
                          AllDestinations.length > 0 &&
                          AllDestinations.map(
                            (item, index) =>
                              item.packages &&
                              item.packages.length > 0 && (
                                <li key={index}>
                                  <Link to={`/${item._id}`}>{item.name}</Link>
                                </li>
                              ),
                          )}

                        {AllDestinations && AllDestinations.length === 0 && (
                          <li>Description Not Found</li>
                        )}
                      </ul>
                    </li>
                    <li>
                      <Link to="/book/car">Car Rental</Link>
                    </li>
                    <li>
                      <Link to="/hot/deals">Hot Deals</Link>
                    </li>
                    <li>
                      <Link to="/blogs">Blogs</Link>
                    </li>
                    {isUser ? (
                      <Link
                        to={isLocalAdmin ? '/admin/dashboard' : '/user/dashboard'}
                        className="me-3"
                      >
                        <i className="icon-user"></i> Dashboard
                      </Link>
                    ) : (
                      <Link to="/login" className="me-3">
                        <i className="icon-user"></i> Login/Register
                      </Link>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <div className="tet"></div>
    </>
  )
}

export default Header

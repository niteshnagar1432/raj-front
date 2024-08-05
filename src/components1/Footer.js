import React, { useEffect } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'

// import img1 from "../images/logo-white.png";
// import img1 from '../images/my-img/logo-removebg-preview.png'
import img1 from '../assets/Logo/Brown/RajputanaRoutes-logo-Brown-rgb.svg'
import img2 from '../images/insta/ins-3.jpg'
import img3 from '../images/insta/ins-4.jpg'
import img4 from '../images/insta/ins-5.jpg'
import img5 from '../images/insta/ins-1.jpg'
import img6 from '../images/insta/ins-7.jpg'
import img7 from '../images/insta/ins-8.jpg'
import img8 from '../images/insta/ins-2.jpg'
import img9 from '../images/insta/ins-6.jpg'
import img10 from '../images/insta/ins-9.jpg'
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="pt-20 pb-4 footer-bg-img-1">
      <div className="section-shape top-0 footer-bg-img-2"></div>
      {/* <!-- Instagram starts --> */}
      <div className="insta-main pb-10">
        <div className="container">
          <div className="insta-inner">
            <div className="follow-button" style={{ zIndex: '142512001' }}>
              <h5 className="m-0 rounded">
                <i className="fab fa-instagram"></i> Follow on Instagram
              </h5>
            </div>
            <div className="row attract-slider">
              <Swiper
                modules={[Navigation, Pagination, Autoplay, Scrollbar, A11y]}
                slidesPerView={window.innerWidth > 768 ? 9 : 2}
                spaceBetween={4}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                allowSlideNext
              >
                <SwiperSlide>
                  <div className="col-md-12 col-sm-6">
                    <div className="insta-image rounded">
                      <Link href="#">
                        <img src={img2} alt="insta" />
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="col-md-12 col-sm-6">
                    <div className="insta-image rounded">
                      <Link href="#">
                        <img src={img3} alt="insta" />
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="col-md-12 col-sm-6">
                    <div className="insta-image rounded">
                      <Link href="#">
                        <img src={img4} alt="insta" />
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="col-md-12 col-sm-6">
                    <div className="insta-image rounded">
                      <Link href="#">
                        <img src={img5} alt="insta" />
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="col-md-12 col-sm-6">
                    <div className="insta-image rounded">
                      <Link href="#">
                        <img src={img6} alt="insta" />
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="col-md-12 col-sm-6">
                    <div className="insta-image rounded">
                      <Link href="#">
                        <img src={img7} alt="insta" />
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="col-md-12 col-sm-6">
                    <div className="insta-image rounded">
                      <Link href="#">
                        <img src={img8} alt="insta" />
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="col-md-12 col-sm-6">
                    <div className="insta-image rounded">
                      <Link href="#">
                        <img src={img9} alt="insta" />
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="col-md-12 col-sm-6">
                    <div className="insta-image rounded">
                      <Link href="#">
                        <img src={img10} alt="insta" />
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="col-md-12 col-sm-6">
                    <div className="insta-image rounded">
                      <Link href="#">
                        <img src={img10} alt="insta" />
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="col-md-12 col-sm-6">
                    <div className="insta-image rounded">
                      <Link href="#">
                        <img src={img10} alt="insta" />
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="col-md-12 col-sm-6">
                    <div className="insta-image rounded">
                      <Link href="#">
                        <img src={img10} alt="insta" />
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="col-md-12 col-sm-6">
                    <div className="insta-image rounded">
                      <Link href="#">
                        <img src={img10} alt="insta" />
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="col-md-12 col-sm-6">
                    <div className="insta-image rounded">
                      <Link href="#">
                        <img src={img10} alt="insta" />
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Instagram ends --> */}
      <div className="footer-upper pb-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4 pe-4">
              <div className="footer-about">
                <img style={{ width: '65px', height: '100%' }} src={img1} alt="" />
                <p className="mt-3 mb-3 white">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio suspendisse leo
                  neque iaculis molestie sagittis maecenas aenean eget molestie sagittis.
                </p>
                <ul>
                  <li className="white">
                    <strong>Contact No.:</strong> +91-967-215-3193
                  </li>
                  <li className="white">
                    <strong>Location:</strong> Hardev Colony, Sita Bari, Jaipur, Rajasthan 302011
                  </li>
                  <li className="white">
                    <strong>Email:</strong> hola@traveolla.com
                  </li>
                  <li className="white">
                    <strong>Website:</strong> www.traveolla.com
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-12 mb-4">
              <div className="footer-links">
                <h3 className="white">Quick link</h3>
                <ul>
                  <li>
                    <Link href="#">About Us</Link>
                  </li>
                  <li>
                    <Link href="#">Delivery Information</Link>
                  </li>
                  <li>
                    <Link href="#">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="#">Terms &amp; Conditions</Link>
                  </li>
                  <li>
                    <Link href="#">Customer Service</Link>
                  </li>
                  <li>
                    <Link href="##">Return Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-12 mb-4">
              <div className="footer-links">
                <h3 className="white">Categories</h3>
                <ul>
                  <li>
                    <Link href="#">Travel</Link>
                  </li>
                  <li>
                    <Link href="#">Technology</Link>
                  </li>
                  <li>
                    <Link href="#">Lifestyle</Link>
                  </li>
                  <li>
                    <Link href="#">Destinations</Link>
                  </li>
                  <li>
                    <Link href="#">Entertainment</Link>
                  </li>
                  <li>
                    <Link href="#">Business</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className="footer-links">
                <h3 className="white">Newsletter</h3>
                <div className="newsletter-form ">
                  <p className="mb-3">
                    Jin our community of over 200,000 global readers who receives emails filled with
                    news, promotions, and other good stuff.
                  </p>
                  <form
                    action="#"
                    method="get"
                    // accept-charset="utf-8"
                    className="border-0 d-flex align-items-center"
                  >
                    <input type="text" placeholder="Email Address" />
                    <button className="nir-btn ms-2">Subscribe</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-payment">
        <div className="container">
          <div className="row footer-pay align-items-center justify-content-between text-lg-start text-center">
            <div className="col-lg-8 footer-payment-nav mb-4">
              <ul className="">
                <li className="me-2">We Support:</li>
                <li className="me-2">
                  <i className="fab fa-cc-mastercard fs-4"></i>
                </li>
                <li className="me-2">
                  <i className="fab fa-cc-paypal fs-4"></i>
                </li>
                <li className="me-2">
                  <i className="fab fa-cc-stripe fs-4"></i>
                </li>
                <li className="me-2">
                  <i className="fab fa-cc-visa fs-4"></i>
                </li>
                <li className="me-2">
                  <i className="fab fa-cc-discover fs-4"></i>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 footer-payment-nav mb-4">
              <ul className="d-flex align-items-center">
                <li className="me-2 w-75">
                  <select className="niceSelect rounded">
                    <option>English</option>
                    <option>Chinese</option>
                    <option>Russian</option>
                    <option>Japanese</option>
                    <option>Korean</option>
                  </select>
                </li>
                <li className="w-25">
                  <select className="niceSelect rounded">
                    <option>$ USD</option>
                    <option>$ AUD</option>
                    <option>$ YEN</option>
                    <option>$ IN</option>
                    <option>$ NP</option>
                  </select>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <div className="container">
          <div className="copyright-inner rounded p-3 d-md-flex align-items-center justify-content-between">
            <div className="copyright-text">
              <p className="m-0 white">2024 Traveolla. All rights reserved.</p>
            </div>
            <div className="social-links">
              <ul>
                <li>
                  <Link href="#">
                    <i className="fab fa-facebook" aria-hidden="true"></i>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <i className="fab fa-twitter" aria-hidden="true"></i>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <i className="fab fa-instagram" aria-hidden="true"></i>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <i className="fab fa-linkedin" aria-hidden="true"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div id="particles-js"></div>
    </footer>
  )
}

export default Footer

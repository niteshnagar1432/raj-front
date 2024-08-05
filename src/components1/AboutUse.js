import React from 'react'

function AboutUse() {
  return (
    <section className="about-us pb-6 pt-6 home-about-us-bg-img">
      <div className="container">
        <div className="section-title mb-6 w-50 mx-auto text-center">
          {/* <h4 className="mb-1 theme1">3 Step of The Perfect Tour</h4> */}
          <h2 className="mb-1">
            Why <span className="theme">Rajputana Routes</span>
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore.
          </p>
        </div>

        {/* <!-- why us starts --> */}
        <div className="why-us">
          <div className="why-us-box">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                <div className="why-us-item text-center p-4 py-5 border rounded bg-white">
                  <div className="why-us-content">
                    <div className="why-us-icon">
                      <i className="icon-flag theme"></i>
                    </div>
                    <h4>
                      <a href="about.html">Tell Us What You want To Do</a>
                    </h4>
                    <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                <div className="why-us-item text-center p-4 py-5 border rounded bg-white">
                  <div className="why-us-content">
                    <div className="why-us-icon">
                      <i className="icon-location-pin theme"></i>
                    </div>
                    <h4>
                      <a href="about.html">Share Your Travel Locations</a>
                    </h4>
                    <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                <div className="why-us-item text-center p-4 py-5 border rounded bg-white">
                  <div className="why-us-content">
                    <div className="why-us-icon">
                      <i className="icon-directions theme"></i>
                    </div>
                    <h4>
                      <a href="about.html">Share Your Travel Preference</a>
                    </h4>
                    <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                <div className="why-us-item text-center p-4 py-5 border rounded bg-white">
                  <div className="why-us-content">
                    <div className="why-us-icon">
                      <i className="icon-compass theme"></i>
                    </div>
                    <h4>
                      <a href="about.html">We are 100% Trusted Tour Agency</a>
                    </h4>
                    <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- why us ends --> */}
      </div>
      <div className="white-overlay"></div>
    </section>
  )
}

export default AboutUse

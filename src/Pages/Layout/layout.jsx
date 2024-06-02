import React, { useEffect, useState, useRef } from "react";
import { Route, Routes, NavLink, Link } from "react-router-dom";
import Post from "../../components/Post/post";
import Subscriptions from "../../components/Subscriptions/subscriptions";
import "./layout.style.css";
import { getUserByEmail } from "./services/layout.service.ts";
import { assignUserIntoFreeSubscription } from "../../components/Login/services/login.service.ts";
import { useNavigate } from 'react-router-dom';


import instagram from "./image/instagram.png"
import app from "./image/Image 1.png"
import mobile from "./image/Mask Group 1.png"
import twitter from "./image/twitter.png"
import youtube from "./image/youtube.png"
import facebook from "./image/facebook.png"

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isNavFixed, setIsNavFixed] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const handleLogout  = () => {
    const email = localStorage.getItem("email");
    if (email) {
      localStorage.removeItem('email');
      navigate('/login');
    }
  }

  useEffect(() => {

    // Get User Data By Email
    const fetchUser = async () => {
      try {
        const email = localStorage.getItem("email");
        const result = await getUserByEmail(email);
        if (result.email == null) {
          navigate('/login');
        } else {
          setUserData(result);
        }
      } catch (error) {}
    };
    fetchUser();
    


    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [navigate]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsNavFixed(true);
      } else {
        setIsNavFixed(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <nav className={isNavFixed ? 'nav-fixed navbar navbar-expand-lg navbar-light' : 'navbar navbar-expand-lg navbar-light'} >
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="dropdown-container" ref={dropdownRef}>
            <div className="dropdown right" open={isOpen}>
              {userData ? (
                <>
                  <div className="avatar" id="avatar" onClick={toggleDropdown}>
                    <img src={userData.picture} alt={userData.name} />
                  </div>
                  {isOpen && (
                    <ul>
                      <li className="tab">
                        <span className="block bold">{userData.name}</span>
                      </li>
                      <li className="tab">
                        <span className="block italic">{userData.email}</span>
                      </li>
                      <li className="divider"></li>
                      <li>
                        <button onClick={() => handleLogout()}>
                          <span className="material-symbols-outlined">
                            تسجيل خروج
                          </span>
                        </button>
                      </li>
                    </ul>
                  )}
                </>
              ) : (
                <>
                  <div className="avatar" id="avatar">
                    <img
                      src="https://gravatar.com/avatar/00000000000000000000000000000000?d=mp"
                      alt=""
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <NavLink className="nav-link" to="/">
                  الرئيسية
                </NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="account.html">
                  حسابى
                </a>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/subscriptions">
                  الاشتراكات
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-5 mb-5">
        <Routes>
          <Route exact path="/" element={<Post />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
        </Routes>
      </div>

      <div class="footer">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4 mb-lg-0 mb-4" data-aos-delay="100" data-aos-duration="800" data-aos="zoom-in-down" >
                        <h4>من نحن</h4>
                        <p>
                            هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.
                        </p>
                    </div>
                    <div class="col-lg-4 mb-lg-0 mb-5 center" data-aos-delay="100" data-aos-duration="800" data-aos="zoom-in-down">
                        <ul>
                            <li data-aos-delay="200" data-aos-duration="800" data-aos="zoom-in">
                                <i class="fas fa-map-marker-alt"></i>
                                عنوان الشركة
                            </li>
                            <li data-aos-delay="200" data-aos-duration="800" data-aos="zoom-in">
                                <i class="fas fa-phone-square"></i>
                                الادارة: 65116146
                            </li>
                            <li data-aos-delay="200" data-aos-duration="800" data-aos="zoom-in">
                                <i class="fas fa-headphones-alt"></i>
                                الدعم الفني: 66058882
                            </li>
                            <li data-aos-delay="200" data-aos-duration="800" data-aos="zoom-in">
                                <i class="fas fa-envelope"></i>
                                البرید الالکترونی info@ajrnii.com
                            </li>
                        </ul>
                        <h4 data-aos-delay="200" data-aos-duration="800" data-aos="fade-in">تابعونا علي مواقع التواصل</h4>
                        <hr />
                        <a href="#">
                            <img src={instagram} alt="" />
                        </a>
                        <a href="#">
                            <img src={facebook} alt="" />
                        </a>
                        <a href="#">
                            <img src={twitter} alt=""/>
                        </a>
                        <a href="#">
                            <img src={youtube} alt=""/>
                        </a>

                    </div>
                    <div class="col-lg-4 left" data-aos-delay="100" data-aos-duration="800" data-aos="zoom-in-down">
                        <h4>حمل التطبيق الان </h4>
                        <img class="bg" src={mobile} alt=""/>
                        <a href="#">
                            <img class="app" src={app} alt=""/>
                        </a>
                    </div>
                </div>
            </div>
            <div class="copy">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6 text-md-right text-center mb-md-0 mb-2">جميع الحقوق محفوظة لشركة </div>
                        <div class="col-md-6 text-md-left text-center">تصميم وبرمجة فريق Abdallah Fathy</div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default Layout;

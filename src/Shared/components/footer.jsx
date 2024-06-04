import React from "react";
import "boxicons";

import instagram from "../image/instagram.png"
import app from "../image/Image 1.png"
import mobile from "../image/Mask Group 1.png"
import twitter from "../image/twitter.png"
import youtube from "../image/youtube.png"
import facebook from "../image/facebook.png"

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-4 mb-lg-0 mb-4"
              data-aos-delay="100"
              data-aos-duration="800"
              data-aos="zoom-in-down"
            >
              <h4>من نحن</h4>
              <p>
                هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد
                هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو
                العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها
                التطبيق.
              </p>
            </div>
            <div
              className="col-lg-4 mb-lg-0 mb-5 center"
              data-aos-delay="100"
              data-aos-duration="800"
              data-aos="zoom-in-down"
            >
              <ul>
                <li
                  data-aos-delay="200"
                  data-aos-duration="800"
                  data-aos="zoom-in"
                >
                  <i className="fas fa-map-marker-alt"></i>
                  عنوان الشركة
                </li>
                <li
                  data-aos-delay="200"
                  data-aos-duration="800"
                  data-aos="zoom-in"
                >
                  <i className="fas fa-phone-square"></i>
                  الادارة: 65116146
                </li>
                <li
                  data-aos-delay="200"
                  data-aos-duration="800"
                  data-aos="zoom-in"
                >
                  <i className="fas fa-headphones-alt"></i>
                  الدعم الفني: 66058882
                </li>
                <li
                  data-aos-delay="200"
                  data-aos-duration="800"
                  data-aos="zoom-in"
                >
                  <i className="fas fa-envelope"></i>
                  البرید الالکترونی info@ajrnii.com
                </li>
              </ul>
              <h4
                data-aos-delay="200"
                data-aos-duration="800"
                data-aos="fade-in"
              >
                تابعونا علي مواقع التواصل
              </h4>
              <hr />
              <a href="#">
                <img src={instagram} alt="" />
              </a>
              <a href="#">
                <img src={facebook} alt="" />
              </a>
              <a href="#">
                <img src={twitter} alt="" />
              </a>
              <a href="#">
                <img src={youtube} alt="" />
              </a>
            </div>
            <div
              className="col-lg-4 left"
              data-aos-delay="100"
              data-aos-duration="800"
              data-aos="zoom-in-down"
            >
              <h4>حمل التطبيق الان </h4>
              <img className="bg" src={mobile} alt="" />
              <a href="#">
                <img className="app" src={app} alt="" />
              </a>
            </div>
          </div>
        </div>
        <div className="copy">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-md-right text-center mb-md-0 mb-2">
                جميع الحقوق محفوظة لشركة{" "}
              </div>
              <div className="col-md-6 text-md-left text-center">
                تصميم وبرمجة Abdallah Fathy
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;

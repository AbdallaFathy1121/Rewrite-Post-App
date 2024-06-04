import React, { useEffect, useState, useRef } from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import { getUserByEmail } from "../../components/Login/services/login.service.ts";
import { useNavigate } from "react-router-dom";
import Roles from "../../Shared/roles.js";
import "./dashboard.style.css";
import "boxicons";
import Users from "../../components/Users/users.jsx";
import UserSubscriptions from "../../components/UserSubscriptions/userSubscriptions.jsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Get User Data By Email
    const fetchUser = async () => {
      try {
        const email = localStorage.getItem("email");
        if (email == null) {
          navigate("/login");
        } else {
          const result = await getUserByEmail(email);
          if (result == null || !result.name) {
            localStorage.removeItem("email");
            navigate("/login");
          } else if (
            result.roleName == Roles.Admin ||
            result.roleName == Roles.Subscriper
          ) {
            setUserData(result);
          } else {
            navigate("/");
          }
        }
      } catch (error) {}
    };
    fetchUser();
  }, [navigate]);

  return (
    <>
      <div className="dashboard">
        <div className="row">
          <div className="col-lg-3 col-md-4 mb-lg-0 mb-md-0 mb-4">
            <div className="tabs">
              <NavLink to="/dashboard">
                <li className="d-flex align-items-center">
                  <div className="icon">
                    <box-icon name="user"></box-icon>
                  </div>
                  <div>عرض المستخدمين</div>
                </li>
              </NavLink>
              <NavLink to="/dashboard/userSubscriptions">
                <li className=" d-flex align-items-center">
                  <div className="icon">
                    <box-icon name='user-check'></box-icon>
                  </div>
                  <div>عرض المشتركين</div>
                </li>
              </NavLink>
            </div>
          </div>
          <div className="col-lg-9 col-md-8 mb-4">
            <Routes>
              <Route exact path="/" element={<Users />} />
              <Route path="/userSubscriptions" element={<UserSubscriptions />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

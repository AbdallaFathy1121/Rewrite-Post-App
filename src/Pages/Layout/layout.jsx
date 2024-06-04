import React, { useEffect, useState, useRef } from "react";
import { Route, Routes, NavLink, BrowserRouter as Router } from "react-router-dom";
import Post from "../../components/Post/post";
import Subscriptions from "../../components/Subscriptions/subscriptions";
import "./layout.style.css";
import { getUserByEmail } from "../../components/Login/services/login.service.ts";
import { useNavigate } from 'react-router-dom';

import Dashboard from "../Dashboard/dashboard.jsx";
import NavBar from "../../Shared/components/navbar.jsx";
import Footer from "../../Shared/components/footer.jsx";

const Layout = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get User Data By Email
    const fetchUser = async () => {
      try {
        const email = localStorage.getItem("email");
        if (email == null) {
          navigate('/login');
        } else {
          const result = await getUserByEmail(email);
          if (result == null || !result.name) {
            localStorage.removeItem("email");
            navigate('/login');
          } else {
            setUserData(result);
          }
        }
      } catch (error) {}
    };
    fetchUser();
  }, []);

  return (
    <>

      <NavBar userData={userData} />

      <div className="container mt-5 mb-5">
        <Routes>
          <Route exact path="/" element={<Post />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default Layout;

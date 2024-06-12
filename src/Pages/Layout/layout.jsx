import React, { useEffect, useState, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Post from "../../components/Post/post";
import Subscriptions from "../../components/Subscriptions/subscriptions";
import "./layout.style.css";
import { jwtDecode } from 'jwt-decode';

import Dashboard from "../Dashboard/dashboard.jsx";
import NavBar from "../../Shared/components/navbar.jsx";
import Footer from "../../Shared/components/footer.jsx";
import AuthContext from "../../context/authContext";
import PrivateRoute from "../../Shared/components/PrivateRoute";

const Layout = () => {
  const [userData, setUserData] = useState();
  const { logout } = useContext(AuthContext)

  useEffect(() => {
    // Get User Data By Email
    const fetchUser = async () => {
      try {
        const userData = jwtDecode(localStorage.getItem('token'));
        if (userData.email == null) {
          logout();
        } else {
          setUserData(userData);
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
          <Route exact path="/" element={<PrivateRoute><Post /></PrivateRoute>} />
          <Route path="/subscriptions" element={<PrivateRoute><Subscriptions /></PrivateRoute>} />
          <Route path="/dashboard/*" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default Layout;

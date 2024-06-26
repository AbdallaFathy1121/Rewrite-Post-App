import React, { useState, useEffect, useContext } from "react";
import AuthContext from '../../context/authContext.js';

import "./styles/login.css";
import toast from 'react-hot-toast';

import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import 'boxicons'
import { createUser, getUserByEmail, assignUserIntoSubscription, updateUserSubscriptionIdById, auth } from "./services/login.service.ts";

const Login = () => {
  const { login } = useContext(AuthContext);

  const [user, setUser] = useState(null);

  // Notify
  const assignUserToFreeSubscriptionNotify = () => toast.success(" تم التسجيل بنجاح والاشتراك فى الباقة المجانية بنجاح",  {
    duration: 6000,
  });
  const loginSuccssNotify = () => toast.success(" تم التسجيل بنجاح");

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  const handleLoginUser = async(model) => {
    const existUser = await getUserByEmail(model.email);
    if (Object.keys(existUser).length === 0) {

      // Create User
      await createUser(model);
      
      // Assign User Into Free Subscription
      const result = await assignUserIntoSubscription(model.id);
      await updateUserSubscriptionIdById(model.id, result.Id);
      
      // Login
      const user = await auth(model.email);
      login(user.token, user.expiresAt);

      // Notify
      loginSuccssNotify();
      assignUserToFreeSubscriptionNotify();
      
    } else {
      // Login
      const user = await auth(model.email);
      login(user.token, user.expiresAt);
      loginSuccssNotify();
    }
  }

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then(async (res) => {
          const model = {
            id: res.data.id,
            email: res.data.email,
            name: res.data.name,
            picture: res.data.picture,
            roleId: 1,
          }
          // Login
          await handleLoginUser(model);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    if (token) {
      login(token, tokenExpiry);
    }
  }, [])

  return (
    <>
      <div className="user-card round5">
        <div className="login-box">
          <form className="login-form" name="login" action="">
            <input
              type="email"
              name="email"
              className="email"
              placeholder="البريد الالكترونى"
            />
            <input
              type="password"
              name="password"
              className="password"
              placeholder="كلمة المرور"
            />
            <input type="submit" name="login" value="تسجيل" className="login" />
          </form>

          <div className="or"></div>
          <button className="login-with-google d-flex justify-content-around align-items-center" onClick={() => googleLogin()}>
            تسجيل الدخول عبر جوجل
            <span className="icon">
              <box-icon type='logo' name='google-plus'></box-icon>
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;

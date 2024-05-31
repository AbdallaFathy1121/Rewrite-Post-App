import React, { useState, useEffect } from "react";
import "./styles/login.css";

import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import User from "./models/User";
import 'boxicons'

const Login: React.FC = () => {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState<User>();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

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
        .then((res) => {
          setUserInfo({
            email: res.data.email,
            name: res.data.name,
            picture: res.data.picture,
            token: user.access_token,
            roleId: 1,
          });
          console.log(userInfo);
          localStorage.setItem("token", user.access_token);
        })
        .catch((err) => console.log(err));
    }
  }, [user, userInfo]);

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
          <button className="login-with-google d-flex justify-content-around align-items-center" onClick={() => login()}>
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

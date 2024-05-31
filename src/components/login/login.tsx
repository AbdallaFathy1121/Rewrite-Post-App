import React from "react";
import "./styles/login.css"

const Login: React.FC = () => {
  return (
    <>
      <div className="user-card round5">
        <div className="login-box">
          <form className="login-form" name="login" action="">
            <input
              type="username"
              name="username"
              className="username"
              placeholder="username"
            />
            <input
              type="password"
              name="password"
              className="password"
              placeholder="password"
            />
            <input type="submit" name="login" value="Login" className="login" />
          </form>

          <div className="or"></div>
          <a href="#" className="login-with-google">
            <span className="icon fa fa-google-plus"></span>
            Login with google
          </a>
        </div>
      </div>
    </>
  );
};

export default Login;

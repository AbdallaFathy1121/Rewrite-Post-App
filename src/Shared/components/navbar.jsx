import React, { useEffect, useState, useRef } from "react";
import {
  NavLink,
  useNavigate,
} from "react-router-dom";
import "boxicons";
import { Navbar } from "react-bootstrap";
import toast from "react-hot-toast";
import Roles from "../roles";


const NavBar = ({ userData }) => {
  const [isOpen, setIsOpen] = useState(false);
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

  useEffect(() => {
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
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    const email = localStorage.getItem("email");
    if (email) {
      localStorage.removeItem("email");
      navigate("/login");
      logoutSuccssNotify();
    }
  };
  const logoutSuccssNotify = () => toast.success(" تم تسجيل الخروج بنجاح");

  return (
    <>
      <nav
        className={
          isNavFixed
            ? "nav-fixed navbar navbar-expand-sm navbar-light"
            : "navbar navbar-expand-sm navbar-light"
        }
      >
        <div className="container">
          <Navbar.Toggle />

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

          <Navbar.Collapse>
            <ul className="navbar-nav">
              <li className="nav-item active">
                <NavLink className="nav-link" to="/">
                  الصفحة الرئيسية
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/account">
                  حسابى
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/subscriptions">
                  الاشتراكات
                </NavLink>
              </li>
              {userData && (
                <>
                  {userData.roleName == Roles.Admin && (
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/dashboard">
                        لوحة التحكم
                      </NavLink>
                    </li>
                  )}
                </>
              )}
            </ul>
          </Navbar.Collapse>
        </div>
      </nav>
    </>
  );
};

export default NavBar;

import React, { useEffect, useState, useRef } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Post from "../components/Post/post";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./layout.style.css";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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
  }, []);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link href="#deets">اضافة مقالة</Nav.Link>
              <Nav.Link href="#memes">الأشتراكات</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <div className="dropdown-container" ref={dropdownRef}>
            <div className="dropdown right" open={isOpen}>
              <div className="avatar" id="avatar"onClick={toggleDropdown}>
                <img src="https://gravatar.com/avatar/00000000000000000000000000000000?d=mp" />
              </div>
              {isOpen && (
                <ul>
                  <li>
                    <p>
                      <span className="block bold">Jane Doe</span>
                      <span className="block italic">jane@example.com</span>
                    </p>
                  </li>
                  <li>
                    <a href="#">
                      <span className="material-symbols-outlined">
                        account_circle
                      </span>{" "}
                      Account
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="material-symbols-outlined">
                        settings
                      </span>{" "}
                      Settings
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="material-symbols-outlined">help</span>{" "}
                      Help
                    </a>
                  </li>
                  <li className="divider"></li>
                  <li>
                    <a href="#">
                      <span className="material-symbols-outlined">logout</span>{" "}
                      Logout
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </Container>
      </Navbar>

      <div className="container">
        <Routes>
          <Route exact path="/" element={<Post />} />
        </Routes>
      </div>
    </>
  );
};

export default Layout;

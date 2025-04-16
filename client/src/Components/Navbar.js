import {
  faBars,
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoImage from "../Assets/Logo_Fitness.png";
import "../Styles/Navbar.css";

function Navbar() {
  const [nav, setNav] = useState(false);
  const token = localStorage.getItem("authToken"); // Check if the token exists

  const openNav = () => {
    setNav(!nav);
  };

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("authToken");

    // Redirect user to the login page after logout
    window.location.href = "/login"; // Redirect to the login page
  };

  return (
    <div className="navbar-section">
      <h1 className="navbar-title">
        <Link to="/">
          <img className="logo_fitness" alt="" src={logoImage} />
        </Link>
      </h1>
      <ul className="navbar-items">
        <li>
          <Link to="/" className="navbar-links">
            Home
          </Link>
        </li>
        <li>
          <a href="#services" className="navbar-links">
            Workouts
          </a>
        </li>
        <li>
          <a href="#calCulatos" className="navbar-links">
            BMI Test
          </a>
        </li>
        <li>
          <a href="#about" className="navbar-links">
            About Us
          </a>
        </li>
        <li>
          <a href="#motivators" className="navbar-links">
            Motivators
          </a>
        </li>

        {!token && (
          <div style={{ display: "flex", gap: "10px", position: "absolute", right: "22px" }}>
            <li>
              <Link to="/signup" className="navbar-links">
                <button type="button" className="btn btn-success">Sign Up</button>
              </Link>
            </li>
            <li>
              <Link to="/login" className="navbar-links">
                <button type="button" className="btn btn-info">Sign In</button>
              </Link>
            </li>
          </div>
        )}

        {token && (
          <div style={{ display: "flex", gap: "10px", position: "absolute", right: "22px" }}>
            <li>
              <button type="button" className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </li>
          </div>
        )}
      </ul>

      <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
        <div onClick={openNav} className="mobile-navbar-close">
          <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
        </div>

        <ul className="mobile-navbar-links">
          <li>
            <Link onClick={openNav} to="/">
              Home
            </Link>
          </li>
          <li>
            <a onClick={openNav} href="#services">
              Programs
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#about">
              About
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#reviews">
              Reviews
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#motivators">
              Motivators
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#contact">
              Contact
            </a>
          </li>
        </ul>
      </div>

      <div className="mobile-nav">
        <FontAwesomeIcon
          icon={faBars}
          onClick={openNav}
          className="hamb-icon"
        />
      </div>
    </div>
  );
}

export default Navbar;

import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../Nav/Nav.css";
import logo from "../../assets/landminelogo.png";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

export const Nav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, loading } = useAuth();

  if (loading) return null;

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCloseMenu = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        {/* Left - Logo */}
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="Company Logo" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="navbar-menu">
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Services
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/careers"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Careers
            </NavLink>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <div className="navbar-hamburger" onClick={toggleMobileMenu}>
          {mobileOpen ? (
            <FaTimes className="hamburger-icon" />
          ) : (
            <FaBars className="hamburger-icon" />
          )}
        </div>
      </nav>
      {mobileOpen && (
        <div className="mobile-menu-overlay" onClick={handleCloseMenu}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <div className="mobile-close-btn" onClick={handleCloseMenu}>
              <FaTimes className="close-icon" />
            </div>

            {/* 1️⃣ Main nav items */}
            <NavLink
              to="/about"
              className="mobile-nav-link"
              onClick={handleCloseMenu}
            >
              About
            </NavLink>
            <NavLink
              to="/services"
              className="mobile-nav-link"
              onClick={handleCloseMenu}
            >
              Services
            </NavLink>
            <NavLink
              to="/careers"
              className="mobile-nav-link"
              onClick={handleCloseMenu}
            >
              Careers
            </NavLink>

            {/* 2️⃣ Login / User just after main nav */}
            <div className="mobile-user-section">
              {!user ? (
                <NavLink
                  to="/auth"
                  className="mobile-login-link"
                  onClick={handleCloseMenu}
                >
                  👤 Log In
                </NavLink>
              ) : (
                <div className="mobile-user-dropdown">
                  <div className="mobile-user-trigger">
                    <FaUserCircle className="mobile-user-icon" />
                    <span>{user.fullName?.split(" ")[0] || "User"}</span>
                  </div>
                  <div className="mobile-user-menu">
                    <button
                      onClick={() => {
                        handleCloseMenu();
                        window.location.href = "/profile";
                      }}
                    >
                      👤 View / Edit profile
                    </button>
                    {user.role === "ADMIN" && (
                      <button
                        onClick={() => {
                          handleCloseMenu();
                          window.location.href = "/admin";
                        }}
                      >
                        🖥️ Admin Dashboard
                      </button>
                    )}
                    <button
                      onClick={() => {
                        handleCloseMenu();
                        window.location.href = "/";
                      }}
                    >
                      🚪 Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 3️⃣ TopNav items last: Get a Demo, Support, Contact */}
            <div className="mobile-topnav-items">
              <NavLink
                to="/getdemo"
                className="mobile-topnav-link"
                onClick={handleCloseMenu}
              >
                Get a Demo
              </NavLink>
              <NavLink
                to="/support"
                className="mobile-topnav-link"
                onClick={handleCloseMenu}
              >
                Support
              </NavLink>
              <NavLink
                to="/contact"
                className="mobile-topnav-link"
                onClick={handleCloseMenu}
              >
                Contact Us
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

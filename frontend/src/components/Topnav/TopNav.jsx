import React, { useState } from "react";
import "../Topnav/TopNav.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

export const TopNav = () => {
  const { user, logout, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  if (loading) return null;

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  return (
    <div className="topnav">
      <div className="topnav-right">
        {/* Get a Demo */}
        <NavLink to="/getdemo">
          {({ isActive }) => (
            <button
              className={isActive ? "demo-btn demo-btn-active" : "demo-btn"}
            >
              Get a Demo
            </button>
          )}
        </NavLink>

        {/* Contact Us */}
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "topnav-text-link active-link" : "topnav-text-link"
          }
        >
          Contact Us
        </NavLink>

        {/* Support */}
        <NavLink
          to="/support"
          className={({ isActive }) =>
            isActive ? "topnav-text-link active-link" : "topnav-text-link"
          }
        >
          Support
        </NavLink>

        {/* Login/User */}
        {!user ? (
          <NavLink
            to="/auth"
            className={({ isActive }) =>
              isActive ? "topnav-text-link active-link" : "topnav-text-link"
            }
          >
            Log In
          </NavLink>
        ) : (
          <div className="topnav-user">
            <button className="user-trigger" onClick={() => setOpen(!open)}>
              <FaUserCircle className="user-icon" />
              <span className="user-name">
                {user.fullName?.split(" ")[0] || "User"}
              </span>
            </button>

            {open && (
              <div className="user-menu">
                <button onClick={() => navigate("/profile")}>
                  👤 View / Edit profile
                </button>
                {user.role === "ADMIN" && (
                  <button onClick={() => navigate("/admin")}>
                    🖥️ Admin Dashboard
                  </button>
                )}
                <button onClick={handleLogout}>🚪 Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

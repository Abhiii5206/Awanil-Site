import React from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import "../css/navbar.css";
export const Navbar = ({
  user,
  profile,
  isAdmin = false,
  theme = "light",
  toggleTheme,
  totalItems = 0,
  handleLogout,
}) => {
  return (
    <nav className="navbar navbar-expand-lg sticky-top custom-glass-nav py-3">
      <div className="container">
        {/* 3D Animated Glowing Logo */}
        <Link to="/" className="text-decoration-none">
          <motion.div
            className="d-flex align-items-center gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.08, rotateY: 15 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{ perspective: 1000 }}
          >
            <div className="logo-3d-box">
              <span className="logo-icon">⚡</span>
            </div>
            <span className="logo-text">
              AWANIL<span className="logo-accent">STORE</span>
            </span>
          </motion.div>
        </Link>

        {/* Hamburger menu button for small screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible content container */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/products/add">
                Add Products
              </NavLink>
            </li>
            {isAdmin && (
              <li className="nav-item">
                <NavLink
                  className="nav-link text-warning fw-semibold"
                  to="/admin"
                >
                  ⚡ Admin Panel
                </NavLink>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-3">
            {/* Theme Switcher */}

            <button
              onClick={toggleTheme}
              type="button"
              className="theme-toggle"
              title={
                theme === "light"
                  ? "Switch to Dark Mode"
                  : "Switch to Light Mode"
              }
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>


            {/* Cart Link */}
            <Link
              to="/cart"
              className="btn btn-primary position-relative d-flex align-items-center gap-2"
            >
              🛒 Cart
              {totalItems > 0 && (
                <span className="badge bg-danger rounded-pill">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Authentication Action */}
            {user ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-primary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  👤 {profile?.full_name || "Account"}
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow">
                  <li className="dropdown-header">Logged in as {user.email}</li>
                  {isAdmin && (
                    <li>
                      <Link
                        className="dropdown-item fw-semibold text-warning"
                        to="/admin"
                      >
                        Admin Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      type="button"
                      className="dropdown-item text-danger"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn btn-outline-primary">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
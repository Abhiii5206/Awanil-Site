import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top custom-glass-nav py-3">
      <div className="container">

        {/* ==================== LOGO ==================== */}
        <Link
          to="/"
          className="text-decoration-none"
          onClick={closeMenu}
        >
          <motion.div
            className="d-flex align-items-center gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.08, rotateY: 15 }}
            transition={{
              type: "spring",
              stiffness: 300,
            }}
            style={{ perspective: 1000 }}
          >
            <div className="logo-3d-box">
              <ShoppingCart
                size={22}
                className="text-white"
              />
            </div>

            <span className="logo-text">
              AWANIL
              <span className="logo-accent">STORE</span>
            </span>
          </motion.div>
        </Link>

        {/* ==================== HAMBURGER ==================== */}
        <button
          className={`navbar-toggler custom-toggler ${
            menuOpen ? "" : "collapsed"
          }`}
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarContent"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ==================== NAVBAR CONTENT ==================== */}
        <div
          className={`navbar-collapse ${
            menuOpen ? "show" : ""
          }`}
          id="navbarContent"
        >

          {/* ==================== NAVIGATION LINKS ==================== */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">

            {/* HOME */}
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/"
                onClick={closeMenu}
              >
                Home
              </NavLink>
            </li>

            {/* PRODUCTS */}
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/products"
                onClick={closeMenu}
              >
                Products
              </NavLink>
            </li>

            {/* ABOUT */}
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/about"
                onClick={closeMenu}
              >
                About
              </NavLink>
            </li>

            {/* CONTACT */}
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/contact"
                onClick={closeMenu}
              >
                Contact
              </NavLink>
            </li>

            {/* ADD PRODUCTS */}
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/admin/products/add"
                onClick={closeMenu}
              >
                Add Products
              </NavLink>
            </li>

            {/* ADMIN PANEL */}
            {isAdmin && (
              <li className="nav-item">
                <NavLink
                  className="nav-link text-warning fw-semibold"
                  to="/admin"
                  onClick={closeMenu}
                >
                  ⚡ Admin Panel
                </NavLink>
              </li>
            )}
          </ul>

          {/* ==================== RIGHT SIDE ==================== */}
          <div className="d-flex align-items-center gap-3">

            {/* ==================== THEME BUTTON ==================== */}
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

            {/* ==================== CART ==================== */}
            <Link
              to="/cart"
              onClick={closeMenu}
              className="btn btn-primary position-relative d-flex align-items-center gap-2 cart-btn"
            >
              🛒 Cart

              {totalItems > 0 && (
                <span className="badge bg-danger rounded-pill">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* ==================== USER ACCOUNT ==================== */}
            {user ? (
              <div className="dropdown">

                <button
                  className="btn btn-outline-primary dropdown-toggle account-btn"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  👤 {profile?.full_name || "Account"}
                </button>

                <ul className="dropdown-menu dropdown-menu-end shadow">

                  {/* Email */}
                  <li>
                    <div className="dropdown-header">
                      Logged in as {user.email}
                    </div>
                  </li>

                  {/* Admin Dashboard */}
                  {isAdmin && (
                    <li>
                      <Link
                        className="dropdown-item fw-semibold text-warning"
                        to="/admin"
                        onClick={closeMenu}
                      >
                        Admin Dashboard
                      </Link>
                    </li>
                  )}

                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  {/* Logout */}
                  <li>
                    <button
                      onClick={() => {
                        closeMenu();
                        handleLogout();
                      }}
                      type="button"
                      className="dropdown-item text-danger"
                    >
                      Logout
                    </button>
                  </li>

                </ul>
              </div>
            ) : (
              /* ==================== LOGIN ==================== */
              <Link
                to="/login"
                className="btn btn-outline-primary login-btn"
                onClick={closeMenu}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
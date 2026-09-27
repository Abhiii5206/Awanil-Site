import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer-section mt-auto py-2.5  border-top">
      <div className="container">
        <div className="row gy-2 align-items-center text-center text-md-start">
          {/* Brand & Brief Note */}
          <div className="col-md-5 col-lg-4">
            <h6 className="fw-bold mb-1 fs-6">
              <span className="text-primary">AWANIL</span> STORE
            </h6>
            <p className=" mb-0" style={{ fontSize: "0.78rem" }}>
              Demo drinkware discovery platform powered by React & Supabase.
            </p>
          </div>

          {/* Inline Navigation Links */}
          {/* <div className="col-md-7 col-lg-5">
            <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-3">
              <Link className="text-muted text-decoration-none small" to="/">
                Home
              </Link>
              <Link className="text-muted text-decoration-none small" to="/products">
                Products
              </Link>
              <Link className="text-muted text-decoration-none small" to="/about">
                About
              </Link>
              <Link className="text-muted text-decoration-none small" to="/contact">
                Contact
              </Link>
              <Link className="text-muted text-decoration-none small" to="/login">
                Sign In
              </Link>
              <Link className="text-muted text-decoration-none small" to="/cart">
                Cart
              </Link>
            </div>
          </div> */}

          {/* Copyright */}
          <div className="col-55 col-lg-3 text-center text-lg-end">
            <span  style={{ fontSize: "0.78rem" }}>
              © {new Date().getFullYear()} AWANIL STORE
            </span>
          </div>

            <div className="col-55 col-lg-3 text-center text-lg-end">
            <span  style={{ fontSize: "0.60rem" }}>
               Made with ❤️ by{" Deepu"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
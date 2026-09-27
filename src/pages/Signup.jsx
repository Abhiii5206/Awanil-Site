
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../css/auth.css";

export const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signup(email, password, fullName);

      alert("Registration successful! You can now log in.");

      navigate("/login");
    } catch (err) {
      setError(err.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-container">

        <div className="auth-card">

          <div className="auth-icon">
            ✨
          </div>

          <h1 className="auth-title">
            Create <span className="gradient-text">Account</span>
          </h1>

          <p className="auth-subtitle">
            Join AWANIL STORE and start exploring
          </p>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup}>

            <div className="auth-form-group">
              <label className="auth-label">
                Full Name
              </label>

              <input
                type="text"
                className="auth-input"
                placeholder="Enter your full name"
                required
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
              />
            </div>


            <div className="auth-form-group">
              <label className="auth-label">
                Email Address
              </label>

              <input
                type="email"
                className="auth-input"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </div>


            <div className="auth-form-group">
              <label className="auth-label">
                Password
              </label>

              <input
                type="password"
                className="auth-input"
                placeholder="Minimum 6 characters"
                required
                minLength={6}
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />
            </div>


            <button
              type="submit"
              disabled={loading}
              className="auth-submit"
            >
              {loading ? (
                <span className="auth-loading">
                  <span className="auth-spinner"></span>
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>

          </form>


          <div className="auth-footer">
            Already registered?{" "}
            <Link to="/login">
              Login
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};


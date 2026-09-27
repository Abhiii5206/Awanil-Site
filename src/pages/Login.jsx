
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../css/auth.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-container">

        <div className="auth-card">

          <div className="auth-icon">
            🔐
          </div>

          <h1 className="auth-title">
            Welcome <span className="gradient-text">Back</span>
          </h1>

          <p className="auth-subtitle">
            Login to your AWANIL STORE account
          </p>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>

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
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>


            <div className="auth-form-group">
              <label className="auth-label">
                Password
              </label>

              <input
                type="password"
                className="auth-input"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                  Authenticating...
                </span>
              ) : (
                "Login"
              )}
            </button>

          </form>


          <div className="auth-footer">
            Don't have an account?{" "}
            <Link to="/signup">
              Create Account
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};


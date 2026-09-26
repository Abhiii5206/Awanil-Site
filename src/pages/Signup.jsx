import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card border-0 shadow-sm p-4">
            <h3 className="fw-bold mb-3 text-center">Create Account</h3>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSignup}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary w-100 mb-3 fw-bold">
                {loading ? "Creating..." : "Sign Up"}
              </button>
            </form>

            <div className="text-center">
              <span className="text-muted small">Already registered? </span>
              <Link to="/login" className="small text-decoration-none fw-semibold">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
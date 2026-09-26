import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LoadingSpinner } from "./LoadingSpinner";

export const ProtectedRoute = ({ requireAdmin = false }) => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner message="Checking access authorization..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger shadow-sm d-inline-block p-4">
          <h4>Access Denied 🚫</h4>
          <p className="mb-0">You do not have administrator permissions to view this route.</p>
        </div>
      </div>
    );
  }

  return <Outlet />;
};
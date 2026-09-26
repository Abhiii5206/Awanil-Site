import React from "react";

export const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center py-5">
      <div className="spinner-border text-primary mb-2" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="text-muted small">{message}</p>
    </div>
  );
};
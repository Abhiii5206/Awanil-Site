import React from "react";

export const About = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1 className="fw-bold mb-3"><span className="text-primary">AWANIL</span> STORE</h1>
          <p className="lead text-muted mb-4">
            A Modern E-Commerce & Product Discovery Demonstration Platform
          </p>
        </div>
      </div>

      <div className="row gy-4 mt-2">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100 p-4">
            <h4 className="fw-bold text-primary mb-3">🚀 Purpose & Mission</h4>
            <p className="text-muted">
              AWANIL STORE is engineered as a clean test application demonstrating modern React.js state management combined with Supabase PostgreSQL as a cloud backend database solution.
            </p>
            <p className="text-muted">
              All items featured on this portal serve as representative demo products that redirect users directly to official ecommerce listings (such as Flipkart) for complete checkout transparency.
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100 p-4">
            <h4 className="fw-bold text-primary mb-3">🛠️ Technical Stack</h4>
            <ul className="list-unstyled text-muted lh-lg">
              <li>⚡ <strong>Frontend:</strong> React.js + Vite</li>
              <li>🗄️ <strong>Backend:</strong> Supabase BaaS (Database + Auth + Storage)</li>
              <li>🔒 <strong>Security:</strong> PostgreSQL Row Level Security (RLS)</li>
              <li>🎨 <strong>Styling:</strong> Light/Dark mode CSS architecture + Bootstrap 5</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
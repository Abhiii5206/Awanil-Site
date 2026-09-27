
import React from "react";
import "../css/about.css";

export const About = () => {
  return (
    <div className="about-page">

      {/* HERO */}
      <section className="about-hero container">

        <div className="about-badge">
          ⚡ About AWANIL STORE
        </div>

        <h1 className="about-title">
          <span className="awanil">AWANIL</span>{" "}
          <span className="store">STORE</span>
        </h1>

        <p className="about-subtitle">
          A modern e-commerce and product discovery platform
          built with a focus on performance, simplicity and
          a premium digital shopping experience.
        </p>

      </section>


      {/* CONTENT */}
      <section className="container about-grid">

        <div className="row gy-4">

          {/* PURPOSE */}
          <div className="col-lg-6">

            <div className="about-card">

              <div className="about-card-icon">
                🚀
              </div>

              <h4>
                Purpose & Mission
              </h4>

              <p>
                AWANIL STORE is engineered as a clean
                demonstration application showcasing modern
                React.js state management combined with
                Supabase PostgreSQL as a cloud backend
                database solution.
              </p>

              <p>
                Products displayed on this platform serve as
                representative demo products and can redirect
                users to official ecommerce listings for a
                transparent shopping experience.
              </p>

            </div>

          </div>


          {/* TECH STACK */}
          <div className="col-lg-6">

            <div className="about-card">

              <div className="about-card-icon">
                🛠️
              </div>

              <h4>
                Technical Stack
              </h4>

              <ul className="tech-list">

                <li>
                  ⚡
                  <span>
                    <strong>Frontend:</strong>{" "}
                    React.js + Vite
                  </span>
                </li>

                <li>
                  🗄️
                  <span>
                    <strong>Backend:</strong>{" "}
                    Supabase BaaS
                  </span>
                </li>

                <li>
                  🔒
                  <span>
                    <strong>Security:</strong>{" "}
                    PostgreSQL Row Level Security
                  </span>
                </li>

                <li>
                  🎨
                  <span>
                    <strong>Styling:</strong>{" "}
                    Bootstrap 5 + Custom CSS
                  </span>
                </li>

              </ul>

            </div>

          </div>

        </div>


        {/* STATS */}
        <div className="row g-3 about-stats">

          <div className="col-6 col-md-3">
            <div className="about-stat">
              <span className="about-stat-number">
                React
              </span>
              <span className="about-stat-label">
                Frontend
              </span>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="about-stat">
              <span className="about-stat-number">
                Vite
              </span>
              <span className="about-stat-label">
                Build Tool
              </span>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="about-stat">
              <span className="about-stat-number">
                Supabase
              </span>
              <span className="about-stat-label">
                Backend
              </span>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="about-stat">
              <span className="about-stat-number">
                RLS
              </span>
              <span className="about-stat-label">
                Security
              </span>
            </div>
          </div>

        </div>

      </section>

    </div>
  );
};


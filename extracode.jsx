
        // loginBTN CODE 
        
        
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
            ) : 
            (
              /* ==================== LOGIN ==================== */
              <Link
                to="/login"
                className="btn btn-outline-primary login-btn"
                onClick={closeMenu}
              >
                Login
              </Link>
            )
            }


        // END OF LOGIN BUTTON CODE 
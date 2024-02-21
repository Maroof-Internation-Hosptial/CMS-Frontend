import React from "react";
import { useNavigate } from 'react-router-dom';
import "../css/style.css";

const Lockscreen = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    // Perform sign-in logic here

    // Redirect to the dashboard page
    navigate('/dashboard');
  };
  return (
    <div className="lockscreen-wrapper">

      {/* User name */}
      <div className="lockscreen-name text-center">Abdul Sami</div>

      {/* START LOCK SCREEN ITEM */}
      <div className="lockscreen-item">
        {/* lockscreen image */}
        <div className="lockscreen-image">
          <img src="../../dist/img/user1-128x128.jpg" alt="User Image" />
        </div>
        {/* /.lockscreen-image */}

        {/* lockscreen credentials (contains the form) */}
        <form className="lockscreen-credentials">
          <div className="input-group">
            <input
              type="password"
              className="form-control"
              placeholder="password"
            />

            <div className="input-group-append">
              <button type="button" onClick={handleSignIn}  className="btn">
                <i className="fas fa-arrow-right text-muted"></i>
              </button>
            </div>
          </div>
        </form>
        {/* /.lockscreen credentials */}
      </div>
      {/* /.lockscreen-item */}
      <div className="help-block text-center">
        Enter your password to retrieve your session
      </div>
      <div className="text-center">
        <a href="/">Or sign in as a different user</a>
      </div>
      <div className="lockscreen-footer text-center">
        &copy; 2023-2024 <b>Muawin</b>
        <br />
        All rights reserved
      </div>
    </div>
  );
};

export default Lockscreen;

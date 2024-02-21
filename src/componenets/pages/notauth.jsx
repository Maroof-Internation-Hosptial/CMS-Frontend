import React from "react";
import "../css/underconstruction.css";

const NotAuth = () => {
  return (
    <div>
      <div className="object">
        <div className="object-rope"></div>
        <div className="object-shape" style={{ fontSize: 10 }}>
          we are{" "}
          <span className="soon" style={{ fontSize: 10 }}>
            sorry
          </span>
        </div>
      </div>

      <div className="content-u">
        <h2 className="message">Access Denied</h2>
        <h5>You do not have permission to access this page</h5>

        <p className="mailtoaddress">
          <em></em>
        </p>
      </div>
    </div>
  );
};

export default NotAuth;

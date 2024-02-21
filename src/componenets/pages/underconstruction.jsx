import React from "react";
import "../css/underconstruction.css";

const UnderConstruction = () => {
  return (
    <div>
      <div className="object">
        <div className="object-rope"></div>
        <div className="object-shape" style={{ fontSize: 10 }}>
          Under{" "}
          <span className="soon" style={{ fontSize: 10 }}>
            Construction
          </span>
        </div>
      </div>

      <div className="content-u">
        <img className="logo" src="/dist/img/Muawin-Logo.png" height={200} />

        <h2 className="message">This Page will be ready soon</h2>

        <p className="mailtoaddress">
          <em></em>
        </p>
      </div>
    </div>
  );
};

export default UnderConstruction;

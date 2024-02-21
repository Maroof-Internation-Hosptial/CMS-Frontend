import React from "react";
import "../css/terms.css";

const Terms = () => {
  return (
    <>
      <div class="container" style={{ marginTop: 50 }}>
        <h4>Terms and Conditions</h4>

        <div class="section">
          <h5>1. Introduction</h5>
          <p>
            Welcome to our website. These terms and conditions outline the rules
            and regulations for the use of our website.
          </p>
        </div>

        <div class="section">
          <h5>2. Acceptance of Terms</h5>
          <p>
            By accessing this website, you accept these terms and conditions in
            full. If you disagree with these terms and conditions or any part of
            these terms and conditions, you must not use this website.
          </p>
        </div>

        <div class="section">
          <h5>3. Privacy Policy</h5>
          <p>
            Your use of this website is also governed by our{" "}
            <a href="#">Privacy Policy</a>, which is incorporated by reference
            into these terms and conditions.
          </p>
        </div>

        <div class="section">
          <h5>4. Changes to Terms and Conditions</h5>
          <p>
            We may revise these terms and conditions at any time without notice.
            By using this website, you are agreeing to be bound by the current
            version of these terms and conditions.
          </p>
        </div>

        <div class="section">
          <h5>5. Contact Us</h5>
          <p>
            If you have any questions about these terms and conditions, please{" "}
            <a href="#">contact us</a>.
          </p>
        </div>
      </div>

      <div class="footer">&copy; 2023 Your Muawin. All rights reserved.</div>
    </>
  );
};

export default Terms;

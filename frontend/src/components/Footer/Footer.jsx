import React from "react";
import "../Footer/Footer.css";

const Footer = () => {
  return (
    <footer className="lm-footer">
      <div className="lm-footer-inner">
        <div className="lm-footer-left">
          <h4 className="lm-footer-logo">Landmine Soft</h4>
          <p className="lm-footer-address">
            {/* 2nd Floor, XYZ Tech Park, Madhapur,
            <br /> */}
            Hyderabad, Telangana 500081, India
          </p>
        </div>

        <div className="lm-footer-right">
          <p className="lm-footer-small">contact@landminesoft.com</p>
          <p className="lm-footer-small">+91‑98XX‑XXX‑XXX</p>
        </div>
      </div>

      <div className="lm-footer-bottom">
        <p>© {new Date().getFullYear()} Landmine Soft. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

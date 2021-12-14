import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer footer-links-container">
      <div className="footer-links">
        <Link to="#" className="standard-link footer-link">About</Link>
        <Link to="#" className="standard-link footer-link">Help Center</Link>
        <Link to="#" className="standard-link footer-link">Terms of Service</Link>
        <Link to="#" className="standard-link footer-link">Privacy Policy</Link>
        <Link to="#" className="standard-link footer-link">Cookie Policy</Link>
        <Link to="#" className="standard-link footer-link">Ads Info</Link>
        <Link to="#" className="standard-link footer-link">Blog</Link>
        <Link to="#" className="standard-link footer-link">Status</Link>
        <Link to="#" className="standard-link footer-link">Careers</Link>
        <Link to="#" className="standard-link footer-link">Brand Resources</Link>
        <Link to="#" className="standard-link footer-link">Advertising</Link>
        <Link to="#" className="standard-link footer-link">Marketing</Link>
        <Link to="#" className="standard-link footer-link">Twitter for Business</Link>
        <Link to="#" className="standard-link footer-link">Developers</Link>
        <Link to="#" className="standard-link footer-link">Directory</Link>
        <Link to="#" className="standard-link footer-link">Settings</Link>
        <Link to="#" className="standard-link footer-link">Directory</Link>
      </div>
      <div className="footer-copyright-text">
          <p className="copyright-text"><Link to='https://www.prasadbro.com/' className="default-link">© 2021 Twitter Clone, Inc.</Link> </p>
      </div>
    </footer>
  );
}

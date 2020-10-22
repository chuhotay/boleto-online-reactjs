import React, { memo } from "react";
import logo from "assets/images/logo.png";
import "./Footer.scss";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer-section" id="contact">
      <div className="container">
        <div className="footer-top">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="logo-footer" />
            </Link>
          </div>
          <ul className="social-icons">
            <li>
              <i className="fa fa-facebook-f"></i>
            </li>
            <li>
              <i className="fa fa-twitter" />
            </li>
            <li>
              <i className="fa fa-google" />
            </li>
            <li>
              <i className="fa fa-instagram" />
            </li>
          </ul>
        </div>
        <div className="footer-bottom">
          <div className="left">
            <p>
              Copyright © 2020.All Rights Reserved By
              <span href="#0"> Boleto</span>
            </p>
          </div>
          <ul className="links mb-0">
            <li>
              <a href="#0">About</a>
            </li>
            <li>
              <a href="#0">Terms Of Use</a>
            </li>
            <li>
              <a href="#0">Privacy Policy</a>
            </li>
            <li>
              <a href="#0">FAQ</a>
            </li>
            <li>
              <a href="#0">Feedback</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);

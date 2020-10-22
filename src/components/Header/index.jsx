import React from "react";
import logo from "assets/images/logo.png";
import "./Header.scss";
import "assets/sass/components/button.scss";
import { Link } from "react-router-dom";

function Header() {
  // const showInfoUserHandler = () => {
  //   let username = getUserInfo();
  //   return username ? (
  //     <li className="nav-item dropdown ml-md-3 mt-3 mt-md-0">
  //       <div
  //         className="nav-link dropdown-toggle"
  //         href="#"
  //         id="navbarDropdown"
  //         role="button"
  //         data-toggle="dropdown"
  //         aria-haspopup="true"
  //         aria-expanded="false"
  //       >
  //         <i className="fa fa-user d-md-none"></i>
  //         <span style={{ fontSize: "14px" }}>{username}</span>
  //       </div>
  //       <div className="dropdown-menu">
  //         <Link to="/register" onClick={this.clearAccount}>
  //           <div className="dropdown-item">Register</div>
  //         </Link>
  //         <div className="dropdown-item">Account</div>
  //         <div className="dropdown-divider" />
  //         <Link to="/" onClick={this.clearAccount}>
  //           <div className="dropdown-item">Logout</div>
  //         </Link>
  //       </div>
  //     </li>
  //   ) : (
  //     <Link to="/login" className="ml-md-3 mt-3 mt-md-0">
  //       <button className="btn-gradient px-4">LOGIN</button>
  //     </Link>
  //   );
  // };
  return (
    <nav
      className="navbar fixed-top navbar-expand-md navbar-dark py-4"
      id="header"
    >
      <Link className="navbar-brand" to="/">
        <img src={logo} alt="logo" />
      </Link>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav ml-auto mt-2 mt-md-0">
          <li className="nav-item active">
            <a className="nav-link font-weight-bold" href="#movieList">
              MOVIES
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link font-weight-bold" href="##">
              THEATERS
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link font-weight-bold" href="##">
              REVIEWS
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link font-weight-bold" href="#contact">
              CONTACT
            </a>
          </li>
          {/* {this.showInfoUserHandler()} */}
        </ul>
      </div>
    </nav>
  );
}

export default Header;

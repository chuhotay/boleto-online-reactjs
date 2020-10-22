import React from "react";
import pageNotFound from "assets/images/404.png";
import styles from "./NotFoundPage.module.scss";
import "assets/sass/components/button.scss";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className={styles.Container}>
      <div className={styles.Content}>
        <img src={pageNotFound} alt="pageNotFound" />
        <p>Oops.. Looks Like You Got Lost :(</p>
        <Link to="/">
          <button className="btn-gradient">
            <i class="fa fa-angle-double-left font-weight-bold mr-2"></i>
            BACK TO HOME
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;

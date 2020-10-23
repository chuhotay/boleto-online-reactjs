import React from "react";
import styles from "./Banner.module.scss";

function Banner() {
  return (
    <div className={styles.Banner}>
      <div className={styles.BannerBg} />
      <div className={styles.Overlay}></div>
      <div className={`${styles.Content} container`}>
        <h1 className={styles.Title}>
          get <span className={styles.Movie}>movie</span> tickets
        </h1>
        <p>
          Buy movie tickets in advance, find movie times watch trailer, read
          movie reviews and much more
        </p>
      </div>
    </div>
  );
}

export default Banner;

import React from "react";
import styles from "./ApplicableOffer.module.scss";

function ApplicableOffer(props) {
  return (
    <div className={styles.ApplicableOffer}>
      <img src={props.logo} alt="logo" />
      <p className={styles.Title}>{props.title}</p>
      <span className={styles.Desc}>{props.desc}</span>
    </div>
  );
}

export default ApplicableOffer;

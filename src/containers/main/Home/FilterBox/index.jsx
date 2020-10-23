import React from "react";
import styles from "./FilterBox.module.scss";
import movie from "assets/images/cinema.png";
import "assets/sass/components/button.scss";
import hours from "assets/images/exp.png";
import theater from "assets/images/city.png";
import date from "assets/images/date.png";

function FilterBox() {
  return (
    <div className={`${styles.Search} container-lg p-0`}>
      <div className={styles.Overlay}></div>
      <div className={styles.Content}>
        <div className={styles.Header}>
          <div className="row">
            <div className="col-9">
              <h6 className={styles.Category}>WELCOME TO BOLETO</h6>
              <h3 className={styles.Title}>WHAT ARE YOU LOOKING FOR</h3>
            </div>
            <div className="col-3 text-right d-none d-sm-block">
              <button className="btn-gradient-square">PROCEED</button>
            </div>
          </div>
        </div>
        <div className={styles.Bottom}>
          <form className={styles.SearchForm}>
            <div className="row">
              <div
                className={`${styles.MovieOption} col-12 col-sm-6 col-md-6 col-lg-3`}
              >
                <span className={styles.Thumb}>
                  <img src={movie} alt="movie" />
                </span>
                <span className={styles.Type}>Movie</span>
                <select className={styles.Select} defaultValue={"DEFAULT"}>
                  <option value="DEFAULT" disabled>
                    Choose movie
                  </option>
                </select>
              </div>
              <div
                className={`${styles.TheaterOption} col-12 col-sm-6 col-md-6 col-lg-3 mt-4 mt-sm-0`}
              >
                <span className={styles.Thumb}>
                  <img src={theater} alt="theater" />
                </span>
                <span className={styles.Type}>Theater</span>
                <select defaultValue={"DEFAULT"} className={styles.Select}>
                  <option value="DEFAULT" disabled>
                    Choose theater
                  </option>
                </select>
              </div>
              <div
                className={`${styles.DateOption} col-12 col-sm-6 col-md-6 col-lg-3 mt-4 mt-sm-4 mt-lg-0`}
              >
                <span className={styles.Thumb}>
                  <img src={date} alt="date" />
                </span>
                <span className={styles.Type}>Date</span>
                <select defaultValue={"DEFAULT"} className={styles.Select}>
                  <option value="DEFAULT" disabled>
                    Choose date
                  </option>
                </select>
              </div>
              <div
                className={`${styles.HoursOption} col-12 col-sm-6 col-md-6 col-lg-3 mt-4 mt-sm-4 mt-lg-0`}
              >
                <span className={styles.Thumb}>
                  <img src={hours} alt="hours" />
                </span>
                <span className={styles.Type}>Hour</span>
                <select defaultValue={"DEFAULT"} className={styles.Select}>
                  <option value="DEFAULT" disabled>
                    Choose hour
                  </option>
                </select>
              </div>
              <div
                className={`${styles.HoursOption} d-block d-sm-none col-12 col-sm-6 col-md-6 col-lg-3 mt-5 mt-lg-0`}
              >
                <button className="btn-gradient-square">PROCEED</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FilterBox;

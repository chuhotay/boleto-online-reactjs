import React from "react";
import styles from "./FilterBox.module.scss";
import movie from "assets/images/cinema.png";
import "assets/sass/components/button.scss";
import hours from "assets/images/exp.png";
import theater from "assets/images/city.png";
import date from "assets/images/date.png";
import * as movieListActions from "redux/main/actions/movieListActions";
import * as seatPlanActions from "redux/main/actions/seatPlanActions";
import { withRouter, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function FilterBox() {
  const dispatch = useDispatch();

  const history = useHistory();

  const {
    movies,
    theaterFilter,
    dateFilter,
    hourFilter,
    filterResult,
  } = useSelector((state) => state.movieList);

  const onChangeMovieHandler = (e) => {
    const movieId = e.target.value.split("- ")[1];
    dispatch(movieListActions.actChooseMovieFilter(movieId));
  };

  const onChangeTheaterHandler = (e) => {
    dispatch(movieListActions.actChooseTheaterFilter(e.target.value));
  };

  const onChangeDateHandler = (e) => {
    dispatch(movieListActions.actChooseDateFilter(e.target.value));
  };

  const onChangeHourHandler = (e) => {
    dispatch(movieListActions.actChooseHourFilter(e.target.value));
  };

  const renderDateFilterHandler = (dateFilter) => {
    let uniqueDate = [];
    dateFilter.forEach((item) => {
      uniqueDate.push(item.ngayChieuGioChieu.substring(0, 10));
    });

    uniqueDate = uniqueDate.filter((v, i, a) => a.indexOf(v) === i);

    return uniqueDate.map((date, index) => <option key={index}>{date}</option>);
  };
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
              {filterResult ? (
                <button
                  className="btn-gradient-square"
                  onClick={() => {
                    history.push(`/seat-plan/${filterResult}`);
                    dispatch(seatPlanActions.actClearShowTimeDetail());
                    dispatch(movieListActions.actClearFilterResult());
                  }}
                >
                  PROCEED
                </button>
              ) : (
                <button
                  className="btn-gradient-square"
                  style={{ cursor: "not-allowed" }}
                  disabled
                >
                  PROCEED
                </button>
              )}
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
                <select
                  className={styles.Select}
                  defaultValue={"DEFAULT"}
                  onChange={onChangeMovieHandler}
                >
                  <option value="DEFAULT" disabled>
                    Choose movie
                  </option>
                  {movies.items?.map((movie, index) => (
                    <option key={index}>
                      {movie.tenPhim} - {movie.maPhim}
                    </option>
                  ))}
                </select>
              </div>
              <div
                className={`${styles.TheaterOption} col-12 col-sm-6 col-md-6 col-lg-3 mt-4 mt-sm-0`}
              >
                <span className={styles.Thumb}>
                  <img src={theater} alt="theater" />
                </span>
                <span className={styles.Type}>Theater</span>
                <select
                  defaultValue={"DEFAULT"}
                  className={styles.Select}
                  onChange={onChangeTheaterHandler}
                >
                  <option value="DEFAULT" disabled>
                    Choose theater
                  </option>
                  {theaterFilter?.map((theater, index) => (
                    <option key={index}>{theater.tenCumRap}</option>
                  ))}
                </select>
              </div>
              <div
                className={`${styles.DateOption} col-12 col-sm-6 col-md-6 col-lg-3 mt-4 mt-sm-4 mt-lg-0`}
              >
                <span className={styles.Thumb}>
                  <img src={date} alt="date" />
                </span>
                <span className={styles.Type}>Date</span>
                <select
                  defaultValue={"DEFAULT"}
                  className={styles.Select}
                  onChange={onChangeDateHandler}
                >
                  <option value="DEFAULT" disabled>
                    Choose date
                  </option>
                  {renderDateFilterHandler(dateFilter)}
                </select>
              </div>
              <div
                className={`${styles.HoursOption} col-12 col-sm-6 col-md-6 col-lg-3 mt-4 mt-sm-4 mt-lg-0`}
              >
                <span className={styles.Thumb}>
                  <img src={hours} alt="hours" />
                </span>
                <span className={styles.Type}>Hour</span>
                <select
                  defaultValue={"DEFAULT"}
                  className={styles.Select}
                  onChange={onChangeHourHandler}
                >
                  <option value="DEFAULT" disabled>
                    Choose hour
                  </option>
                  {hourFilter?.map((hour, index) => (
                    <option key={index}>
                      {hour.ngayChieuGioChieu.substring(11, 19)}
                    </option>
                  ))}
                </select>
              </div>
              <div
                className={`${styles.HoursOption} d-block d-sm-none col-12 col-sm-6 col-md-6 col-lg-3 mt-5 mt-lg-0`}
              >
                {filterResult ? (
                  <button
                    className="btn-gradient-square"
                    onClick={() => {
                      history.push(`/seat-plan/${filterResult}`);
                      dispatch(seatPlanActions.actClearShowTimeDetail());
                      dispatch(movieListActions.actClearFilterResult());
                    }}
                  >
                    PROCEED
                  </button>
                ) : (
                  <button
                    className="btn-gradient-square"
                    style={{ cursor: "not-allowed" }}
                    disabled
                  >
                    PROCEED
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default withRouter(FilterBox);

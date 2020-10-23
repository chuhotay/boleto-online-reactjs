import React, { useState, useEffect, Fragment } from "react";
import styles from "./MovieList.module.scss";
import "assets/sass/components/button.scss";
import * as movieListActions from "redux/main/actions/movieListActions";
import { useDispatch, useSelector } from "react-redux";
import { GROUP_ID } from "settings/apiConfig";
import PreLoader from "components/PreLoader";
import MovieItem from "./MovieItem";

function MovieList() {
  const [isFetchMovies, setIsFetchMovies] = useState(false);
  const [changeShowing, setChangeShowing] = useState({
    numOfMovieShowing: 12,
    sortBy: 1,
  });

  const [currentPage, setCurrentPage] = useState(1);

  const [numOfMovieShowingRef] = useState(React.createRef());

  const [sortByRef] = useState(React.createRef());

  const movies = useSelector((state) => state.movieList.movies);

  const loading = useSelector((state) => state.movieList.loading);

  const listMoviesPerOption = useSelector(
    (state) => state.movieList.listMoviesPerOption
  );

  const totalPages = useSelector((state) => state.movieList.movies.totalPages);

  const dispatch = useDispatch();

  const changeOptionHandler = (event) => {
    let { name, value } = event.target;
    setChangeShowing({ ...changeShowing, [name]: value });
  };

  useEffect(() => {
    if (!isFetchMovies) {
      dispatch(movieListActions.actFetchAllMovies(GROUP_ID, currentPage, 20));
      setIsFetchMovies(true);
    }

    if (movies?.items) {
      dispatch(movieListActions.actChangeShowingOption(changeShowing));
    }
  }, [changeShowing, currentPage]);

  const clearSelectionHandler = () => {
    numOfMovieShowingRef.current.value = "12";
    sortByRef.current.value = "1";
  };

  const clickButtonPaginationHandler = (isPrevOrNext) => {
    // true: next | false: prev
    if (isPrevOrNext) {
      setCurrentPage(currentPage + 1);
      setIsFetchMovies(false);
    } else {
      setCurrentPage(currentPage - 1);
      setIsFetchMovies(false);
    }
    clearSelectionHandler();
  };

  const renderButtonPaginationHandler = () => {
    let element = "";
    if (currentPage === 1 && totalPages > 1) {
      element = (
        <Fragment>
          <li className={`${styles.Active1} page-item`}>
            <button disabled className="btn-disabled">
              <i className="fa fa-angle-double-left mr-1 font-weight-bold"></i>
              Prev
            </button>
          </li>
          <li className="page-item text-white px-4 d-flex align-items-center">
            Page {currentPage} / {totalPages}
          </li>
          <li className={`${styles.Active5} page-item`}>
            <button
              onClick={() => clickButtonPaginationHandler(true)}
              className="btn-gradient"
            >
              Next
              <i className="fa fa-angle-double-right ml-1 font-weight-bold"></i>
            </button>
          </li>
        </Fragment>
      );
    } else if (currentPage < totalPages) {
      element = (
        <Fragment>
          <li className={`${styles.Active1} page-item`}>
            <button
              onClick={() => clickButtonPaginationHandler(false)}
              className="btn-gradient"
            >
              <i className="fa fa-angle-double-left mr-1 font-weight-bold"></i>
              Prev
            </button>
          </li>
          <li className="page-item text-white px-4 d-flex align-items-center">
            Page {currentPage} / {totalPages}
          </li>
          <li className={`${styles.Active5} page-item`}>
            <button
              onClick={() => clickButtonPaginationHandler(true)}
              className="btn-gradient"
            >
              Next
              <i className="fa fa-angle-double-right ml-1 font-weight-bold"></i>
            </button>
          </li>
        </Fragment>
      );
    } else if (currentPage === totalPages && currentPage > 1) {
      element = (
        <Fragment>
          <li className={`${styles.Active1} page-item`}>
            <button
              onClick={() => clickButtonPaginationHandler(false)}
              className="btn-gradient"
            >
              <i className="fa fa-angle-double-left mr-1 font-weight-bold"></i>
              Prev
            </button>
          </li>
          <li className="page-item text-white px-4 d-flex align-items-center">
            Page {currentPage} / {totalPages}
          </li>
          <li className={`${styles.Active5} page-item`}>
            <button disabled className="btn-disabled">
              Next
              <i className="fa fa-angle-double-right ml-1 font-weight-bold"></i>
            </button>
          </li>
        </Fragment>
      );
    }
    return element;
  };

  const renderMoviesHandler = () => {
    return listMoviesPerOption?.map((movie, index) => {
      return (
        <MovieItem
          key={index}
          hinhAnh={movie.hinhAnh}
          tenPhim={movie.tenPhim}
          maPhim={movie.maPhim}
          videoTrailer={movie.trailer}
        />
      );
    });
  };

  if (loading) {
    return <PreLoader />;
  } else {
    return (
      <div className="container-lg p-4 p-lg-0">
        <div className={styles.Content}>
          <div className={styles.Filter}>
            <div className="row">
              <div className={`${styles.FilterShow} col-12 col-sm-6`}>
                <span className={styles.Type}>Show: </span>
                <select
                  onChange={changeOptionHandler}
                  name="numOfMovieShowing"
                  className={styles.Option}
                  ref={numOfMovieShowingRef}
                >
                  <option>12</option>
                  <option>16</option>
                  <option>20</option>
                </select>
              </div>
              <div className={`${styles.SortBy} col-12 col-sm-6 mt-3 mt-sm-0`}>
                <span className={styles.Type}>Sort By: </span>
                <select
                  onChange={changeOptionHandler}
                  name="sortBy"
                  className={styles.Option}
                  ref={sortByRef}
                >
                  <option value="1">All</option>
                  <option value="2">Now showing</option>
                  <option value="3">Coming</option>
                </select>
              </div>
            </div>
          </div>
          <div className={styles.MovieList} id="movieList">
            <div className="row">{renderMoviesHandler()}</div>
          </div>
          <nav className={`${styles.Pagination} mt-5 mb-0`}>
            <ul className="pagination justify-content-center">
              {renderButtonPaginationHandler()}
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default MovieList;

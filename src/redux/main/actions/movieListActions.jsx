import * as movieListConstants from "redux/main/constants/movieListConstants";
import { movieListService } from "services/MovieListServices";
import { movieDetailService } from "services/MovieDetailServices";

export const actFetchAllMovies = (groupId, currentPage, resPerPage) => {
  return (dispatch) => {
    dispatch({ type: movieListConstants.FETCH_ALL_MOVIES_REQUEST });
    return movieListService
      .fetchAllMovies(groupId, currentPage, resPerPage)
      .then((res) => {
        dispatch({
          type: movieListConstants.FETCH_ALL_MOVIES_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: movieListConstants.FETCH_ALL_MOVIES_FAIL,
          payload: err.response.data,
        });
      });
  };
};

export const actChangeShowingOption = (query) => {
  return {
    type: movieListConstants.CHANGE_SHOWING_OPTION,
    payload: query,
  };
};

export const actChooseMovieFilter = (movieId) => {
  return (dispatch) => {
    return movieDetailService
      .fetchMovieDetail(movieId)
      .then((res) => {
        dispatch({
          type: movieListConstants.CHOOSE_MOVIE_FILTER,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const actChooseTheaterFilter = (theater) => {
  return {
    type: movieListConstants.CHOOSE_THEATER_FILTER,
    payload: theater,
  };
};

export const actChooseDateFilter = (date) => {
  return {
    type: movieListConstants.CHOOSE_DATE_FILTER,
    payload: date,
  };
};

export const actChooseHourFilter = (hour) => {
  return {
    type: movieListConstants.CHOOSE_HOUR_FILTER,
    payload: hour,
  };
};

export const actClearFilterResult = () => {
  return {
    type: movieListConstants.CLEAR_FILTER_RESULT,
  };
};

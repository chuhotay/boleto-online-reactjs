import * as movieDetailConstants from "redux/main/constants/movieDetailConstants";
import { movieDetailService } from "services/MovieDetailServices";

export const actFetchMovieDetail = (movieId) => {
  return (dispatch) => {
    dispatch({ type: movieDetailConstants.FETCH_MOVIE_DETAIL_REQUEST });
    return movieDetailService
      .fetchMovieDetail(movieId)
      .then((res) => {
        dispatch({
          type: movieDetailConstants.FETCH_MOVIE_DETAIL_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: movieDetailConstants.FETCH_MOVIE_DETAIL_FAIL,
          payload: err.response.data,
        });
      });
  };
};

export const actChangeShowTimeOption = (query) => {
  return {
    type: movieDetailConstants.CHANGE_SHOW_TIME_OPTION,
    payload: query,
  };
};

export const actGetIdShowTimeSelected = (idShowTime) => {
  return {
    type: movieDetailConstants.GET_ID_SHOW_TIME_SELECTED,
    payload: idShowTime,
  };
};

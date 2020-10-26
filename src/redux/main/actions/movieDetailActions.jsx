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

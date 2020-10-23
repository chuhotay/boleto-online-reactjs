import * as movieListConstants from "redux/main/constants/movieListConstants";
import { movieListService } from "services/MovieListServices";

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

export const actViewTrailer = (videoTrailer) => {
  return {
    type: movieListConstants.VIEW_TRAILER,
    payload: videoTrailer,
  };
};

export const actIsOpenVideoTrailer = (isOpen) => {
  return {
    type: movieListConstants.IS_OPEN_VIDEO_TRAILER,
    payload: isOpen,
  };
};

export const actChangeShowingOption = (query) => {
  return {
    type: movieListConstants.CHANGE_SHOWING_OPTION,
    payload: query,
  };
};

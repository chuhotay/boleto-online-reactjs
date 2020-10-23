import * as movieListConstants from "redux/main/constants/movieListConstants";

const initialState = {
  loading: false,
  error: null,
  videoTrailer: "",
  isOpenVideoTrailer: false,
  movies: {},
  moviesSortBy: 1, // 1. All 2. Now showing 3. Coming
  listMoviesPerOption: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case movieListConstants.FETCH_ALL_MOVIES_REQUEST:
      state.loading = true;
      return { ...state };

    case movieListConstants.FETCH_ALL_MOVIES_SUCCESS:
      state.loading = false;
      state.movies = payload;
      state.listMoviesPerOption = payload.items.slice(0, 12);
      return { ...state };

    case movieListConstants.FETCH_ALL_MOVIES_FAIL:
      state.loading = false;
      return { ...state };

    case movieListConstants.CHANGE_SHOWING_OPTION:
      {
        let listMovies = [...state.movies.items];
        let { numOfMovieShowing, sortBy } = payload;
        let result = [];

        switch (sortBy) {
          case "2":
            result = listMovies
              .filter((items) => {
                return items.ngayKhoiChieu.split("-")[1] <= "07";
              })
              .slice(0, numOfMovieShowing);
            state.listMoviesPerOption = result;
            break;
          case "3":
            result = listMovies
              .filter((items) => {
                return items.ngayKhoiChieu.split("-")[1] > "07";
              })
              .slice(0, numOfMovieShowing);
            state.listMoviesPerOption = result;
            break;
          default:
            result = listMovies;
            state.listMoviesPerOption = result.slice(0, numOfMovieShowing);
            break;
        }
      }
      return { ...state };

    case movieListConstants.VIEW_TRAILER:
      state.videoTrailer = payload;
      console.log(payload);
      return { ...state };

    case movieListConstants.IS_OPEN_VIDEO_TRAILER:
      state.isOpenVideoTrailer = payload;
      console.log(payload);
      return { ...state };

    default:
      return state;
  }
};

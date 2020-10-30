import * as movieListConstants from "redux/main/constants/movieListConstants";

const initialState = {
  loading: false,
  error: null,
  movies: {},
  moviesSortBy: 1, // 1. All 2. Now showing 3. Coming
  listMoviesPerOption: [],
  // Filter
  theaterFilter: [],
  dateFilter: [],
  hourFilter: [],
  filterResult: "",
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

    case movieListConstants.CHOOSE_MOVIE_FILTER:
      let theaterFilterUpdate = [];
      payload.heThongRapChieu.forEach((brand) => {
        brand.cumRapChieu.forEach((branch) => {
          theaterFilterUpdate.push(branch);
        });
      });

      state.theaterFilter = theaterFilterUpdate;
      return { ...state };

    case movieListConstants.CHOOSE_THEATER_FILTER:
      // Get list date filter
      let listDateFilterUpdate = [];
      state.theaterFilter.forEach((brand) => {
        if (brand.tenCumRap === payload) {
          brand.lichChieuPhim.forEach((date) => {
            listDateFilterUpdate.push(date);
          });
        }
      });

      state.dateFilter = listDateFilterUpdate;
      return { ...state };

    case movieListConstants.CHOOSE_DATE_FILTER:
      let listHourFilterUpdate = [...state.dateFilter];
      state.hourFilter = listHourFilterUpdate.filter(
        (hour) => hour.ngayChieuGioChieu.substring(0, 10) === payload
      );
      return { ...state };

    case movieListConstants.CHOOSE_HOUR_FILTER:
      for (let item of state.hourFilter) {
        if (item.ngayChieuGioChieu.substring(11, 19) === payload) {
          state.filterResult = item.maLichChieu;
        }
      }

      return { ...state };
    default:
      return state;
  }
};

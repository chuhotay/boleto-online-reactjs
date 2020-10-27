import * as movieDetailConstants from "redux/main/constants/movieDetailConstants";

const initialState = {
  loading: false,
  error: null,
  movieDetails: {},
  theaterSelected: null,
  dateSelected: null,
  listTheatersOption: [],
  listDateOption: [],
  listShowTimePerOption: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case movieDetailConstants.FETCH_MOVIE_DETAIL_REQUEST:
      state.loading = true;
      return { ...state };

    case movieDetailConstants.FETCH_MOVIE_DETAIL_SUCCESS:
      {
        state.loading = false;

        state.movieDetails = payload;

        // Get list theaters option
        state.listTheatersOption = [];
        for (let theater of state.movieDetails.heThongRapChieu) {
          state.listTheatersOption.push(theater.maHeThongRap);
        }

        // Get list date option
        let listDateOptionUpdate = [];
        state.movieDetails.heThongRapChieu.forEach((brand) => {
          brand.cumRapChieu.forEach((branch) => {
            branch.lichChieuPhim.forEach((date) => {
              let subDate = date.ngayChieuGioChieu.substring(0, 10);
              if (brand.maHeThongRap === state.listTheatersOption[0]) {
                listDateOptionUpdate.push(subDate);
              }
            });
          });
        });

        // Get unique date
        state.listDateOption = listDateOptionUpdate.filter(
          (v, i, a) => a.indexOf(v) === i
        );

        // Get list show time per theater and date
        let listShowTimePerOptionUpdate = [];
        state.movieDetails.heThongRapChieu.forEach((brand) => {
          brand.cumRapChieu.forEach((branch) => {
            branch.lichChieuPhim.forEach((date) => {
              if (brand.maHeThongRap === state.listTheatersOption[0]) {
                listShowTimePerOptionUpdate.push(branch);
              }
            });
          });
        });

        state.listShowTimePerOption = listShowTimePerOptionUpdate.filter(
          (v, i, a) => a.indexOf(v) === i
        );

        // Set default show time option
        state.theaterSelected = state.listTheatersOption[0];
        state.dateSelected = state.listDateOption[0];

        // Set theater filter
        let theaterFilterUpdate = [];
        payload.heThongRapChieu.forEach((brand) => {
          brand.cumRapChieu.forEach((branch) => {
            theaterFilterUpdate.push(branch);
          });
        });

        state.theaterFilter = theaterFilterUpdate;
      }
      return { ...state };

    case movieDetailConstants.FETCH_MOVIE_DETAIL_FAIL:
      state.loading = false;
      state.error = payload;
      return { ...state };

    case movieDetailConstants.CHANGE_SHOW_TIME_OPTION:
      {
        let { theaterSelected, dateSelected } = payload;

        if (theaterSelected) {
          state.theaterSelected = theaterSelected;
        }

        let theaterSelectedIndex = state.listTheatersOption.findIndex(
          (theater) => {
            return theater === state.theaterSelected;
          }
        );

        // Get list date option
        let listDateOptionUpdate = [];
        state.movieDetails.heThongRapChieu.forEach((brand) => {
          brand.cumRapChieu.forEach((branch) => {
            branch.lichChieuPhim.forEach((date) => {
              let subDate = date.ngayChieuGioChieu.substring(0, 10);
              if (
                brand.maHeThongRap ===
                state.listTheatersOption[theaterSelectedIndex]
              ) {
                listDateOptionUpdate.push(subDate);
              }
            });
          });
        });

        // Get unique date
        state.listDateOption = listDateOptionUpdate.filter(
          (v, i, a) => a.indexOf(v) === i
        );

        if (dateSelected) {
          state.dateSelected = dateSelected;
        } else {
          state.dateSelected = state.listDateOption[0];
        }

        // Get list show time per theater and date
        let listShowTimePerOptionUpdate = [];
        state.movieDetails.heThongRapChieu.forEach((brand) => {
          brand.cumRapChieu.forEach((branch) => {
            if (
              brand.maHeThongRap ===
              state.listTheatersOption[theaterSelectedIndex]
            ) {
              listShowTimePerOptionUpdate.push(branch);
            }
          });
        });

        state.listShowTimePerOption = listShowTimePerOptionUpdate.filter(
          (v, i, a) => a.indexOf(v) === i
        );
      }
      return { ...state };
    case movieDetailConstants.GET_ID_SHOW_TIME_SELECTED:
      state.idShowTimeSelected = payload;
      return { ...state };
    default:
      return state;
  }
};

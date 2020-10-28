import * as seatPlanConstants from "redux/main/constants/seatPlanConstants";

const initialState = {
  loading: false,
  error: null,
  showTimeDetails: {},
  listSelectedSeats: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case seatPlanConstants.FETCH_SHOW_TIME_DETAIL_REQUEST:
      state.loading = true;
      return { ...state };

    case seatPlanConstants.FETCH_SHOW_TIME_DETAIL_SUCCESS:
      state.showTimeDetails = action.payload;
      state.loading = false;
      return { ...state };

    case seatPlanConstants.FETCH_SHOW_TIME_DETAIL_FAIL:
      state.loading = false;
      state.error = action.payload;
      return { ...state };

    case seatPlanConstants.GET_SELECTED_SEATS:
      let listSelectedSeatsUpdate = [...state.listSelectedSeats];

      let index = listSelectedSeatsUpdate.findIndex(
        (listSelectedSeats) => listSelectedSeats.stt === action.seat.stt
      );

      if (index !== -1) {
        listSelectedSeatsUpdate.splice(index, 1);
      } else {
        listSelectedSeatsUpdate.push({
          ...action.seat,
          seatName: `${action.seatName}${action.seatNum}`,
        });
      }

      state.listSelectedSeats = listSelectedSeatsUpdate;
      return { ...state };

    default:
      return state;
  }
};

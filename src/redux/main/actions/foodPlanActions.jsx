import * as foodPlanConstants from "redux/main/constants/foodPlanConstants";
import { foodPlanServices } from "services/FoodPlanServices";

export const actAddFood = (food, actionType) => {
  return {
    type: foodPlanConstants.ADD_FOOD,
    food,
    actionType,
  };
};

export const actBookingTickets = (
  maLichChieu,
  danhSachVe,
  taiKhoanNguoiDung,
  token
) => {
  return (dispatch) => {
    dispatch({ type: foodPlanConstants.BOOKING_TICKETS_REQUEST });
    return foodPlanServices
      .bookingTickets(maLichChieu, danhSachVe, taiKhoanNguoiDung, token)
      .then((res) => {
        dispatch({
          type: foodPlanConstants.BOOKING_TICKETS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: foodPlanConstants.BOOKING_TICKETS_FAIL,
          payload: err.response.data,
        });
      });
  };
};

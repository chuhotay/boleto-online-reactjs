import apiCaller from "utils/apiCaller";

class SeatPlanServices {
  fetchShowTimeDetail = (idShowTime) => {
    return apiCaller(
      `QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${idShowTime}`,
      "GET"
    );
  };
}

export const seatPlanServices = new SeatPlanServices();

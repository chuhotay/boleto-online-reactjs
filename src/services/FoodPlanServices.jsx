import axios from "axios";

class FoodPlanServices {
  bookingTickets = (maLichChieu, danhSachVe, taiKhoanNguoiDung, token) => {
    return axios({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/DatVe",
      method: "POST",
      data: {
        maLichChieu,
        danhSachVe,
        taiKhoanNguoiDung,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
}

export const foodPlanServices = new FoodPlanServices();

import apiCaller from "utils/apiCaller";

export class AuthServices {
  userSignIn = (userInfo) => {
    return apiCaller("QuanLyNguoiDung/DangNhap", "POST", userInfo);
  };

  userSignUp = (userInfo) => {
    return apiCaller("QuanLyNguoiDung/DangKy", "POST", userInfo);
  };
}

export const authServices = new AuthServices();

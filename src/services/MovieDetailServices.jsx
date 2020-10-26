import apiCaller from "utils/apiCaller";

class MovieDetailService {
  fetchMovieDetail = (movieId) => {
    return apiCaller(
      `QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`,
      "GET"
    );
  };
}

export const movieDetailService = new MovieDetailService();

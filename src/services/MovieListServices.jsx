import apiCaller from "utils/apiCaller";

class MovieListServices {
  fetchAllMovies = (groupId, currentPage, resPerPage) => {
    return apiCaller(
      `QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=${groupId}&soTrang=${currentPage}&soPhanTuTrenTrang=${resPerPage}`
    );
  };
}

export const movieListService = new MovieListServices();

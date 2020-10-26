import HomePage from "containers/main/Home";
import MovieDetail from "containers/main/MovieDetail";

const mainRoutes = [
  {
    path: "/",
    exact: true,
    component: HomePage,
  },
  {
    path: "/movie-detail/:movieId",
    exact: false,
    component: MovieDetail,
  },
];

export default mainRoutes;

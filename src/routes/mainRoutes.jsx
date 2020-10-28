import FoodPlan from "containers/main/FoodPlan";
import HomePage from "containers/main/Home";
import MovieDetail from "containers/main/MovieDetail";
import SeatPlan from "containers/main/SeatPlan";

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
  {
    path: "/seat-plan/:idShowTime",
    exact: false,
    component: SeatPlan,
  },
  {
    path: "/food-plan/:idShowTime",
    exact: false,
    component: FoodPlan,
  },
];

export default mainRoutes;

import SignIn from "containers/main/SignIn";
import SignUp from "containers/main/SignUp";
import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainLayout from "layouts/Main";
import mainRoutes from "routes/mainRoutes";
import NotFoundPage from "containers/shared/NotFoundPage";
import TrailerPopup from "components/TrailerPopup";
import { useSelector, useDispatch } from "react-redux";
import * as movieListActions from "redux/main/actions/movieListActions";

function App() {
  const videoTrailer = useSelector((state) => state.movieList.videoTrailer);
  const isOpenVideoTrailer = useSelector(
    (state) => state.movieList.isOpenVideoTrailer
  );
  const dispatch = useDispatch();

  const renderMainRoutesHandler = (routes) => {
    return routes?.map((item, index) => {
      return (
        <MainLayout
          key={index}
          exact={item.exact}
          path={item.path}
          Component={item.component}
        />
      );
    });
  };

  // const renderAdminRoutesHandler = (routes) => {
  //   return routes?.map((item, index) => {
  //     return (

  //     )
  //   })
  // }
  return (
    <Fragment>
      <BrowserRouter>
        <Switch>
          {renderMainRoutesHandler(mainRoutes)}

          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
      <TrailerPopup
        isOpen={isOpenVideoTrailer}
        onClose={() => {
          dispatch(movieListActions.actIsOpenVideoTrailer(false));
        }}
        videoId={videoTrailer}
      />
    </Fragment>
  );
}

export default App;

import SignIn from "containers/main/SignIn";
import SignUp from "containers/main/SignUp";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainLayout from "layouts/Main";
import mainRoutes from "routes/mainRoutes";
import NotFoundPage from "containers/shared/NotFoundPage";

function App() {
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
    <BrowserRouter>
      <Switch>
        {renderMainRoutesHandler(mainRoutes)}

        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import { Route } from "react-router-dom";

const withLayout = (WrappedLayout) => {
  return ({ Component, ...rest }) => (
    <Route
      {...rest}
      render={(propsComponent) => (
        <WrappedLayout>
          <Component {...propsComponent} />
        </WrappedLayout>
      )}
    />
  );
};

export default withLayout;

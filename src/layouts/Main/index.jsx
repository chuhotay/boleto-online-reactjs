import React, { Fragment } from "react";
import Header from "components/Header";
import withLayout from "hoc/withLayout";
import Footer from "components/Footer";
import BackToTop from "components/BackToTop";

function MainLayout(props) {
  return (
    <Fragment>
      <Header />
      <Fragment>{props.children}</Fragment>
      <Footer />
      <BackToTop />
    </Fragment>
  );
}

export default withLayout(MainLayout);

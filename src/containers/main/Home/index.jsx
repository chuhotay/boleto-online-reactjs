import React, { Fragment } from "react";
import Banner from "./Banner";
import FilterBox from "./FilterBox";
import MovieList from "./MovieList";

function HomePage() {
  return (
    <Fragment>
      <Banner />
      <FilterBox />
      <MovieList />
    </Fragment>
  );
}

export default HomePage;

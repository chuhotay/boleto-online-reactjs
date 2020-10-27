import React from "react";
import styles from "./MovieSummery.module.scss";
import { useSelector } from "react-redux";

function MovieSummery() {
  const { moTa } = useSelector((state) => state.movieDetail.movieDetails);

  return (
    <div className={styles.MovieSummery}>
      <h5 className={styles.Title}>SUMMERY</h5>
      <div className={styles.Content}>
        <p>{moTa}</p>
      </div>
    </div>
  );
}

export default MovieSummery;

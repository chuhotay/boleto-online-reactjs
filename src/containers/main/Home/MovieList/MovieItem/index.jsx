import React from "react";
import styles from "./MovieItem.module.scss";
import playButton from "assets/images/play-button.png";
import cake from "assets/images/cake.png";
import tomato from "assets/images/tomato.png";
import { Link } from "react-router-dom";
import * as sharedActions from "redux/main/actions/sharedActions";
import { useDispatch } from "react-redux";
import getIdVideoTrailer from "utils/getIdVideoTrailer";

function MovieItem(props) {
  const dispatch = useDispatch();
  const { hinhAnh, maPhim, tenPhim, videoTrailer } = props;
  return (
    <div
      className={`${styles.MovieItem} col-6 col-sm-4 col-md-4 col-lg-3 col-xl-3 mt-5`}
    >
      <Link to={`/movie-detail/${maPhim}`}>
        <div
          className={`${styles.CardContent} card border-0`}
          style={{ backgroundColor: "#032055" }}
        >
          <div className={styles.ContainImg} style={{ overflow: "hidden" }}>
            <img
              className={`${styles.MovieImg} img-fluid card-img-top`}
              src={hinhAnh}
              alt={tenPhim}
            />
            <div className={styles.Overlay}></div>
          </div>
          <div
            className="card-body pb-1"
            style={{ borderBottom: "1px dashed #11326f" }}
          >
            <h5 className={`${styles.MovieName} card-title`}>
              {tenPhim.split(" ").length > 3
                ? tenPhim.split(" ").slice(0, 3).join(" ") + "..."
                : tenPhim}
            </h5>
          </div>
          <div className={`${styles.CardFooter} card-footer pb-4`}>
            <img src={cake} alt="cake" className="pr-1" />
            <span className="text-white font-weight-bold mr-3">88%</span>
            <img src={tomato} alt="cake" className="pr-1" />
            <span className="text-white font-weight-bold">88%</span>
          </div>
        </div>
      </Link>
      <div
        className={styles.ViewTrailer}
        onClick={() => {
          dispatch(
            sharedActions.actViewTrailer(getIdVideoTrailer(videoTrailer))
          );
          dispatch(sharedActions.actIsOpenVideoTrailer(true));
        }}
      >
        <img className="w-100" src={playButton} alt="play-button" />
      </div>
    </div>
  );
}

export default MovieItem;

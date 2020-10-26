import React, { Fragment } from "react";
import styles from "./BannerDetail.module.scss";
import playTrailer from "assets/images/play-button.png";
import "assets/sass/components/button.scss";
import cake from "assets/images/cake2.png";
import tomato from "assets/images/tomato2.png";
import Moment from "react-moment";
import * as sharedActions from "redux/main/actions/sharedActions";
import getIdVideoTrailer from "utils/getIdVideoTrailer";
import { useDispatch, useSelector } from "react-redux";

function BannerDetail() {
  const dispatch = useDispatch();

  const { tenPhim, ngayKhoiChieu, danhGia, hinhAnh, trailer } = useSelector(
    (state) => state.movieDetail.movieDetails
  );

  return (
    <Fragment>
      <div
        className={`${styles.DetailsBanner} ${styles.BgImg}`}
        style={{ backgroundImage: `url(${hinhAnh})` }}
      >
        <div className="container">
          <div className={styles.Wrapper}>
            <div className={`${styles.Thumb} d-none d-lg-block`}>
              <img src={hinhAnh} alt="movie" />
              <div className={styles.Overlay}></div>
              <div
                className={styles.WatchTrailer}
                onClick={() => {
                  dispatch(
                    sharedActions.actViewTrailer(getIdVideoTrailer(trailer))
                  );
                  dispatch(sharedActions.actIsOpenVideoTrailer(true));
                }}
              >
                <img src={playTrailer} alt="play-trailer" />
              </div>
            </div>
            <div
              className={`${styles.DetailsBannerContent} text-center text-lg-left`}
            >
              <h3 className={styles.Title}>
                {tenPhim?.split(" ").length > 3
                  ? tenPhim.split(" ").slice(0, 3).join(" ") + "..."
                  : tenPhim}
              </h3>
              <div className={styles.Tags}>
                <span>ENGLISH, VIETNAMESE</span>
              </div>
              <span className={styles.TypeOfMovie}>2D | Digital</span>
              <div className={styles.Duration}>
                <div className={styles.Item}>
                  <i className="fa fa-calendar pr-1"></i>
                  <span>
                    <Moment format="DD/MM/YYYY">{ngayKhoiChieu}</Moment>
                  </span>
                </div>
                <div className={styles.Item}>
                  <i className="fa fa-hourglass-half pr-1"></i>
                  <span>120 minutes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.BookArea}>
        <div className="container">
          <div className={`row ${styles.Content}`}>
            <div className="col-6 col-md-3 col-lg-3 text-center">
              <img src={cake} alt="cake" />
              <span className="text-white pl-2 font-weight-bold">88%</span>
              <p className="text-white mt-3">Tomatometer</p>
            </div>
            <div className="col-6 col-md-3 col-lg-3 text-center">
              <img src={tomato} alt="tomato" />
              <span className="text-white pl-2 font-weight-bold">88%</span>
              <p className="text-white mt-3">Audience Score</p>
            </div>
            <div className="col-6 col-md-3 col-lg-3 text-center">
              <i
                className="fa fa-heart text-danger"
                style={{ fontSize: "30px" }}
              ></i>
              <span className="text-white pl-2 font-weight-bold">
                {danhGia}/10
              </span>
              <p className="text-white mt-3">Users Rating</p>
            </div>
            <a
              href="#showTime"
              className="col-6 col-md-3 col-lg-3 d-flex justify-content-center align-items-center"
            >
              <button className="btn-gradient">BOOKING</button>
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default BannerDetail;

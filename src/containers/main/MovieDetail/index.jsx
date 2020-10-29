import React, { Fragment, useEffect } from "react";
import offer01 from "assets/images/offer01.png";
import offer02 from "assets/images/offer02.png";
import offer03 from "assets/images/offer03.png";
import styles from "./MovieDetail.module.scss";
import { useParams } from "react-router-dom";
import * as movieDetailActions from "redux/main/actions/movieDetailActions";
import ApplicableOffer from "./ApplicableOffer";
import BannerDetail from "./BannerDetail";
import { useDispatch, useSelector } from "react-redux";
import MovieSummery from "./MovieSummery";
import PreLoader from "components/PreLoader";
import ShowTime from "./ShowTime";
import PopupNotice from "components/PopupNotice";
import seatPlan from "assets/images/seat-plan.png";
import "assets/sass/components/button.scss";
import * as localStorageUtils from "utils/localStorage";

function MovieDetail() {
  const listOffers = [
    {
      logo: offer01,
      title: "Amazon Pay Cashback",
      desc: "Win Cashback Upto Rs 300*",
    },
    {
      logo: offer02,
      title: "PayPal",
      desc:
        "Transact first time with Paypal and get 100% cashback up to Rs. 500",
    },
    {
      logo: offer03,
      title: "HDFC Bank",
      desc: "Get 15% discount up to INR 100* and INR 50* off on F&B T&C apply",
    },
  ];

  const dispatch = useDispatch();

  const { movieId } = useParams();

  const { loading } = useSelector((state) => state.movieDetail);

  const { idShowTimeSelected } = useSelector((state) => state.movieDetail);

  const username = null;

  if (localStorageUtils.fetchFromStorage("userInfo")) {
    username = localStorageUtils.fetchFromStorage("userInfo").taiKhoan;
  }

  useEffect(() => {
    dispatch(movieDetailActions.actFetchMovieDetail(movieId));
  }, []);

  return loading ? (
    <PreLoader />
  ) : (
    <Fragment>
      <BannerDetail />
      <main className={`${styles.Main} container`}>
        <div className="row">
          <div className="col-lg-9">
            <MovieSummery />
            <ShowTime />
            <PopupNotice
              id="popupChooseShowTime"
              preventClickOutSide="none"
              preventESC="true"
            >
              <div className="modal-body">
                <p className="font-weight-bold">Welcome!</p>
                <h3 className="text-info mb-4 font-weight-bold">
                  SELECT YOUR SEATS
                </h3>
                <img src={seatPlan} alt="seat-plan" />
              </div>
              <div className="py-4">
                {username ? (
                  <a href={`/seat-plan/${idShowTimeSelected}`}>
                    <button type="button" className="btn-gradient">
                      SEAT PLANS
                      <i className="fa fa-angle-right ml-2 font-weight-bold"></i>
                    </button>
                  </a>
                ) : (
                  <a href="/sign-in">
                    <button type="button" className="btn-gradient">
                      LOGIN
                      <i className="fa fa-angle-right ml-2 font-weight-bold"></i>
                    </button>
                  </a>
                )}
              </div>
            </PopupNotice>
          </div>
          <div className="col-lg-3 mb-5">
            <h5 className={styles.Title}>Applicable Offer</h5>
            {listOffers.map((offer, index) => {
              return (
                <ApplicableOffer
                  key={index}
                  logo={offer.logo}
                  title={offer.title}
                  desc={offer.desc}
                />
              );
            })}
          </div>
        </div>
      </main>
    </Fragment>
  );
}

export default MovieDetail;

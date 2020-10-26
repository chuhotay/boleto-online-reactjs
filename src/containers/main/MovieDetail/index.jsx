import React, { Fragment, useEffect } from "react";
import offer01 from "assets/images/offer01.png";
import offer02 from "assets/images/offer02.png";
import offer03 from "assets/images/offer03.png";
import styles from "./MovieDetail.module.scss";
import { useParams } from "react-router-dom";
import * as movieDetailActions from "redux/main/actions/movieDetailActions";
import ApplicableOffer from "./ApplicableOffer";
import BannerDetail from "./BannerDetail";
import { useDispatch } from "react-redux";

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

  useEffect(() => {
    dispatch(movieDetailActions.actFetchMovieDetail(movieId));
  }, []);

  return (
    <Fragment>
      <BannerDetail />
      <main className={`${styles.Main} container`}>
        <div className="row">
          <div className="col-lg-9"></div>
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

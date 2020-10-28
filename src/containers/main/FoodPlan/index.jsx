import React, { Fragment, useState, useEffect } from "react";
import styles from "./FoodPlan.module.scss";
import noti from "assets/images/noti.png";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import FoodItem from "./FoodItem";
import PopupNotice from "components/PopupNotice";
import BookingSummery from "./BookingSummery";

function FoodPlan() {
  const [minutes, setMinutes] = useState(1);

  const [seconds, setSeconds] = useState(0);

  const [showPopupTimeOut, setShowPopupTimeOut] = useState(false);

  const { thongTinPhim } = useSelector(
    (state) => state.seatPlan.showTimeDetails
  );

  const { listSelectedSeats } = useSelector((state) => state.seatPlan);

  const { food } = useSelector((state) => state.foodPlan);

  const history = useHistory();

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
          setShowPopupTimeOut(true);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  }, [seconds, minutes]);

  const renderCountDownHandler = (minutes, seconds) => {
    let element = "";
    if (minutes === 0 && seconds === 0) {
      element = (
        <Fragment>
          <p style={{ fontSize: "35px", margin: "0" }}>0:00</p>
          <span>Mins Left</span>
        </Fragment>
      );
    } else {
      element = (
        <Fragment>
          <p style={{ fontSize: "35px", margin: "0" }}>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </p>
          <span>Mins Left</span>
        </Fragment>
      );
    }
    return element;
  };

  const renderFoodHandler = () => {
    return food.map((food, index) => {
      return <FoodItem key={index} food={food} />;
    });
  };

  if (listSelectedSeats.length < 1) {
    return history.goBack();
  }

  return (
    <Fragment>
      <div className={styles.FoodPlan}>
        <div className={styles.Banner}>
          <div className={styles.BgImg}></div>
          <div className={styles.Overlay}></div>
          <div className={styles.Content}>
            <h3 className={styles.MovieName}>
              {thongTinPhim.tenPhim.split(" ").length > 3
                ? thongTinPhim.tenPhim.split(" ").slice(0, 3).join(" ") + "..."
                : thongTinPhim.tenPhim}
            </h3>
            <p className={styles.Info}>
              {thongTinPhim.tenCumRap} | Theater{" "}
              {thongTinPhim.tenRap.split(" ")[1]}
            </p>
          </div>
        </div>
        <div className={styles.CountDown}>
          <div className="container py-4">
            <div className="row text-left">
              <div className="col-12 col-sm-4 col-md-3 d-flex align-items-center justify-content-center">
                <button
                  className="btn-gradient px-4"
                  onClick={() => {
                    history.goBack();
                  }}
                >
                  <i className="fa fa-angle-double-left mr-2 font-weight-bold"></i>
                  BACK
                </button>
              </div>
              <div className="col-12 col-sm-8 col-md-6 text-white pt-4 pt-sm-0 d-flex align-items-center justify-content-center">
                <Fragment>
                  <span>{thongTinPhim.ngayChieu}</span>
                  <button className="btn-gradient-square ml-5">
                    {thongTinPhim.gioChieu}
                  </button>
                </Fragment>
              </div>
              <div className="col-12 col-md-3 text-white text-center mt-3 mt-md-0">
                {renderCountDownHandler(minutes, seconds)}
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.MainContent} px-lg-5`}>
          <div className={`${styles.Title} text-center mb-5`}>
            <h2 className="font-weight-bold">WE HAVE FOOD</h2>
            <p className="text-white">Prebook Your Meal and Save More!</p>
          </div>
          <div className="row">
            <div className="col-12 col-lg-8">
              <div className="row">{renderFoodHandler()}</div>
            </div>
            <div
              className={`${styles.BookingSummery} col-12 col-lg-4 mt-4 mt-lg-0`}
            >
              <BookingSummery />
            </div>
          </div>
        </div>
      </div>
      {showPopupTimeOut ? (
        <PopupNotice>
          <div
            className="text-center bg-white p-4"
            style={{ borderRadius: "6px" }}
          >
            <img
              src={noti}
              alt="times up noti"
              style={{
                width: "100px",
                paddingLeft: "30px",
                paddingBottom: "10px",
              }}
            />
            <p className="text-black">
              Times up! Please{" "}
              <span
                className="text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.goBack();
                }}
              >
                click here
              </span>{" "}
              to re-book your tickets!
            </p>
          </div>
        </PopupNotice>
      ) : null}
    </Fragment>
  );
}

export default FoodPlan;

import React, { useState, useEffect, Fragment } from "react";
import styles from "./SeatPlan.module.scss";
import "assets/sass/components/button.scss";
import screen from "assets/images/screen-thumb.png";
import seatFree from "assets/images/seat-free.png";
import seatBooked from "assets/images/seat-booked.png";
import seatBooking from "assets/images/seat-booking.png";
import noti from "assets/images/noti.png";
import * as seatPlanActions from "redux/main/actions/seatPlanActions";
import PreLoader from "components/PreLoader";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import PopupTimeOut from "components/PopupTimeOut";

function SeatPlan() {
  const dispatch = useDispatch();

  const [minutes, setMinutes] = useState(1);

  const [seconds, setSeconds] = useState(0);

  const [showPopupTimeOut, setShowPopupTimeOut] = useState(false);

  const { loading } = useSelector((state) => state.seatPlan);

  const { danhSachGhe, thongTinPhim } = useSelector(
    (state) => state.seatPlan.showTimeDetails
  );

  const { listSelectedSeats } = useSelector((state) => state.seatPlan);

  const { idShowTime } = useParams();

  const history = useHistory();

  useEffect(() => {
    if (!thongTinPhim) {
      dispatch(seatPlanActions.actFetchShowTimeDetail(idShowTime));
    }

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

  const renderSeats = (seatReserved, seat, seatNum, nameOfSeat) => {
    let margin = "";

    if (seatNum === 3 || seatNum === 13) {
      margin = styles.MarginSeat;
    }

    if (seatReserved) {
      return (
        <button
          disabled
          className={`${styles.SingleSeat} ${styles.SeatBooked} ${margin}`}
        >
          <img src={seatBooked} alt="seatBooked" />
          <span style={{ fontSize: "10px" }}>{`${nameOfSeat}${seatNum}`}</span>
        </button>
      );
    } else {
      let index = listSelectedSeats.findIndex(
        (selectedSeat) => selectedSeat.stt === seat.stt
      );

      if (index !== -1) {
        return (
          <button
            onClick={() => {
              dispatch(
                seatPlanActions.actGetSelectedSeats(seat, seatNum, nameOfSeat)
              );
            }}
            className={`${styles.SingleSeat} ${margin}`}
          >
            <img src={seatBooking} alt="seatBooking" />
            <span
              style={{ fontSize: "10px", color: "black" }}
            >{`${nameOfSeat}${seatNum}`}</span>
          </button>
        );
      }

      return (
        <button
          className={`${styles.SingleSeat} ${margin}`}
          onClick={() => {
            dispatch(
              seatPlanActions.actGetSelectedSeats(seat, seatNum, nameOfSeat)
            );
          }}
        >
          <img src={seatFree} alt="seatFree" />
          <span style={{ fontSize: "10px" }}>{`${nameOfSeat}${seatNum}`}</span>
        </button>
      );
    }
  };

  const renderListSeatsHandler = () => {
    let nameOfSeatArr = ["A", "B", "C", "D", "E", "F", "G"];
    let numOfSeat = 0;
    let increase = 0;
    let nameOfSeat;
    return danhSachGhe?.slice(0, 112).map((seat, index) => {
      if (numOfSeat === 16) {
        numOfSeat = 0;
        increase++;
      }
      numOfSeat++;
      nameOfSeat = nameOfSeatArr[increase];
      return (
        <Fragment key={index}>
          {renderSeats(seat.daDat, seat, numOfSeat, nameOfSeat)}
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };
  if (loading) {
    return <PreLoader />;
  } else {
    return (
      <Fragment>
        <div className={styles.SeatPlan}>
          <div className={styles.Banner}>
            <div className={styles.BgImg}></div>
            <div className={styles.Overlay}></div>
            <div className={styles.Content}>
              <h3 className={styles.MovieName}>
                {thongTinPhim
                  ? thongTinPhim.tenPhim.split(" ").length > 3
                    ? thongTinPhim.tenPhim.split(" ").slice(0, 3).join(" ") +
                      "..."
                    : thongTinPhim.tenPhim
                  : null}
              </h3>
              <p className={styles.Info}>
                {thongTinPhim ? thongTinPhim.tenCumRap : null} | Theater{" "}
                {thongTinPhim ? thongTinPhim.tenRap.split(" ")[1] : null}
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
                    <span>{thongTinPhim ? thongTinPhim.ngayChieu : null}</span>
                    <button
                      className="btn-gradient-square ml-5"
                      style={{ cursor: "text" }}
                      disabled
                    >
                      {thongTinPhim ? thongTinPhim.gioChieu : null}
                    </button>
                  </Fragment>
                </div>
                <div className="col-12 col-md-3 text-white text-center mt-3 mt-md-0">
                  {renderCountDownHandler(minutes, seconds)}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.Screen}>
            <div className="container">
              <p className={styles.Title}>SCREEN</p>
              <div className={styles.Thumb}>
                <img className="w-100" src={screen} alt="screen-thumb" />
              </div>
              <p className={styles.VipSeats}>VIP SEATS</p>
              <div className={styles.SeatArea}>
                <div className={styles.ListSeat}>
                  {renderListSeatsHandler()}
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.ProceedBook} container`}>
            <div className={styles.Overlay}></div>
            <div className="row p-4">
              <div className="col-6 col-md-4">
                <div className={styles.Left}>
                  <p>Your Seat</p>
                  <span>
                    {listSelectedSeats.length < 1
                      ? "Empty"
                      : listSelectedSeats?.map((item) => {
                          return `${item.seatName}, `;
                        })}
                  </span>
                </div>
              </div>
              <div className="col-6 col-md-4 text-right text-md-center">
                <div className={styles.Center}>
                  <p>Total Price</p>
                  <span>
                    $
                    {listSelectedSeats?.reduce((sum, item) => {
                      return Math.round((sum += item.giaVe / 23000));
                    }, 0)}
                  </span>
                </div>
              </div>
              <div className="col-12 col-md-4 d-flex align-items-center justify-content-center justify-content-md-end mt-4 mt-md-0">
                <button
                  className={`${
                    listSelectedSeats.length < 1 ? styles.NextStepDisabled : ""
                  } btn-gradient`}
                  onClick={() => {
                    return listSelectedSeats.length < 1
                      ? null
                      : history.replace(`/food-plan/${idShowTime}`);
                  }}
                >
                  NEXT
                  <i className="fa fa-angle-double-right font-weight-bold pl-2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        {showPopupTimeOut ? (
          <PopupTimeOut>
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
          </PopupTimeOut>
        ) : null}
      </Fragment>
    );
  }
}

export default SeatPlan;

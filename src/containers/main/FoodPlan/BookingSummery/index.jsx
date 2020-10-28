import React, { Fragment } from "react";
import styles from "./BookingSummery.module.scss";
import "assets/sass/components/button.scss";
import noti from "assets/images/noti.png";
import { withRouter, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as foodPlanActions from "redux/main/actions/foodPlanActions";
import * as localStorageUtils from "utils/localStorage";
import PopupNotice from "components/PopupNotice";

function BookingSummery() {
  const dispatch = useDispatch();

  const { thongTinPhim } = useSelector(
    (state) => state.seatPlan.showTimeDetails
  );

  const { listSelectedSeats } = useSelector((state) => state.seatPlan);

  const { food } = useSelector((state) => state.foodPlan);

  const { idShowTime } = useParams();

  const amountPayableHandler = () => {
    let ticketSum = listSelectedSeats?.reduce((sum, item) => {
      return Math.round((sum += item.giaVe / 23000));
    }, 0);

    let foodSum = food.reduce((sum, food) => {
      return food.amount > 0 ? (sum += food.amount * food.price) : sum;
    }, 0);

    return ticketSum + foodSum;
  };

  const bookingTickets = () => {
    const listSeatSelected = listSelectedSeats?.map((seat) => {
      return {
        maGhe: seat.maGhe,
        giaVe: seat.giaVe,
      };
    });

    const { taiKhoan, accessToken } = localStorageUtils.fetchFromStorage(
      "userInfo"
    );

    dispatch(
      foodPlanActions.actBookingTickets(
        idShowTime,
        listSeatSelected,
        taiKhoan,
        accessToken
      )
    );
  };
  return (
    <Fragment>
      <div className={styles.BookingSummery}>
        <h4>BOOKING SUMMERY</h4>
        <div className={styles.TicketInfo}>
          <div className={styles.Info1}>
            <h5>
              {thongTinPhim.tenPhim.split(" ").length > 5
                ? thongTinPhim.tenPhim.split(" ").slice(0, 5).join(" ") + "..."
                : thongTinPhim.tenPhim}
            </h5>
            <p>2D | DIGITAL</p>
          </div>
          <div className={styles.Info2}>
            <div className={styles.Left}>
              <h5>
                {thongTinPhim.tenCumRap.split(" ").length > 5
                  ? thongTinPhim.tenCumRap.split(" ").slice(0, 5).join(" ") +
                    "..."
                  : thongTinPhim.tenCumRap}
              </h5>
              <p>
                {thongTinPhim.ngayChieu}, {thongTinPhim.gioChieu}
              </p>
            </div>
            <div className={styles.Right}>
              <h5>
                {listSelectedSeats.length < 10
                  ? `0${listSelectedSeats.length}`
                  : listSelectedSeats.length}
              </h5>
              <span>TICKETS</span>
            </div>
          </div>
          <div className={styles.Info3}>
            <h5>POSITION</h5>
            <span>
              {listSelectedSeats?.map((item) => {
                return listSelectedSeats.length < 2
                  ? `${item.seatName}`
                  : `${item.seatName}, `;
              })}
            </span>
          </div>
          <div className={styles.Info4}>
            <h5>TICKETS PRICE</h5>
            <p>
              $
              {listSelectedSeats?.reduce((sum, item) => {
                return Math.round((sum += item.giaVe / 23000));
              }, 0)}
            </p>
          </div>
          <div className={styles.Info5}>
            <div className={styles.Left}>
              <h5>FOOD & BEVERAGE</h5>
              {food.map((food, index) => {
                return food.amount > 0 ? (
                  <p key={index}>
                    {food.amount} {food.name}
                  </p>
                ) : null;
              })}
            </div>
            <div className={styles.Right}>
              <p>
                $
                {food.reduce((sum, food) => {
                  return food.amount > 0
                    ? (sum += food.amount * food.price)
                    : sum;
                }, 0)}
              </p>
            </div>
          </div>
          <div className={styles.Info6}>
            <h5>AMOUNT PAYABLE</h5>
            <p>${amountPayableHandler()}</p>
          </div>
          <div className={styles.Proceed}>
            <button
              className="btn-gradient"
              data-toggle="modal"
              data-target="#showPopupBooking"
              onClick={() => {
                bookingTickets();
              }}
            >
              PROCEED
            </button>
          </div>
        </div>
      </div>
      <div className={styles.Note}>
        <p>
          NOTE: Please give us 15 minutes for F&B preparation once you're at the
          cinema.
        </p>
      </div>
      <PopupNotice
        id="showPopupBooking"
        preventClickOutSide="static"
        preventESC="false"
      >
        <div className={styles.ModalContent}>
          <img
            src={noti}
            alt="noti"
            style={{
              width: "100px",
              paddingLeft: "30px",
              paddingBottom: "10px",
            }}
          />
          <h3>SUCCESSFULLY!</h3>
          <p>Thanks for your booking</p>
          <a href="/">
            <button className="btn-gradient">YEP!</button>
          </a>
        </div>
      </PopupNotice>
    </Fragment>
  );
}

export default withRouter(BookingSummery);

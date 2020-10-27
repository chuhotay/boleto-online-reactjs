import React, { useState, useEffect } from "react";
import styles from "./ShowTime.module.scss";
import theater from "assets/images/city.png";
import date from "assets/images/date.png";
import * as movieDetailActions from "redux/main/actions/movieDetailActions";
import noShowings from "assets/images/no-showing.svg";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";

function ShowTime() {
  const dispatch = useDispatch();

  const { listTheatersOption } = useSelector((state) => state.movieDetail);

  const { listDateOption } = useSelector((state) => state.movieDetail);

  const { listShowTimePerOption } = useSelector((state) => state.movieDetail);

  const { dateSelected } = useSelector((state) => state.movieDetail);

  const [isFistChange, setIsFistChange] = useState(false);

  const [state, setState] = useState({
    theaterSelected: null,
    dateSelected: null,
  });

  useEffect(() => {
    if (isFistChange) {
      dispatch(movieDetailActions.actChangeShowTimeOption(state));
    }
  }, [state.theaterSelected, state.dateSelected]);

  const changeOptionShowTimeHandler = (event) => {
    let { name, value } = event.target;
    setIsFistChange(true);
    setState({
      ...state,
      [name]: value,
    });
  };

  const renderTheatersOptionHandler = () => {
    return listTheatersOption?.map((theater, index) => {
      return <option key={index}>{theater}</option>;
    });
  };

  const renderDateOptionHandler = () => {
    return listDateOption?.map((date, index) => {
      return <option key={index}>{date}</option>;
    });
  };

  const renderShowTimeHandler = () => {
    return listShowTimePerOption?.map((branch, index) => {
      return (
        <div key={index} className={`${styles.Ticket} row`}>
          <div className={`${styles.Branch} col-lg-5`}>
            <div className={`${styles.BranchName} row`}>
              <div className={`${styles.Left} col-lg-9`}>
                <i className="fa fa-heart"></i>
                <span>
                  {branch.tenCumRap.split(" ").length > 5
                    ? branch.tenCumRap.split(" ").slice(0, 5).join(" ") + "..."
                    : branch.tenCumRap}
                </span>
              </div>
              <div className={`${styles.Right} col-lg-3 d-none d-lg-block`}>
                <i className="fa fa-map-marker"></i>
              </div>
            </div>
          </div>
          <div className={`${styles.Hours} col-lg-7 mt-3 mt-lg-0`}>
            {branch.lichChieuPhim?.map((hour, index) => {
              return hour.ngayChieuGioChieu.substring(0, 10) ===
                dateSelected ? (
                <span
                  key={index}
                  data-toggle="modal"
                  data-target="#popupChooseShowTime"
                  className={styles.Item}
                  onClick={() => {
                    dispatch(
                      movieDetailActions.actGetIdShowTimeSelected(
                        hour.maLichChieu
                      )
                    );
                  }}
                >
                  <Moment format="LT">{hour.ngayChieuGioChieu}</Moment>
                </span>
              ) : null;
            })}
          </div>
        </div>
      );
    });
  };

  return listShowTimePerOption.length > 0 ? (
    <div className={styles.ShowTime} id="showTime">
      <div className={styles.Filter}>
        <div className="row">
          <div className="col-12 col-md-6 mb-3 mb-md-0 ml-2 ml-md-0">
            <img src={theater} alt="theater" />
            <span className={styles.Theater}>Theater</span>
            <select
              name="theaterSelected"
              onChange={changeOptionShowTimeHandler}
            >
              {renderTheatersOptionHandler()}
            </select>
          </div>
          <div className="col-12 col-md-6 ml-0 ml-2 ml-md-0">
            <img src={date} alt="date" />
            <span className={styles.Date}>Date</span>
            <select
              name="dateSelected"
              onChange={changeOptionShowTimeHandler}
              className="px-3"
            >
              {renderDateOptionHandler()}
            </select>
          </div>
        </div>
      </div>
      <div className={`${styles.TicketPlan} container`}>
        {renderShowTimeHandler()}
      </div>
    </div>
  ) : (
    <div className="text-center mt-5" id="showTime">
      <img src={noShowings} alt="no-showings" width="200px" height="270px" />
      <p className="text-white">No showings!</p>
    </div>
  );
}

export default ShowTime;

import React from "react";
import "./PopupTimeOut.scss";

function PopupTimeOut(props) {
  return <div className="popup-notice">{props.children}</div>;
}

export default PopupTimeOut;

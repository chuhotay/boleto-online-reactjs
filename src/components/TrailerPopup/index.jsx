import React from "react";
import ModalVideo from "react-modal-video";
import "./TrailerPopup.scss";

function TrailerPopup(props) {
  return (
    <ModalVideo
      channel="youtube"
      autoplay
      isOpen={props.isOpen}
      onClose={props.onClose}
      videoId={props.videoId}
    />
  );
}

export default TrailerPopup;

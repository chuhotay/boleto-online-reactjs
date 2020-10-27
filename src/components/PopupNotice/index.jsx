import React from "react";

function PopupNotice(props) {
  return (
    <div
      className="modal fade text-center rounded"
      id={props.id}
      tabIndex={-1}
      role="dialog"
      aria-labelledby={props.id}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">{props.children}</div>
      </div>
    </div>
  );
}

export default PopupNotice;

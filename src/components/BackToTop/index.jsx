import React, { memo, useState, useEffect, Fragment } from "react";
import "./BackToTop.scss";

function BackToTop() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  });

  const scrollHandler = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  return (
    <Fragment>
      {showScroll ? (
        <div
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          className="back-to-top"
        >
          <i className="fa fa-angle-up"></i>
        </div>
      ) : null}
    </Fragment>
  );
}

export default memo(BackToTop);

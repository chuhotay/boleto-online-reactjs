import React from "react";
import "./PreLoader.scss";

function PreLoader() {
  return (
    <div className="preloader">
      <div className="preloader-inner">
        <div className="preloader-icon">
          <span className="first"></span>
          <span className="last"></span>
        </div>
      </div>
    </div>
  );
}

export default PreLoader;

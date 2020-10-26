import * as sharedConstants from "redux/main/constants/sharedConstants";

const initialState = {
  videoTrailer: "",
  isOpenVideoTrailer: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case sharedConstants.VIEW_TRAILER:
      state.videoTrailer = payload;
      console.log(payload);
      return { ...state };

    case sharedConstants.IS_OPEN_VIDEO_TRAILER:
      state.isOpenVideoTrailer = payload;
      console.log(payload);
      return { ...state };

    default:
      return state;
  }
};

import * as authConstants from "redux/main/constants/authConstants";
import * as localStorageUtils from "utils/localStorage";

export const userSignInReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case authConstants.SIGN_IN_REQUEST:
      return { loading: true };

    case authConstants.SIGN_IN_SUCCESS:
      localStorageUtils.saveToStorage("userInfo", payload);
      return { loading: false, userInfo: payload };

    case authConstants.SIGN_IN_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};

export const userSignUpReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case authConstants.SIGN_UP_REQUEST:
      return { loading: true };

    case authConstants.SIGN_UP_SUCCESS:
      return { loading: false };

    case authConstants.SIGN_UP_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};

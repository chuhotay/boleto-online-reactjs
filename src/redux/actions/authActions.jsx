import * as authConstants from "redux/constants/authConstants";
import { authServices } from "services/AuthServices";

export const actUserSignIn = (userInfo, history, loading) => {
  return (dispatch) => {
    dispatch({ type: authConstants.SIGN_IN_REQUEST });
    authServices
      .userSignIn(userInfo)
      .then((res) => {
        dispatch({
          type: authConstants.SIGN_IN_SUCCESS,
          payload: res.data,
        });
        if (!loading) {
          history.push("/");
        }
      })
      .catch((err) => {
        dispatch({
          type: authConstants.SIGN_IN_FAIL,
          payload: err.response.data,
        });
      });
  };
};

export const actUserSignUp = (userInfo, history, loading) => {
  return (dispatch) => {
    dispatch({ type: authConstants.SIGN_UP_REQUEST });
    authServices
      .userSignUp(userInfo)
      .then((res) => {
        dispatch({
          type: authConstants.SIGN_UP_SUCCESS,
          payload: res.data,
        });
        if (!loading) {
          history.push("/sign-in");
        }
      })
      .catch((err) => {
        dispatch({
          type: authConstants.SIGN_UP_FAIL,
          payload: err.response.data,
        });
      });
  };
};

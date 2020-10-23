import React, { Fragment, useState } from "react";
import styles from "./SignIn.module.scss";
import "assets/sass/components/button.scss";
import { Link } from "react-router-dom";
import Validator from "utils/Validator";
import * as authActions from "redux/main/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PreLoader from "components/PreLoader";

function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.userSignIn.loading);

  const [values, setValues] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const [errors, setErrors] = useState({});

  const rules = [
    {
      field: "taiKhoan",
      method: "isEmpty",
      validWhen: false,
      message: "Username is required",
    },
    {
      field: "matKhau",
      method: "isEmpty",
      validWhen: false,
      message: "Password is required",
    },
    {
      field: "matKhau",
      method: "isLength",
      args: [{ min: 6 }],
      validWhen: true,
      message: "Password is at least 6 characters",
    },
  ];

  const validator = new Validator(rules);

  const inputHandler = (e) => {
    let { name, value } = e.target;
    const newValues = {
      ...values,
      [name]: value,
    };
    setValues(newValues);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setErrors(validator.validate(values));
    dispatch(authActions.actUserSignIn(values, history, loading));
  };

  return (
    <Fragment>
      {loading ? <PreLoader /> : null}
      <div className={styles.LoginPage}>
        <div className={`${styles.Content} container`}>
          <div className={styles.AccountArea}>
            <div className={styles.SectionHeader}>
              <span className={styles.Cate}>hello</span>
              <h2 className={styles.Title}>welcome back</h2>
            </div>
            <form onSubmit={submitHandler} className={styles.AccountForm}>
              <div className={`${styles.Username} form-group`}>
                <label>
                  Username<span>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  name="taiKhoan"
                  onChange={inputHandler}
                />
                <span>{errors.taiKhoan}</span>
              </div>
              <div className={`${styles.Password} form-group`}>
                <label>
                  Password<span>*</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="matKhau"
                  onChange={inputHandler}
                />
                <span>{errors.matKhau}</span>
              </div>
              <div className={`${styles.CheckGroup} form-group`}>
                <div className={styles.RememberPass}>
                  <input type="checkbox" />
                  <label className="ml-1">Remember Password</label>
                </div>
                <span>
                  <Link to="/" className={`${styles.ForgetPass}`}>
                    Forget Password
                  </Link>
                </span>
              </div>
              <div className="form-group text-center mt-4">
                <button className="btn-gradient px-5">SIGN IN</button>
              </div>
            </form>
            <div className={`${styles.Option} text-center text-white mt-5`}>
              <span>Don't have an account?</span>{" "}
              <Link to="/sign-up" className={styles.GoToSignUp}>
                Sign up now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default SignIn;

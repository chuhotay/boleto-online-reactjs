import React, { Fragment, useState } from "react";
import styles from "./SignUp.module.scss";
import "assets/sass/components/button.scss";
import { Link } from "react-router-dom";
import Validator from "utils/Validator";
import * as authActions from "redux/main/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PreLoader from "components/PreLoader";

function SignUp() {
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.userSignUp.loading);

  const [values, setValues] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    maNhom: "GP01",
    maLoaiNguoiDung: "",
    soDt: "",
    hoTen: "",
  });

  const [errors, setErrors] = useState({});

  const requireMatchPassword = (value, matKhau, nhapLaiMatKhau, state) =>
    state[matKhau] === state[nhapLaiMatKhau];

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
    {
      field: "nhapLaiMatKhau",
      method: "isEmpty",
      validWhen: false,
      message: "Password is required",
    },
    {
      field: "nhapLaiMatKhau",
      method: "isLength",
      args: [{ min: 6 }],
      validWhen: true,
      message: "Password is at least 6 characters",
    },
    {
      field: "nhapLaiMatKhau",
      method: requireMatchPassword,
      args: ["matKhau", "nhapLaiMatKhau"],
      validWhen: true,
      message: "Password is not match",
    },
    {
      field: "email",
      method: "isEmpty",
      validWhen: false,
      message: "Email is required",
    },
    {
      field: "email",
      method: "isEmail",
      validWhen: true,
      message: "Email not valid",
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
    dispatch(authActions.actUserSignUp(values, history, loading));
  };

  return (
    <Fragment>
      {loading ? <PreLoader /> : null}
      <div className={styles.RegisterPage}>
        <div className={`${styles.Content} container`}>
          <div className={styles.AccountArea}>
            <div className={styles.SectionHeader}>
              <span className={styles.Cate}>WELCOME</span>
              <h2 className={styles.Title}>TO BOLETO</h2>
            </div>
            <form onSubmit={submitHandler} className={styles.AccountForm}>
              <div className={`${styles.Username} form-group`}>
                <label>
                  Username<span>*</span>
                </label>
                <input
                  type="text"
                  name="taiKhoan"
                  placeholder="Enter your username"
                  onChange={inputHandler}
                />
                <span>{errors.taiKhoan}</span>
              </div>
              <div className={`${styles.Email} form-group`}>
                <label>
                  Email<span>*</span>
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  onChange={inputHandler}
                />
                <span>{errors.email}</span>
              </div>
              <div className={`${styles.Password} form-group`}>
                <label>
                  Password<span>*</span>
                </label>
                <input
                  type="password"
                  name="matKhau"
                  placeholder="Enter your password"
                  onChange={inputHandler}
                />
                <span>{errors.matKhau}</span>
              </div>
              <div className={`${styles.ConfirmPassword} form-group`}>
                <label>
                  Confirm Password<span>*</span>
                </label>
                <input
                  type="password"
                  name="nhapLaiMatKhau"
                  placeholder="Confirm your password"
                  onChange={inputHandler}
                />
                <span>{errors.nhapLaiMatKhau}</span>
              </div>
              <div className={`${styles.CheckGroup} form-group`}>
                <div className={styles.Terms}>
                  <input type="checkbox" />
                  <label className="ml-1">
                    I Agree To The{" "}
                    <span style={{ fontSize: "13px", color: "#31d7a9" }}>
                      Terms
                    </span>
                    ,{" "}
                    <span style={{ fontSize: "13px", color: "#31d7a9" }}>
                      Privacy Policy
                    </span>{" "}
                    And{" "}
                    <span style={{ fontSize: "13px", color: "#31d7a9" }}>
                      Fees
                    </span>
                  </label>
                </div>
              </div>
              <div className="form-group text-center mt-4">
                <button className="btn-gradient px-5">SIGN UP</button>
              </div>
            </form>
            <div className={`${styles.Option} text-center text-white mt-5`}>
              <span>Already have an account?</span>{" "}
              <Link to="/sign-in" className={styles.GoToSignIn}>
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default SignUp;

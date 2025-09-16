import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useAppContext } from "../context/AppState";
import { useNavigate } from "react-router-dom";

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Must be greater than 8 characters";
  }

  return errors;
};
const Login = () => {
  const nav = useNavigate();
  const {
    userLogin,
    tokenInLocalStorage,
    setsnackbarMessage,
    setsnakbarOpen,
    setseverityType,
  } = useAppContext();

  useEffect(() => {
    tokenInLocalStorage && nav("/") ;
  }, [tokenInLocalStorage]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
      userLogin(values,nav);
      // setsnackbarMessage("Logged in successfully");
      // setseverityType("success");
      // setsnakbarOpen(true);
      // alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="LoginFormCon">
      {/* <h1>Login</h1> */}

      <form onSubmit={formik.handleSubmit} className="LoginForm">
        <img
          className="loginImage"
          src="https://th.bing.com/th/id/OIP.iR-L3h8p33r7B8Dn80Lh3AHaHa?rs=1&pid=ImgDetMain"
        />
        <div className="formFields">
          <div style={{ width: "150px" }}>
            <label htmlFor="email">Email Address</label>
          </div>
          <div>
            <input
              className="formInput"
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />

            <div className="validationSTyle">
              {" "}
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="formFields">
          <div style={{ width: "150px" }}>
            <label htmlFor="password">Password</label>
          </div>
          <div>
            <input
              className="formInput"
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />

            <div className="validationSTyle">
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </div>
          </div>
        </div>

        <button className="LoginsubmitButton" type="submit" onClick={() => {}}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;

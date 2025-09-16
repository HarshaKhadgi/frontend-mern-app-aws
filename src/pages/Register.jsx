import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useAppContext } from "../context/AppState";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase/firebaseConfig";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 15) {
    errors.name = "Must be 15 characters or less";
  }

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

  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Not matched";
  }

  return errors;
};
const Register = () => {
  // const [isSignIn, setisSignIn] = useState(false)
  const nav = useNavigate();
  const { userRegistration, tokenInLocalStorage } = useAppContext();

  useEffect(() => {
    tokenInLocalStorage && nav("/");
  }, [tokenInLocalStorage]);

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       console.log(user);
  //       setisSignIn(true);
  //       nav(`/`);
  //     } else {
  //       setisSignIn(false);
  //     }
  //   });
  // }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: (values) => {
      delete values.confirmPassword;
      console.log(values);
      userRegistration(values);
      //   alert(JSON.stringify(values, null, 2));
    },
  });

  // const provider = new GoogleAuthProvider();
  // const auth = getAuth(app);

  // const loginWithGoogle = () => {
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       const credentials = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credentials.accessToken;
  //       const user = result.user;
  //       console.log(user);
  //       nav(`/`);
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       const email = error.customData.email;
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // console.log(errorCode, errorMessage, email, credential);
  //     });
  // };

  return (
    <div className="formCon">
      {/* <h1>Register</h1> */}
      <img
        className="formImage"
        src="https://www.indiafilings.com/learn/wp-content/uploads/2023/01/shutterstock_257823118-1.jpg"
      />
      <form onSubmit={formik.handleSubmit} className="formStyle">
        <div className="fieldCon">
          <div>
            {" "}
            <label htmlFor="name" className="labelCon">
              Name
            </label>
          </div>

          <div>
            <input
              className="formInput"
              id="name"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.name}
            />

            <div className="validationSTyle">
              {formik.touched.name && formik.errors.name ? (
                <div>{formik.errors.name}</div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="fieldCon">
          <div>
            <label htmlFor="email" className="labelCon">
              {" "}
              Email Address{" "}
            </label>
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
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="fieldCon">
          <div>
            <label htmlFor="password" className="labelCon">
              Password{" "}
            </label>
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
        <div className="fieldCon">
          <div>
            <label htmlFor="confirmPassword" className="labelCon">
              Confirm Password
            </label>
          </div>

          <div>
            <input
              className="formInput"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            <div className="validationSTyle">
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div>{formik.errors.confirmPassword}</div>
              ) : null}
            </div>
          </div>
        </div>

        <button className="submitButton" type="submit">
          Submit
        </button>
        {/* <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            style={{
              height: "50px",
              width: "400px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
            onClick={() => {
              loginWithGoogle();
            }}
          >
            {" "}
            <FcGoogle fontSize={25} />
            SignUp with Google
          </button>
        </div> */}
      </form>
    </div>
  );
};

export default Register;

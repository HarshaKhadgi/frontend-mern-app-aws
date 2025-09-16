import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useAppContext } from "../context/AppState";
import { useLocation, useNavigate } from "react-router-dom";

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 25) {
    errors.name = "Must be 15 characters or less";
  }
  if (!values.phonenumber) {
    errors.phonenumber = "Required";
  } else if (values.phonenumber.length !== 10) {
    errors.phonenumber = "Must be 10 digits";
  }
  if (!values.pincode) {
    errors.pincode = "Required";
  } else if (values.pincode.length !== 6) {
    errors.pincode = "Must be 6 digits";
  }
  if (!values.state) {
    errors.state = "Required";
  } else if (values.state.length > 15) {
    errors.state = "Must be 15 characters or less";
  }
  if (!values.city) {
    errors.city = "Required";
  } else if (values.city.length > 15) {
    errors.city = "Must be 15 characters or less";
  }
  if (!values.houseno) {
    errors.houseno = "Required";
  } else if (values.houseno.length > 15) {
    errors.houseno = "Must be 15 characters or less";
  }
  if (!values.roadname) {
    errors.roadname = "Required";
  } else if (values.roadname.length > 50) {
    errors.roadname = "Must be 50 characters or less";
  }

  return errors;
};

const SingleAddressChange = () => {
  const { tokenInLocalStorage, updateUserAddress } = useAppContext();
  const nav = useNavigate();
  const location = useLocation();
  //   console.log(location.state.a);

  //   console.log(a);
  const prevAdd = location.state.a;
  useEffect(() => {
    !tokenInLocalStorage && nav("/");
  }, [tokenInLocalStorage]);
  const formik = useFormik({
    initialValues: {
      name: prevAdd.name,
      phonenumber: prevAdd.phonenumber,
      pincode: prevAdd.pincode,
      state: prevAdd.state,
      city: prevAdd.city,
      houseno: prevAdd.houseno,
      roadname: prevAdd.roadname,
    },
    validate,
    onSubmit: (values) => {
      // delete values.confirmPassword;
      values.aid = prevAdd.aid;
      // console.log(values);

      updateUserAddress(values, nav);
      //   alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="changeAddressStyle">
      {/* Change Address */}
      <form onSubmit={formik.handleSubmit} className="changeaddressform">
        <div className="fieldCon">
          <label htmlFor="name" className="labelCon">
            Name
          </label>

          <input
            className="formInput"
            id="name"
            name="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div>{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="fieldCon">
          <label htmlFor="name" className="labelCon">
            {" "}
            phonenumber
          </label>

          <input
            className="formInput"
            id="phonenumber"
            name="phonenumber"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.phonenumber}
          />
          {formik.touched.phonenumber && formik.errors.phonenumber ? (
            <div>{formik.errors.phonenumber}</div>
          ) : null}
        </div>
        <div className="fieldCon">
          <label htmlFor="name" className="labelCon">
            pincode
          </label>

          <input
            className="formInput"
            id="pincode"
            name="pincode"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.pincode}
          />
          {formik.touched.pincode && formik.errors.pincode ? (
            <div>{formik.errors.pincode}</div>
          ) : null}
        </div>
        <div className="fieldCon">
          <label htmlFor="name" className="labelCon">
            state
          </label>

          <input
            className="formInput"
            id="state"
            name="state"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.state}
          />
          {formik.touched.state && formik.errors.state ? (
            <div>{formik.errors.state}</div>
          ) : null}
        </div>
        <div className="fieldCon">
          <label htmlFor="name" className="labelCon">
            city
          </label>

          <input
            className="formInput"
            id="city"
            name="city"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.city}
          />
          {formik.touched.city && formik.errors.city ? (
            <div>{formik.errors.city}</div>
          ) : null}
        </div>
        <div className="fieldCon">
          <label htmlFor="name" className="labelCon">
            houseno
          </label>

          <input
            className="formInput"
            id="houseno"
            name="houseno"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.houseno}
          />
          {formik.touched.houseno && formik.errors.houseno ? (
            <div>{formik.errors.houseno}</div>
          ) : null}
        </div>
        <div className="fieldCon">
          <label htmlFor="name" className="labelCon">
            roadname
          </label>

          <input
            className="formInput"
            id="roadname"
            name="roadname"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.roadname}
          />
          {formik.touched.roadname && formik.errors.roadname ? (
            <div>{formik.errors.roadname}</div>
          ) : null}
        </div>

        <button className="LoginsubmitButton" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SingleAddressChange;

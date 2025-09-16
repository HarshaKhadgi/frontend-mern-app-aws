import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppState";
import { FaHome } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
// import { FaBox } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";

const Navbar = () => {
  const {
    tokenInLocalStorage,
    logoutUser,
    setsnackbarMessage,
    setsnakbarOpen,
    setseverityType,
  } = useAppContext();
  const nav = useNavigate();
  return (
    <div className="navbarCon">
      {/* <Link to="/">Home </Link>
      <Link to="/cart">Cart </Link>
      <Link to="/orders">Orders </Link>
      <Link to="/login">Logout </Link> */}
      <div>
        {(window.location.pathname === "/" && <>Home</>) ||
          (window.location.pathname === "/cart" && <>Cart</>) ||
          (window.location.pathname === "/orders" && <>Orders</>) ||
          (window.location.pathname === "/register" && <>Register</>) ||
          (window.location.pathname === "/login" && <>Login</>) ||
          (window.location.pathname === "/addaddress" && (
            <>Add New Address</>
          )) ||
          (window.location.pathname === "/changeaddress" && (
            <>Your Addresses</>
          )) ||
          (window.location.pathname === "/singleaddresschange" && (
            <>Edit Address</>
          )) ||
          (window.location.pathname === "/singleplacedorderdetails" && (
            <>Order Details</>
          ))}
      </div>
      <div className="navlinks">
        {!tokenInLocalStorage ? (
          window.location.pathname === "/login" ? (
            <button
              className="navButton"
              onClick={() => {
                nav(`/register`);
                console.log(window.location.pathname);
              }}
            >
              Register
            </button>
          ) : (
            <button
              className="navButton"
              onClick={() => {
                nav(`/login`);
                console.log(window.location.pathname);
              }}
            >
              Login
            </button>
          )
        ) : (
          <>
            <FaHome
              onClick={() => {
                nav(`/`);
                // console.log(window.location.pathname);
              }}
            />
            <FaHeart
              style={{ color: "white", fontSize: "25px" }}
              onClick={() => {
                nav(`/wishlist`);
              }}
            />

            <FaCartArrowDown
              onClick={() => {
                nav(`/cart`);
                // console.log(window.location.pathname);
              }}
            />

            <BsBoxSeam
              onClick={() => {
                nav(`/orders`);
                // console.log(window.location.pathname);
              }}
            />

            <button
              className="navButton"
              onClick={() => {
                setsnackbarMessage("Logged Out");
                setseverityType("error");
                setsnakbarOpen(true);
                logoutUser();

                console.log(window.location.pathname);
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

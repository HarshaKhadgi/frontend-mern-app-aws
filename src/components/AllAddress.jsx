import React, { useEffect } from "react";
import { useAppContext } from "../context/AppState";
import { useNavigate } from "react-router-dom";
import SingleAddressChange from "../pages/SingleAddressChange";
import { GrSelect } from "react-icons/gr";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

const AllAddress = ({ a }) => {
  const { tokenInLocalStorage, deleteUserAddress, setcurrentSelectedAddress } =
    useAppContext();
  const nav = useNavigate();

  useEffect(() => {
    !tokenInLocalStorage && nav("/");
  }, [tokenInLocalStorage]);

  // console.log(a);
  return (
    <div className="singleaddress">
      <div style={{fontSize:"20px"}}>
        <div style={{ fontWeight: "bold" ,fontSize:"25px"}}>
          {a.name}
          {","}&nbsp;
          {a.pincode}
        </div>
        <div>
          {a.houseno}&nbsp;
          {a.roadname}&nbsp;
          {a.city}&nbsp;
          {a.state}
        </div>
        <div>+91 {a.phonenumber}</div>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "30px",
            fontSize: "25px",
          }}
        >
          <GrSelect style={{color:"green"}}
            onClick={() => {
              setcurrentSelectedAddress(a);
              nav("/cart");
            }}
            // className="changeaddressButton"
          />
          <FaEdit style={{color:"blue"}}
            onClick={() => {
              nav(`/singleaddresschange`, {
                state: {
                  a,
                },
              });
            }}
            // className="changeaddressButton"
          />
          <AiFillDelete
            style={{ color: "red" }}
            onClick={() => {
              deleteUserAddress(a.aid);
            }}
            // className="changeaddressButton"
          />
        </div>
      </div>
    </div>
  );
};

export default AllAddress;

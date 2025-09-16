import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppState";
import { useNavigate } from "react-router-dom";

const SinglePlacedOrder = ({ o }) => {
  const { Products } = useAppContext();
  const nav = useNavigate();
  const [cartFirstOrder, setcartFirstOrder] = useState({});
  const findProduct = (pid) => {
    const pro = Products.find((p) => p._id === pid);
    // console.log(pro);
    setcartFirstOrder(pro);
  };
  useEffect(() => {
    findProduct(o.cart[0].pid);
  }, []);
  //   console.log(Products);
  return (
    <div
      className="singlePlcaedOrderConStyle"
      onClick={() => {
        nav(`/singleplacedorderdetails`, { state: { o } });
      }}
    >
      <div>
        <img src={cartFirstOrder.imgURL} className="orderImageStyle" />
      </div>
      <div className="singlePlacedOrderDataStyle">
        <div style={{ color: "green", fontWeight: "bold" }}>
          {o.orderStatus}&nbsp;on&nbsp;{o.orderDate}
        </div>
        <div>{cartFirstOrder.name}</div>
      </div>
      <div>
        {o.cart?.length !== 1 &&
          (o.cart?.length === 2 ? (
            <div>+{o.cart?.length - 1} more item</div>
          ) : (
            <div>+{o.cart?.length - 1} more items</div>
          ))}
      </div>
    </div>
  );
};

export default SinglePlacedOrder;

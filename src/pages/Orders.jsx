import React, { useEffect } from "react";
import { useAppContext } from "../context/AppState";
import { useNavigate } from "react-router-dom";
import SinglePlacedOrder from "../components/SinglePlacedOrder";

const Orders = () => {
  const nav = useNavigate();
  const { tokenInLocalStorage, getUserOrders, userOrders, setuserOrders } =
    useAppContext();

  useEffect(() => {
    // if (tokenInLocalSt;orage) {
    // } else {
    //   nav("/login");
    // }
    getUserOrders();

    !tokenInLocalStorage && nav("/login");
  }, [tokenInLocalStorage]);

  // console.log(userOrders);

  return (
    <div className="ordersStyle">
      {/* Orders */}
      {userOrders.map((o) => (
        <SinglePlacedOrder key={o._id} o={o} />
      ))}
    </div>
  );
};

export default Orders;

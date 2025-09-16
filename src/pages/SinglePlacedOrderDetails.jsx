import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PlacedOrderSingleProduct from "../components/PlacedOrderSingleProduct";
import { useAppContext } from "../context/AppState";

const SinglePlacedOrderDetails = () => {
  const {
    tokenInLocalStorage,
    getProductsbyId,
    ordersCartPids,
  } = useAppContext();
  const location = useLocation();
  const placedOrder = location.state.o;
  const nav = useNavigate();
  // console.log(placedOrder);
  // placedOrder.orderStatus = "Delivered";
  const getProductsDetails = () => {
    let storePid = [];

    placedOrder.cart?.forEach((c) => {
      storePid.push(c.pid);
    });

    // console.log(storePid)

    getProductsbyId(storePid);
  };
  // console.log(storePid);
  // console.log(ordersCartPids)

  useEffect(() => {
    !tokenInLocalStorage && nav("/");
  }, [tokenInLocalStorage]);

  useEffect(() => {
    getProductsDetails();
  }, []);
  return (
    <div>
      <div>
        <div className="orderidStyle">OrderId - {placedOrder._id}</div>
        <hr />
      </div>
      {/* --------------------------------------------------------------- */}
      <div>
        <div className="ProductsInCartOfOrders">
          {ordersCartPids.map((p) => (
            <PlacedOrderSingleProduct key={p._id} singleProduct={p} />
          ))}
        </div>
      </div>
      {/* --------------------------------------------------------------- */}
      <div className="trackingOrderStyle">
        <div className="Singletrack">
          <div
            className="TrackSymbol"
            style={{
              background:
                placedOrder.orderStatus === "Ordered" ||
                placedOrder.orderStatus === "Shipped" ||
                placedOrder.orderStatus === "Out for Delivery" ||
                placedOrder.orderStatus === "Delivered"
                  ? "green"
                  : "yellow",
            }}
          >
            {/* {placedOrder.orderStatus === "Ordered"} */}
          </div>
          Ordered - {placedOrder.orderDate}
        </div>
        <div
          style={{
            marginLeft: "8px",
            width: "3px",
            height: "40px",
            background:
              // placedOrder.orderStatus === "Ordered" ||
              placedOrder.orderStatus === "Shipped" ||
              placedOrder.orderStatus === "Out for Delivery" ||
              placedOrder.orderStatus === "Delivered"
                ? "green"
                : "yellow",
          }}
        ></div>
        {/* <div style={{ marginLeft: "7px" }}>|</div>
        <div style={{ marginLeft: "7px" }}>|</div> */}
        <div className="Singletrack">
          <div
            className="TrackSymbol"
            style={{
              background:
                placedOrder.orderStatus === "Shipped" ||
                placedOrder.orderStatus === "Out for Delivery" ||
                placedOrder.orderStatus === "Delivered"
                  ? "green"
                  : "yellow",
            }}
          ></div>
          Shipped - {placedOrder.shippedDate}
        </div>
        <div
          style={{
            marginLeft: "8px",
            width: "3px",
            height: "40px",
            background:
              // placedOrder.orderStatus === "Ordered" ||
              // placedOrder.orderStatus === "Shipped" ||
              placedOrder.orderStatus === "Out for Delivery" ||
              placedOrder.orderStatus === "Delivered"
                ? "green"
                : "yellow",
          }}
        ></div>
        <div className="Singletrack">
          <div
            className="TrackSymbol"
            style={{
              background:
                placedOrder.orderStatus === "Out for Delivery" ||
                placedOrder.orderStatus === "Delivered"
                  ? "green"
                  : "yellow",
            }}
          ></div>
          Out for Delivery - {placedOrder.outforDelivery}
        </div>
        <div
          style={{
            marginLeft: "8px",
            width: "3px",
            height: "40px",
            background:
              // placedOrder.orderStatus === "Ordered" ||
              // placedOrder.orderStatus === "Shipped" ||
              // placedOrder.orderStatus === "Out for Delivery" ||
              placedOrder.orderStatus === "Delivered" ? "green" : "yellow",
          }}
        ></div>
        <div className="Singletrack">
          <div
            className="TrackSymbol"
            style={{
              background:
                placedOrder.orderStatus === "Delivered" ? "green" : "yellow",
            }}
          ></div>
          Delivered - {placedOrder.deliveredDate}
        </div>
      </div>
      {/* --------------------------------------------------------------- */}
      <div className="shippingDetilsStyle">
        <div className="orderpageFieldHeading">Shipping Details</div>
        <div className="address">{placedOrder.address?.[0].name}</div>
        <div className="address">{placedOrder.address?.[0].houseno}</div>
        <div className="address">{placedOrder.address?.[0].roadname}</div>
        <div className="address">{placedOrder.address?.[0].city}</div>
        <div className="address">{placedOrder.address?.[0].state}</div>
        <div className="address">{placedOrder.address?.[0].phonenumber}</div>
      </div>
      {/* --------------------------------------------------------------- */}
      <div>
        <div className="Pricebox">
          <div className="orderpageFieldHeading">Price Details</div>
          <div className="priceType">
            <span>Price ({placedOrder.cart?.length} items) </span>
            <span>₹{placedOrder.price}</span>
          </div>
          <div className="priceType">
            <span>Discount </span>
            <span style={{ color: "green" }}> -₹0</span>
          </div>
          <div className="priceType">
            <span>Coupons for you </span>
            <span> -₹0</span>
          </div>
          <div className="priceType">
            <span>Platform Fee </span>
            <span>₹3</span>
          </div>
          <div className="priceType">
            <span>Delivery Charges </span>
            <span>
              <del>₹40</del>{" "}
              <span style={{ color: "green" }}> FREE DELIVERY</span>
            </span>
          </div>
          <hr />
          <div className="priceType">
            <span style={{ fontWeight: "bold" }}>Total Amount </span>
            <span style={{ fontWeight: "bold" }}>
              {" "}
              ₹{placedOrder.price + 3 + (placedOrder.price > 499 ? 0 : 40)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePlacedOrderDetails;

import React, { useEffect, useState } from "react";
import { useAppContext, USER_TOKEN_KEY } from "../context/AppState";
import SingleProductInCart from "../components/SingleProductInCart";
import { useNavigate } from "react-router-dom";
import { useRazorpay } from "react-razorpay";
import axios from "axios";

const Cart = () => {
  const {
    Account,
    currentSelectedAddress,
    onlineOrderAlert,
    placeOrder,
    Products,
    setcurrentSelectedAddress,
    tokenInLocalStorage,
  } = useAppContext();
  // const [Amount, setAmount] = useState("");

  const { Razorpay } = useRazorpay();
  const [Price, setPrice] = useState(0);

  // console.log(Account);
  // console.log(Products);
  useEffect(() => {
    // if (tokenInLocalStorage) {
    // } else {
    //   nav("/login");
    // }

    !tokenInLocalStorage && nav("/login");
  }, [tokenInLocalStorage]);

  // console.log(Account);
  const nav = useNavigate();
  const calculatePrice = () => {
    let totalprice = 0;

    // for (let i = 0; i < Account.cart?.length; i++) {
    //   for (let j = 0; j < Products.length; j++) {
    //     if (Products[j]._id === Account.cart[i].pid) {
    //       // console.log(Products[j].price * Account.cart[i].qty);
    //       totalprice += Products[j].price * Account.cart[i].qty;
    //       // totalprice = totalprice + total;
    //     }
    //   }
    // }

    Account.cart?.forEach((ac) => {
      Products?.forEach((p) => {
        if (p._id === ac.pid) {
          totalprice += p.price * ac.qty;
        }
      });
    });

    // console.log(totalprice);
    setPrice(totalprice);
  };
  useEffect(() => {
    calculatePrice();
  }, [Account]);

  const getFormattedDate = () => {
    const date = new Date();
    const formatDate =
      date.toLocaleDateString("en-US", {
        weekday: "short",
      }) +
      ", " +
      date.getDate() +
      " " +
      date.toLocaleDateString("en-US", {
        month: "short",
      }) +
      " " +
      date.toLocaleDateString("en-US", {
        year: "2-digit",
      }) +
      " - " +
      date.getHours() +
      ":" +
      date.getMinutes();

    return formatDate;
  };

  if (Account.cart?.length === 0) {
    return <h1>empty cart</h1>;
  }
  // let total = Price + 3 + (Price > 499 ? 0 : 40);

  const payOnRAzorpay = async () => {
    // console.log(Amount);
    const Amount = Price + 3 + (Price > 499 ? 0 : 40);
    try {
      const res = await axios.post(
        "http://localhost:5000/order/create",
        { amount: parseInt(Amount) * 100 },
        {
          headers: { Authorization: localStorage.getItem(USER_TOKEN_KEY) },
        }
      );
      console.log(res.data);

      var options = {
        amount: res.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        key: import.meta.env.VITE_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
        name: "Harsha", //your business name
        order_id: res.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async (response) => {
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature);
          // console.log(response.razorpay_payment_id);
          // console.log(response.razorpay_order_id);
          // console.log(response.razorpay_signature);
          response.order_id = res.data.id;
          console.log(response);

          const orderObj = {
            ...response,
            address: currentSelectedAddress,
            cart: Account.cart,
            price: Price,
            totalPrice: Price + 3 + (Price > 499 ? 0 : 40),
            orderDate: getFormattedDate(),
            shippedDate: "",
            outforDelivery: "",
            deliveredDate: "",
            orderStatus: "Ordered",
            paymentMode: "Online",
            // sortingDate: Date.now(),
          };

          try {
            const res1 = await axios.post(
              "http://localhost:5000/order/verify",
              orderObj,
              {
                headers: {
                  Authorization: localStorage.getItem(USER_TOKEN_KEY),
                },
              }
            );
            console.log(res1.data);
            // nav("/orders")
            onlineOrderAlert(nav);
          } catch (e) {
            console.log(e);
          }
        },
        prefill: {
          //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          name: "Harsha", //your customer's name
          email: "harshakhadgi28@gmail.com",
          contact: "8080344814", //Provide the customer's phone number for better conversion rates
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#09f36b",
        },
      };

      var rzp1 = new Razorpay(options);

      rzp1.on("payment.failed", function (response) {
        console.log(response.error.code);
        console.log(response.error.source);
        console.log(response.error.step);
        console.log(response.error.reason);
        console.log(response.error.metadata.order_id);
        console.log(response.error.metadata.payment_id);
        console.log(response.error.description);
      });

      rzp1.open();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {/* <h1>Cart</h1> */}

      {Account.cart?.map((c) => (
        <SingleProductInCart key={c.pid} c={c} />
      ))}
      <div className="Pricebox">
        <div className="pricedetails">Price Details</div>
        <div className="priceType">
          <span>Price ({Account.cart?.length} items) </span>
          <span>₹{Price}</span>
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
            ₹{Price + 3 + (Price > 499 ? 0 : 40)}
          </span>
        </div>
      </div>
      <div className="addressbar">
        {Account.address?.length === 0 ? (
          <>
            <span style={{ fontWeight: "bold", fontSize: "25px" }}>
              No address Added
            </span>
            <span>
              <button
                onClick={() => {
                  nav(`/addaddress`);
                }}
                className="addaddressButton"
              >
                Add Address
              </button>
            </span>
          </>
        ) : (
          <>
            <span>
              <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                {currentSelectedAddress.name}
              </div>
              <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                {currentSelectedAddress.roadname}
              </div>
            </span>
            <div className="addressallButtons">
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <a href="/changeaddress">Change address</a> */}
                {/* <button
                  onClick={() => {
                    nav(`/changeaddress`);
                  }}
                  className="changeaddressButton"
                >
                  Change Address
                </button> */}
                <div
                  style={{
                    border: "1px solid gray",
                    borderRadius: "5px",
                    color: "blue",
                    fontWeight: "bold",
                    padding: "10px",
                  }}
                  onClick={() => {
                    nav(`/changeaddress`);
                  }}
                >
                  Change
                </div>
              </span>
              <span>
                <button
                  onClick={() => {
                    nav(`/addaddress`);
                  }}
                  className="addaddressButton"
                >
                  Add +
                </button>
              </span>
            </div>
          </>
        )}
      </div>
      <button
        className="addaddressButton"
        onClick={() => {
          // console.log(total);
          // setAmount(total);
          payOnRAzorpay();
        }}
      >
        {`Pay ${Price + 3 + (Price > 499 ? 0 : 40)}`}
      </button>
      <div className="placeorderbar">
        <span style={{ fontWeight: "bold", fontSize: "15px" }}>
          ₹{Price + 3 + (Price > 499 ? 0 : 40)}
        </span>
        <span>
          <button
            onClick={() => {
              // nav(`/ordersummary`);

              const orderObj = {
                address: currentSelectedAddress,
                cart: Account.cart,
                price: Price,
                totalPrice: Price + 3 + (Price > 499 ? 0 : 40),
                orderDate: getFormattedDate(),
                shippedDate: "",
                outforDelivery: "",
                deliveredDate: "",
                orderStatus: "Ordered",
                paymentMode: "COD",
                // sortingDate: Date.now(),
              };
              // console.log(orderObj);
              placeOrder(orderObj, nav);
            }}
            className="placeorderButton"
          >
            Place order
          </button>
        </span>
      </div>
    </div>
  );
};

export default Cart;

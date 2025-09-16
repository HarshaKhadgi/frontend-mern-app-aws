import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SingleProduct from "./components/SingleProduct";
import Cart from "./pages/Cart";
import OrderSummary from "./pages/OrderSummary";
import AddAddress from "./pages/AddAddress";
import ChangeAddress from "./pages/ChangeAddress";
import SingleAddressChange from "./pages/SingleAddressChange";
import Orders from "./pages/Orders";
import SinglePlacedOrderDetails from "./pages/SinglePlacedOrderDetails";
import Navbar from "./components/Navbar";
import Wishlist from "./pages/Wishlist";
import Payment from "./pages/Payment";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/addaddress" element={<AddAddress />} />
        <Route path="/changeaddress" element={<ChangeAddress />} />
        <Route path="/singleaddresschange" element={<SingleAddressChange />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/payment" element={<Payment />} />
        <Route
          path="/singleplacedorderdetails"
          element={<SinglePlacedOrderDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

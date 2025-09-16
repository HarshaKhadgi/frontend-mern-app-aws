import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppState";

// import ProductMap from "../components/productMap";
import ProductMap from "../components/ProductMap";

const Home = () => {
  const nav = useNavigate();

  const {
    logoutUser,
    tokenInLocalStorage,
    // getUserData,
    Account,
    // getProducts,
    Products,
  } = useAppContext();
  // const [Account, setAccount] = useState({});

  useEffect(() => {
    // if (tokenInLocalStorage) {
    // } else {
    //   nav("/login");
    // }

    (!tokenInLocalStorage && nav("/login")) ;
  }, [tokenInLocalStorage]);

  // useEffect(() => {
  //   getUserData();
  //   getProducts();
  // }, []);

  // console.log(Products);

  return (
    <div>
      {/* <h1>Home</h1> */}

      <div className="productCon">
        {Products.map((p) => (
          <ProductMap key={p._id} p={p} />
        ))}
      </div>
    </div>
  );
};

export default Home;

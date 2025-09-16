import React, { useEffect } from "react";
import { useAppContext } from "../context/AppState";
import { useNavigate } from "react-router-dom";

const SingleWishlist = ({ w }) => {
  const { Products, tokenInLocalStorage } = useAppContext();
  const nav = useNavigate();

  useEffect(() => {
    // if (tokenInLocalStorage) {
    // } else {
    //   nav("/login");
    // }

    !tokenInLocalStorage && nav("/login");
  }, [tokenInLocalStorage]);

  const findProduct = Products.find((p) => p._id === w.pid);
  console.log(findProduct);

  return (
    <div>
      <div className="singlewishlistProduct">
        <img
          src={findProduct.imgURL}
          className="imageStyle"
          onClick={() => {
            nav(`/product/${findProduct._id}`);
          }}
        />
        <div style={{ fontWeight: "bold", fontSize: "20px" }}>
          {findProduct.name}
        </div>
        <div>{findProduct.description}</div>
        <div>{findProduct.price}</div>
      </div>
    </div>
  );
};

export default SingleWishlist;

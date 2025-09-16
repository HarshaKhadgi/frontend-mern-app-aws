import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { useAppContext } from "../context/AppState";
import { useNavigate } from "react-router-dom";

const ProductMap = ({ p }) => {
  const { addinWishlist, Account } = useAppContext();
  const [isPresent, setisPresent] = useState(false);
  const nav = useNavigate();

  const findProductInWishlist = () => {
    let isPr = false;
    Account.wishlist?.forEach((f) => {
      if (f.pid === p._id) {
        isPr = true;
      }
    });
    setisPresent(isPr);
  };
  useEffect(() => {
    findProductInWishlist();
  }, [Account]);
  // console.log(Account.wishlist?.length);

  return (
    <div className="singleProduct">
      <img
        src={p.imgURL}
        className="imageStyle"
        onClick={() => {
          nav(`/product/${p._id}`);
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontWeight: "bold", fontSize: "20px" }}>{p.name}</span>
        <span>
          {isPresent ? (
            <FaHeart
              onClick={() => {
                setisPresent(false);
                addinWishlist(p._id);
              }}
              style={{ color: "red", fontSize: "25px" }}
            />
          ) : (
            <FaRegHeart
              onClick={() => {
                setisPresent(true);
                addinWishlist(p._id);
              }}
              style={{ fontSize: "25px" }}
            />
          )}
        </span>
      </div>
      <div>{p.description}</div>
      <div>{p.price}</div>
    </div>
  );
};

export default ProductMap;

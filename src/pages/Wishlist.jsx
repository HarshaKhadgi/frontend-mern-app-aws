import React, { useEffect } from "react";
import { useAppContext } from "../context/AppState";
import SingleWishlist from "../components/SingleWishlist";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const { Account, tokenInLocalStorage } = useAppContext();
  const nav = useNavigate();
  useEffect(() => {
    // if (tokenInLocalStorage) {
    // } else {
    //   nav("/login");
    // }

    !tokenInLocalStorage && nav("/login");
  }, [tokenInLocalStorage]);

  return (
    <div
      className="singlewishlistProductCon"
      onClick={() => {
        console.log(Account.wishlist);
      }}
    >
      {Account.wishlist?.map((w) => (
        // <div key={w.pid}>{w.pid}</div>
        <SingleWishlist key={w.pid} w={w} />
      ))}
    </div>
  );
};

export default Wishlist;

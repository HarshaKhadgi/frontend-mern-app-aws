import React from "react";
import { useAppContext } from "../context/AppState";

const SingleProductInCart = ({ c }) => {
  const { Products, addinCart, deleteinCart } = useAppContext();
  //   console.log(Products);
  const findProduct = Products.find((p) => p._id === c.pid);
//   console.log(findProduct);
  

  return (
    <div>
      <div>
        {findProduct && (
          <div className="singleproductincart">
            <div className="imageCon">
              <img src={findProduct.imgURL} className="cartimageStyle" />
              <span className="QtySpan">
                Qty : &nbsp;
                <button
                  className="qtybuttonStyle"
                  onClick={() => {
                    deleteinCart(c);
                  }}
                >
                  -
                </button>
                &nbsp;
                {c.qty}&nbsp;
                <button
                  className="qtybuttonStyle"
                  onClick={() => {
                    addinCart(c);
                  }}
                >
                  +
                </button>
              </span>
            </div>
            <div>
              <h2>{findProduct.name}</h2>
              <h2>₹{findProduct.price}</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProductInCart;

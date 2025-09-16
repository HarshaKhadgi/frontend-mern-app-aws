import React from "react";
import { useAppContext } from "../context/AppState";
import { useNavigate } from "react-router-dom";

const PlacedOrderSingleProduct = ({ singleProduct }) => {
  // const { Products } = useAppContext();
  // const singleProduct = Products.find((f) => f._id === p.pid);
  // console.log(singleProduct);
  const nav = useNavigate();
  return (
    singleProduct && (
      <div
        className="PlacedOrderSingleProductCon"
        onClick={() => {
          nav(`/product/${singleProduct._id}`);
        }}
      >
        <div className="OrderdataCon">
          <div className="OrderimageCon">
            <img
              className="OrderedProductImageStyle"
              src={singleProduct.imgURL}
            />
          </div>
          <div>{singleProduct.name}</div>
          <div>{singleProduct.price}</div>
          <div>{singleProduct.description}</div>
        </div>
      </div>
    )
  );
};

export default PlacedOrderSingleProduct;

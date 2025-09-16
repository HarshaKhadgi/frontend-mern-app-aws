import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppState";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";

const SingleProduct = () => {
  const { Products, addinCart, Account, addinWishlist } = useAppContext();
  const { id } = useParams();
  const [isPresent, setisPresent] = useState(false);
  const [presentInCart, setpresentInCart] = useState(false);

  const nav = useNavigate();

  // console.log(Account.wishlist?.length);

  //   let p;

  //   for (let i = 0; i < Products.length; i++) {
  //     if (Products[i]._id === id) {
  //       p = Products[i];
  //     }
  //   }

  const p = Products.find((pr) => pr._id === id);
  const findId = () => {
    let isPresent = false;
    Products.length !== 0 &&
      Account.cart?.forEach((a) => {
        if (a.pid === p._id) {
          // setpresentInCart(true);
          isPresent = true;
        }
      });
    // console.log(isPresent)
    setpresentInCart(isPresent);
  };
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

  useEffect(() => {
    findId();
  }, [Account?.cart]);

  if (Products.length === 0) {
    return <h1>...loading</h1>;
  }

  return (
    <div>
      <div className="singleProductStyle">
        {/* {Products._id === id && (
          <>
            {Products.name}
            <img src={Products.imgURL} className="imageStyle" />
            <div>{Products.name}</div>
            <div>{Products.description}</div>
            <div>{Products.price}</div>
          </>
        )} */}
        <div className="singleProductItemsAlign">
          <img src={p.imgURL} className="productImage" />
          <div className="productDataStyle">
            <div style={{ fontSize: "50px" }}>{p.name}</div>
            <div style={{ fontSize: "20px" }}>{p.description}</div>
            <div style={{ fontSize: "30px", fontWeight: "bold" }}>
              ₹{p.price}
            </div>
          </div>
        </div>

        {presentInCart ? (
          <div>
            <button
              onClick={() => {
                nav(`/cart`);
              }}
              className="gotocartButton"
            >
              Go to Cart
            </button>
            <button
              className="wishlistButton"
              onClick={() => {
                // console.log(isPresent);
              }}
            >
              {isPresent ? (
                <>
                  <div
                    className="wishlistdiv"
                    onClick={() => {
                      addinWishlist(p._id);
                      setisPresent(false);
                    }}
                  >
                    Wishlisted{" "}
                    <FaHeart
                      // onClick={() => {
                      //   setisPresent(false);
                      //   console.log(isPresent);
                      //   addinWishlist(p._id);
                      // }}
                      style={{ color: "red", fontSize: "20px" }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="wishlistdiv"
                    onClick={() => {
                      addinWishlist(p._id);
                      setisPresent(true);
                    }}
                  >
                    Wishlist
                    <FaRegHeart
                      // onClick={() => {
                      //   setisPresent(true);
                      //   addinWishlist(p._id);
                      // }}
                      style={{ fontSize: "20px" }}
                    />
                  </div>
                </>
              )}
            </button>
            {/* <button
              className="wishlistButton"
              onClick={() => {
                isPresent ? setisPresent(false) : setisPresent(true);
                addinWishlist(p._id);
                console.log(Account.wishlist?.length);
              }}
            >
              {" "}
              Wishlist{" "}
              {isPresent ? (
                <FaHeart
                  onClick={() => {
                    setisPresent(false);
                    addinWishlist(p._id);
                  }}
                  style={{ color: "red", fontSize: "20px" }}
                />
              ) : (
                <FaRegHeart
                  onClick={() => {
                    setisPresent(true);
                    addinWishlist(p._id);
                  }}
                  style={{ fontSize: "20px" }}
                />
              )}
            </button> */}
          </div>
        ) : (
          <>
            <button
              onClick={() => {
                addinCart({ pid: id, qty: 1 });
                console.log(presentInCart);
              }}
              className="cartButton"
            >
              Add to Cart
            </button>
            <button
              className="wishlistButton"
              onClick={() => {
                // console.log(isPresent);
              }}
            >
              {isPresent ? (
                <>
                  <div
                    className="wishlistdiv"
                    onClick={() => {
                      addinWishlist(p._id);
                      // console.log(isPresent);
                      setisPresent(false);
                    }}
                  >
                    Wishlisted{" "}
                    <FaHeart
                      // onClick={() => {
                      //   setisPresent(false);
                      //   console.log(isPresent);
                      //   addinWishlist(p._id);
                      // }}
                      style={{ color: "red", fontSize: "20px" }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="wishlistdiv"
                    onClick={() => {
                      addinWishlist(p._id);
                      setisPresent(true);
                    }}
                  >
                    Wishlist
                    <FaRegHeart
                      // onClick={() => {
                      //   setisPresent(true);
                      //   addinWishlist(p._id);
                      // }}
                      style={{ fontSize: "20px" }}
                    />
                  </div>
                </>
              )}
            </button>
            {/* <button
              className="wishlistButton"
              onClick={() => {
                isPresent ? setisPresent(false) : setisPresent(true);
                addinWishlist(p._id);
                console.log(Account.wishlist?.length);
              }}
            >
              {" "}
              Wishlist{" "}
              {isPresent ? (
                <FaHeart
                  onClick={() => {
                    setisPresent(false);
                    addinWishlist(p._id);
                  }}
                  style={{ color: "red", fontSize: "20px" }}
                />
              ) : (
                <FaRegHeart
                  onClick={() => {
                    setisPresent(true);
                    addinWishlist(p._id);
                  }}
                  style={{ fontSize: "20px" }}
                />
              )}
            </button> */}
          </>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;

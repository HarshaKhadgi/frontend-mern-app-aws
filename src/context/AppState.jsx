import { createContext, useContext, useEffect } from "react";
import myAxios from "../myAxios";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { app } from "../firebase/firebaseConfig";
const AppContext = createContext();

export const USER_TOKEN_KEY = "localStorageToken";

const AppState = ({ children }) => {
  // ---------------------------register user---------------------------------------
  const [tokenInLocalStorage, settokenInLocalStorage] = useState(null);
  const [Account, setAccount] = useState({});
  const [Products, setProducts] = useState([]);
  // const [Address, setAddress] = useState([]);
  const [currentSelectedAddress, setcurrentSelectedAddress] = useState({});
  const [userOrders, setuserOrders] = useState([]);
  const [ordersCartPids, setordersCartPids] = useState([]);

  const [snakbarOpen, setsnakbarOpen] = useState(false);
  const [snackbarMessage, setsnackbarMessage] = useState("");
  const [severityType, setseverityType] = useState("success");

  // const [isSignIn, setisSignIn] = useState(false);

  // const findProductInWishlist = () => {
  //       let isPr = false;
  //       Account.wishlist?.forEach((f) => {
  //         if (f.pid === p._id) {
  //           isPr = true;
  //         }
  //       });
  //       setisPresent(isPr);
  //     };
  //     useEffect(() => {
  //       findProductInWishlist();
  //     }, [Account]);

  const userRegistration = async (userdata) => {
    try {
      const res = await myAxios.post("/registerUser/add", userdata);
      console.log(res.data);
      alert("Hurray! Registration succesfull");
      window.location = "/login";
    } catch (e) {
      alert(e.response.data);
      console.log(e.response.data);
      console.log(e.message);
      console.log(e);
    }
  };
  // ---------------------------login user---------------------------------------
  const userLogin = async (userLogindata, nav) => {
    try {
      const res = await myAxios.post("/registerUser/login", userLogindata);
      console.log(res.data);
      localStorage.setItem(USER_TOKEN_KEY, res.data);
      // nav("/");

      // alert("user Succesfully loggedIn");
      nav("/");
      window.location = "/";
      setsnackbarMessage("Logged in Successfully");
      setseverityType("success");

      setsnakbarOpen(true);
    } catch (e) {
      console.log(e);
      console.log(e.response.data);
      console.log(e.message);
    }
  };
  // ---------------------------get user data---------------------------------------
  const getUserData = async () => {
    try {
      const res = await myAxios.get("/registerUser/get", {
        headers: { Authorization: localStorage.getItem(USER_TOKEN_KEY) },
      });
      // console.log(res.data);
      // return res.data;
      setAccount(res.data);
      setcurrentSelectedAddress(
        // Object.keys(currentSelectedAddress).length === 0 &&
        res.data.address.length !== 0 ? res.data.address[0] : {}
      );
    } catch (e) {
      console.log(e.response.data);
      if (e.response.data.message === "jwt expired") {
        // window.location = "/login";
        localStorage.removeItem(USER_TOKEN_KEY);
        settokenInLocalStorage(null);
      }
      console.log(e);
    }
  };
  // ---------------------------logout user---------------------------------------
  const logoutUser = () => {
    localStorage.removeItem(USER_TOKEN_KEY);

    window.location = "/login";
  };

  // console.log(tokenInLocalStorage);
  // ---------------------------localstorage authentication---------------------------------------

  const isTokenAvailable = () => {
    if (localStorage.getItem(USER_TOKEN_KEY) === null) {
      //   window.location = "/login";
      settokenInLocalStorage(null);
    } else {
      settokenInLocalStorage(localStorage.getItem(USER_TOKEN_KEY));
      //   window.location = "/";
    }
  };

  useEffect(() => {
    isTokenAvailable();
    getUserData();
    getProducts();
    // addUserAddress();
  }, []);

  // const auth = getAuth(app);

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       console.log(user);
  //       setisSignIn(true);
  //       nav(`/`);
  //     } else {
  //       setisSignIn(false);
  //     }
  //   });
  // }, []);

  // ---------------------------get products---------------------------------------

  const getProducts = async () => {
    try {
      const res = await myAxios.get("/ecommerceProduct/get");
      // console.log(res.data);
      setProducts(res.data);
    } catch (e) {
      console.log(e.response.data);
    }
  };

  const addinCart = async ({ pid, qty }) => {
    try {
      const res = await myAxios.post(
        "/registerUser/cart/add",
        {
          pid,
          qty,
        },
        {
          headers: { Authorization: localStorage.getItem(USER_TOKEN_KEY) },
        }
      );
      console.log(res.data);
      setsnackbarMessage("Item Added In Cart");
      setseverityType("success");
      setsnakbarOpen(true);
      getUserData();
    } catch (e) {
      console.log(e.response.data);
    }
  };
  const addinWishlist = async (pid) => {
    try {
      const res = await myAxios.post(
        "/registerUser/wishlist/add",
        { pid },
        {
          headers: { Authorization: localStorage.getItem(USER_TOKEN_KEY) },
        }
      );
      console.log(res.data);
      getUserData();
    } catch (e) {
      console.log(e.response.data);
    }
  };

  const deleteinCart = async ({ pid, qty }) => {
    try {
      const res = await myAxios.post(
        "/registerUser/cart/delete",
        {
          pid,
          qty,
        },
        {
          headers: { Authorization: localStorage.getItem(USER_TOKEN_KEY) },
        }
      );
      console.log(res.data);
      setsnackbarMessage("Item removed from cart");
      setseverityType("error");
      setsnakbarOpen(true);
      getUserData();
    } catch (e) {
      console.log(e.response.data);
    }
  };

  const addUserAddress = async (addressData, nav) => {
    try {
      const res = await myAxios.post("/registerUser/address/add", addressData, {
        headers: { Authorization: localStorage.getItem(USER_TOKEN_KEY) },
      });
      // setAddress(res.data);
      console.log(res.data);
      setsnackbarMessage("Address added");
      setseverityType("success");
      setsnakbarOpen(true);
      getUserData();

      nav("/changeaddress");
    } catch (e) {
      console.log(e);
      console.log(e.response.data);
    }
  };

  const updateUserAddress = async (updatedaddressData, nav) => {
    try {
      const res = await myAxios.put(
        "/registerUser/address/update",
        updatedaddressData,
        { headers: { Authorization: localStorage.getItem(USER_TOKEN_KEY) } }
      );
      console.log(res.data);
      setsnackbarMessage("Address Updated");
      setseverityType("success");
      setsnakbarOpen(true);
      getUserData();

      nav("/changeaddress");
    } catch (e) {
      console.log(e.response.data);
    }
  };
  const deleteUserAddress = async (aid) => {
    try {
      const res = await myAxios.put(
        "/registerUser/address/delete",
        { aid },
        { headers: { Authorization: localStorage.getItem(USER_TOKEN_KEY) } }
      );
      console.log(res.data);
      setsnackbarMessage("Address Deleted");
      setseverityType("error");
      setsnakbarOpen(true);
      getUserData();
    } catch (e) {
      console.log(e.response.data);
    }
  };

  const placeOrder = async (placeOrderdata, nav) => {
    try {
      const res = await myAxios.post("/order/add", placeOrderdata, {
        headers: { Authorization: localStorage.getItem(USER_TOKEN_KEY) },
      });
      console.log(res.data);
      alert("Order Successfully placed");
      setsnackbarMessage("Order Placed Successfully");
      setseverityType("success");
      setsnakbarOpen(true);
      getUserData();
      nav(`/orders`);
    } catch (e) {
      console.log(e.response.data);
    }
  };
  const onlineOrderAlert = (nav) => {
    alert("Order Successfully placed");
    setsnackbarMessage("Order Placed Successfully");
    setseverityType("success");
    setsnakbarOpen(true);
    getUserData();
    nav(`/orders`);
  };

  const getUserOrders = async () => {
    try {
      const res = await myAxios.get("/order/get", {
        headers: { Authorization: localStorage.getItem(USER_TOKEN_KEY) },
      });
      setuserOrders(res.data);
      // console.log(res.data);
    } catch (e) {
      console.log(e.response.data);
    }
  };

  const getProductsbyId = async (pids) => {
    try {
      setordersCartPids([]);
      // console.log(pids)
      const res = await myAxios.post(
        "/ecommerceProduct/getbyid",
        { pids },
        {
          headers: { Authorization: localStorage.getItem(USER_TOKEN_KEY) },
        }
      );
      setordersCartPids(res.data);
      // console.log(res.data);
    } catch (e) {
      console.log(e.response.data);
    }
  };

  return (
    <AppContext.Provider
      value={{
        userRegistration,
        userLogin,
        logoutUser,
        tokenInLocalStorage,
        getUserData,
        Account,
        getProducts,
        Products,
        addinCart,
        addinWishlist,
        deleteinCart,
        addUserAddress,
        // Address,
        updateUserAddress,
        deleteUserAddress,
        currentSelectedAddress,
        setcurrentSelectedAddress,
        placeOrder,
        getUserOrders,
        userOrders,
        setuserOrders,
        getProductsbyId,
        ordersCartPids,
        setordersCartPids,
        setsnackbarMessage,
        setsnakbarOpen,
        setseverityType,
        onlineOrderAlert,
        // isSignIn,
      }}
    >
      <Snackbar
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        open={snakbarOpen}
        onClose={() => {
          setsnakbarOpen(false);
        }}
        autoHideDuration={2000}
      >
        <Alert
          onClose={() => {
            setsnakbarOpen(false);
          }}
          severity={severityType}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppState;

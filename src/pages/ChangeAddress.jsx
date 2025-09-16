import React, { useEffect } from "react";
import { useAppContext } from "../context/AppState";
import AllAddress from "../components/AllAddress";
import { useNavigate } from "react-router-dom";

const ChangeAddress = () => {
  const { Account, tokenInLocalStorage } = useAppContext();
  const nav = useNavigate();
  // if (Account.address?.length === 0) {
  //   console.log(Account.address?.length);
  //   return <>..loading</>;
  // }
  useEffect(() => {
    !tokenInLocalStorage && nav("/");
  }, [tokenInLocalStorage]);

  return (
    <div>
      {/* <h2>Your Addresses</h2> */}
      {Account.address?.map((a) => (
        <AllAddress key={a.aid} a={a} />
      ))}
    </div>
  );
};

export default ChangeAddress;

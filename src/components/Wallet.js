import React from "react";
import { ethers } from "ethers";
import { useState } from "react";
import fox from "../assets/metamask.png";
function Wallet() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState("Token Address");
  const [userBalance, setUserBalance] = useState("Wallet Balance");
  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangeHandler(result[0]);
        });
    } else {
      setErrorMessage("Install MetaMask Wallet");
    }
  };
  const accountChangeHandler = (Account) => {
    setDefaultAccount(Account);
    getUserBalance(Account.toString());
  };

  const getUserBalance = (address) => {
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [address, "latest"],
      })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      });
  };

  window.ethereum.on("accountsChanged", accountChangeHandler);

  window.ethereum.on("chainChanged", () => {
    window.location.reload();
  });
  return (
    <div className="meta-wallet">
      <span
        className="alert"
        style={errorMessage ? { padding: "1rem 2rem" } : {}}
      >
        {errorMessage}
      </span>
      <div className="header-container">
        <img src={fox} className="image" />
        <h1 className="main-head">Connect Your MetaMask Wallet</h1>
      </div>
      <button onClick={connectWalletHandler}>Connect</button>
      <div className="value-container"> 
        <div className="accountDetails">
          <h2>Address : </h2>
          <span className="data-value">{defaultAccount}</span>
        </div>
        <div className="balanceDetails">
          <h2>Balance : </h2>
          <span className="data-value">{userBalance}</span>
        </div>
      </div>
    </div>
  );
}

export default Wallet;

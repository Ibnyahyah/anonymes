"use client";

import React from "react";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import CustomButton from "./customButton";

function Navbar() {
  const { open } = useWeb3Modal();
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  return (
    <nav className="flex justify-between position-sticky py-10">
      <header className="">ANONYm</header>
      <div className="flex gap-4">
        {isConnected && <p>{address?.slice(0, 8)}...</p>}
        <CustomButton onClick={isConnected ? () => {} : () => open()}>
          {isConnected ? "Connected" : "Connect Wallet"}
        </CustomButton>
      </div>
    </nav>
  );
}

export default Navbar;

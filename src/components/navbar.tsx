"use client";

import React from "react";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import CustomButton from "./customButton";
import Link from "next/link";

function Navbar() {
  const { open } = useWeb3Modal();
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  return (
    <nav className="flex justify-between position-sticky py-10 items-center">
      <Link href="/" className="text-2xl font-[800] text-green">
        ANONY<span className="font-[300] text-[16px] text-white">m</span>
      </Link>
      <div className="flex gap-4">
        {isConnected && <p>{`${address?.slice(0, 8)}...`}</p>}
        <CustomButton onClick={isConnected ? () => {} : () => open()}>
          {isConnected ? "Connected" : "Connect Wallet"}
        </CustomButton>
      </div>
    </nav>
  );
}

export default Navbar;
